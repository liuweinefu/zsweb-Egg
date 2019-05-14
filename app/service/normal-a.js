const Service = require('egg').Service;

/**
 * 以'_'开头的函数原则上只考虑输入和输出，尽量不用ctx内的变量
 * 
 */
class NormalService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    async find(uid) {
        const user = await this.ctx.db.query('select * from user where uid = ?', uid);
        return user;
    }




    /**
     * @param {string} findValue -ctx.request.body.q
     * @returns {object} ctx.condition.where
     * 
     */
    _comboWhere(findValue) {
        // const { ctx } = this;

        let value = typeof findValue === 'string' ? findValue : '';
        if (value === '') {
            return {};
        }

        const Op = this.app.Sequelize.Op;


        const { ctx } = this;
        const B = ctx.request.body;
        const O = ctx.controllerOption;

        let findBy = ['name'];
        if (Array.isArray(B.findBy) && B.findBy.every(field => O.selectAttributes.includes(field))) {
            findBy = B.findBy;
        }

        return {
            [Op.or]: findBy.map(field => {
                return {
                    [field]: {
                        [Op.like]: '%' + value + '%'
                    },
                }
            })
        };





        // return {
        //     [Op.or]: [
        //         {
        //             ['id']: {
        //                 [Op.like]: '%' + value + '%'
        //             },
        //         },
        //         {
        //             ['name']: {
        //                 [Op.like]: '%' + value + '%'
        //             },
        //         }
        //     ]
        // };

        // return {
        //     ['name']: {
        //         [Op.like]: '%' + value + '%'
        //     },
        // }
    }


    /**
     * 
     * @param {string} findName -字段名
     * @param {string} findValue -字段属性
     * @param {boolean} isEq -是否相等
     * @returns {object} ctx.condition.where
     */
    _searchBoxWhere(findName, findValue, isEq) {
        //const { ctx } = this;
        const Op = this.app.Sequelize.Op;
        let name = typeof findName === 'string' ?
            (findName.includes('.') ? '$' + findName + '$' : findName) : '';
        let value = typeof findValue === 'string' ? findValue : '';
        // if (!ctx.controllerOption.attributes.includes('id')
        //     || !ctx.controllerOption.attributes.includes('name')) {

        //     throw new Error('comboGridWhere:do not have id or name ');
        // }

        //return ctx.condition.where
        if (name === '') { return {}; }
        if (isEq === 'true') {
            return {
                [name]: {
                    [Op.eq]: value
                },
            };
        } else {
            return {
                [name]: {
                    [Op.like]: '%' + value + '%'
                },
            };
        }
    }

    /**
     * 
     * @param {int} page -第几页
     * @param {int} rows -每页几行
     * @returns {array}  [ctx.condition.offset,ctx.condition.limit]
     */
    _limit(page, rows) {
        //const { ctx } = this;
        let innerPage = Number.parseInt(page);
        innerPage = Number.isNaN(innerPage) ? 1 : innerPage;

        let limit = Number.parseInt(rows);
        limit = Number.isNaN(limit) ? 50 : limit;

        let offset = (innerPage - 1) * limit;
        // return [ctx.condition.offset,ctx.condition.limit]
        return [offset, limit];
    }

    /**
     * 
     * @param {string} sortName 
     * @param {string} sortOrder 
     * @returns {object} ctx.condition.order
     */
    _order(sortName, sortOrder) {
        //const { ctx } = this;

        let name = typeof sortName === 'string' ? sortName.split(',') : [''];

        if (name[name.length - 1] === '') {
            name.pop();
        }
        //return ctx.condition.order
        if (name.length == 0) { return {}; }

        let order = typeof sortOrder === 'string' ? sortOrder.split(',') : [''];
        if (order[order.length - 1] === '') {
            order.pop();
        }
        //return ctx.condition.order
        if (order.length !== name.length) { return {}; }

        let condition = [];
        for (let i = 0; i < name.length; i++) {
            if (name[i].includes('.')) {
                condition.push([...name[i].split('.'), order[i]]);
            } else {
                condition.push([name[i], order[i]]);
            }
        }
        //return ctx.condition.order
        return condition;
    }

    /**
     * 
     * @param {string} where -ctx.request.body
     * @return {Array} [ctx.condition.muiltModelWhere,ctx.condition.where]
     */
    _where(where) {
        const { ctx } = this;
        const Op = this.app.Sequelize.Op;
        const O = ctx.controllerOption;
        let muiltModelWhere = false;
        let whereRows = JSON.parse(where);
        let whereArray = ['and'];

        let allBracketLength = 0;
        let errMessage = '';
        for (let row of whereRows) {
            //括号错误
            allBracketLength += row.leftBracket.length;
            allBracketLength -= row.rightBracket.length;
            if (allBracketLength < 0) {
                errMessage = '括号错误';
                break;
            }
            //逻辑符号
            let lastWhere = whereArray[whereArray.length - 1];
            if (lastWhere != 'or' && lastWhere != 'and') {
                errMessage = '逻辑符号错误';
                break;
            }
            //列名错误
            if (!O.selectAttributes.includes(row.field)) {
                errMessage = '列名错误';
                break;
            }
            //where生成
            let leftBracketArray = [];
            let rightBracketArray = [];
            let bracketLength = row.leftBracket.length - row.rightBracket.length;
            if (bracketLength > 0) {
                leftBracketArray = Array(bracketLength).fill('(');
            } else {
                rightBracketArray = Array(-bracketLength).fill(')');
            }

            whereArray.push(...leftBracketArray);
            let value = row.value;
            if (row.compareSymbol === 'like' || row.compareSymbol === 'notLike') {
                value = '%' + value + '%';
            }
            if (row.field.includes('.')) {
                row.field = '$' + row.field + '$';
                muiltModelWhere = true;
            }
            whereArray.push({
                [row.field]: {
                    [Op[row.compareSymbol]]: value
                },
            });

            whereArray.push(...rightBracketArray);
            whereArray.push(row.logicalSymbol);
        }
        if (errMessage) {
            throw new Error(errMessage);
        }
        if (allBracketLength != 0) {
            throw new Error(errMessage);
        }

        whereArray.shift(); //默认值'and'，删除
        whereArray.pop(); //最后的逻辑符号为空或其他，删除

        let toObj = function (whereArray) {
            if (!whereArray) {
                return {};
            }
            if (whereArray.length === 1) {
                return whereArray[0];
            }
            //去掉 成对的收尾()
            while (whereArray[0] === '(' && whereArray[whereArray.length - 1] === ')') {
                whereArray.shift();
                whereArray.pop();
            }



            let leftArray = [];
            let leftBracketLength = 0;
            let firstItem = whereArray.shift();
            while (firstItem) {
                leftArray.push(firstItem);
                switch (firstItem) {
                    case 'or':
                    case 'and':
                        if (leftBracketLength === 0) {
                            leftArray.pop();
                            let left = leftArray;
                            let right = whereArray;
                            if (left.length === 1) {
                                left = left.pop();
                            } else {
                                left = toObj(left);
                            }
                            if (right.length === 1) {
                                right = right.pop();
                            } else {
                                right = toObj(right);
                            }
                            return {
                                [Op[firstItem]]: [left, right]
                            };
                        }
                        break;
                    case '(':
                        leftBracketLength++;
                        break;
                    case ')':
                        leftBracketLength--;
                        break;
                }

                firstItem = whereArray.shift();
            }
        };
        //return [ctx.condition.muiltModelWhere,ctx.condition.where]
        return [muiltModelWhere, toObj(whereArray)];
    }

    /**
     * 对外服务 根据ctx.request.body的值进行数据查询
     */
    async findAll() {
        const { ctx } = this;
        const B = ctx.request.body;
        const C = ctx.condition = {};
        const M = ctx.model;
        const O = ctx.controllerOption;

        if (O.excludeAttributes.length > 0) {
            C.attributes = {
                exclude: O.excludeAttributes
            };
        }
        //combo组件发回的查询如果为空,不进行查询动作
        // if (B.q === '') {
        //     return {
        //         count: 0,
        //         rows: [],
        //     };
        // }

        if (B.q) {
            C.where = this._comboWhere(B.q);
        } else if (B.name) {
            C.where = this._searchBoxWhere(B.name, B.value, B.isEq);
        } else if (B.where) {
            [C.muiltModelWhere, C.where] = this._where(B.where);
        }

        if (B.page) {
            [C.offset, C.limit] = this._limit(B.page, B.rows);
        }

        if (B.sort) {
            C.order = this._order(B.sort, B.order);
        }


        /********************************???????????? */
        if (O.includeModel) {
            // ctx.condition.include = [{
            //     model: models.UserType,
            //     attributes: ['name']
            // }];
            C.include = O.includeModel;
        }

        if (B.originalModel) {
            C.include = null;
        }

        let result = await M[O.modelName].findAndCount(C);
        return result;

    }

    /**
     * 
     * @param {Array} records 要更新或增加的数据
     * @returns {int} 更新或增加的条数
     */
    async _upsert(records) {
        const { ctx } = this;
        //const B = ctx.request.body;
        const M = ctx.model;
        const O = ctx.controllerOption;

        if (!Array.isArray(records)) {
            return 0;
        }

        var upsertRecords = [];
        if (records.length) {
            upsertRecords = records.map((row) => {
                Object.keys(row).forEach(field => {
                    if (!O.updateAttributes.includes(field)) {
                        delete row[field];
                    }
                    if (field.includes('_id') && !row[field]) {
                        row[field] = null;

                    }
                })
                return M[O.modelName].upsert(row, {
                    fields: O.updateAttributes
                });
            });
            await Promise.all(upsertRecords);
        }
        return upsertRecords.length;
    }

    /**
     * 对外服务 根据ctx.request.body.insert的值进行数据增加
     * @returns {int}增加了多少条
     */
    async insert() {
        const { ctx } = this;
        const B = ctx.request.body;
        // const M = ctx.model;
        // const O = ctx.controllerOption;

        var length = await this._upsert(B.insert);
        return length;
    }

    /**
     * 对外服务 根据ctx.request.body.update的值进行数据增加
     * @returns {int}增加了多少条
     */
    async update() {
        const { ctx } = this;
        const B = ctx.request.body;
        // const M = ctx.model;
        // const O = ctx.controllerOption;

        var length = await this._upsert(B.update);
        return length;
    }

    /**
     * 对外服务 根据ctx.request.body.delete的值进行数据删除
     * @returns {int}删除了多少条
     */
    async delete() {
        const { ctx } = this;
        const B = ctx.request.body;
        const M = ctx.model;
        const O = ctx.controllerOption;
        const Op = this.app.Sequelize.Op;
        if (!Array.isArray(B.delete)) {
            return 0;
        }

        var deleteRecordIDs = B.delete.map((row) => row[M[O.modelName].primaryKeyField]);
        var deleteRecordLength = deleteRecordIDs.length;
        if (deleteRecordLength) {

            deleteRecordLength = await M[O.modelName].destroy({
                where: {
                    [M[O.modelName].primaryKeyField]: {
                        [Op.in]: deleteRecordIDs
                    }
                }
            });
        }
        return deleteRecordLength;
    }

    /**
     * 对外服务 根据ctx.ControllerOption.updateAttributes 是否含有sn 则更新sn
     * @returns {int}更新了多少天sn
     */
    async updateSn() {
        const { ctx } = this;
        //const B = ctx.request.body;
        const M = ctx.model;
        const O = ctx.controllerOption;

        let AllRecord = await M[O.modelName].findAll({
            attributes: ['id', 'sn'],
            order: [['sn', 'asc']]
        });

        let changeSn = [];
        let newSn = 1;
        AllRecord.forEach(record => {
            if (record.sn != newSn) {
                record.sn = newSn;
                changeSn.push(record.save());
            }
            newSn++;
        });
        if (changeSn.length > 0) {
            await Promise.all(changeSn);
        }
        return changeSn.length;


    }
    /**
     * 对外服务 根据ctx.request.body的值进行数据增改善
     */
    async save() {

        const { ctx } = this;
        //const B = ctx.request.body;
        const O = ctx.controllerOption;

        var deleteRecordsLength = await this.delete();
        var newRecordsLength = await this.insert();
        var updateRecordsLength = await this.update();

        var message = `    新增${newRecordsLength}条      更新${updateRecordsLength}条    删除${deleteRecordsLength}条  
         `;

        if (O.updateAttributes.includes('sn')) {
            let changeSnLength = await this.updateSn();
            message += `    序号重更${changeSnLength}条`;
        }

        return message;
        // ctx.response.body = {
        //     message: message,
        // };
    };

    /**
     * 
     */
    async replace() {
        const { ctx } = this;
        const B = ctx.request.body;
        const C = ctx.condition = {};
        const M = ctx.model;
        const O = ctx.controllerOption;
        const Op = this.app.Sequelize.Op;

        // if (O.excludeAttributes.length > 0) {
        //     C.attributes = {
        //         exclude: O.excludeAttributes
        //     };
        // }
        C.where = {};
        if (B.name) {
            C.where = this._searchBoxWhere(B.name, B.value, B.isEq);
        } else if (B.where) {
            [C.muiltModelWhere, C.where] = this._where(B.where);
        }



        var updateObj = {};
        B.update.forEach(element => {
            updateObj[element.field] = element.value;
        });

        if (C.muiltModelWhere) {
            let condition = {};
            condition.include = O.includeModel;
            if (O.excludeAttributes.length > 0) {
                condition.attributes = {
                    exclude: O.excludeAttributes
                };
            }
            condition.where = C.where;
            condition.raw = true;
            let allRecord = await M[O.modelName].findAll(condition);
            let allRecordIDs = allRecord.map(record => record[M[O.modelName].primaryKeyField]);

            C.where = {
                [M[O.modelName].primaryKeyField]: {
                    [Op.in]: allRecordIDs
                }
            };
        }
        delete C.muiltModelWhere;
        C.fields = O.updateAttributes;
        var updateRecordsLength = await M[O.modelName].update(updateObj, C);
        return updateRecordsLength;


    }

}

module.exports = NormalService;

