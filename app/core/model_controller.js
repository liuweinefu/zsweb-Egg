const md5 = require('md5');
const { Controller } = require('egg');
class ModelController extends Controller {


    constructor(ctx) {
        // ctx.currentModel = ctx.model.User;
        // ctx.findOptions = {};//参考：http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-findAll
        // ctx.upsertOptions = {};//参考:http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-upsert
        // ctx.destroyOptions = {};//参考：http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-destroy
        super(ctx);
    }


    /**
     * 
     * @param {string} whereString 
     * @return {Array} xxxOptions
     */
    _getWhereObj(whereString) {
        const Op = this.app.Sequelize.Op;
        // const { ctx } = this;        
        // const M = ctx.currentModel;
        //let muiltModelWhere = false;

        let whereRows = JSON.parse(whereString);
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
                // muiltModelWhere = true;
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

        const changeWhereArrayToWhereObj = function (whereArray) {
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
                                left = changeWhereArrayToWhereObj(left);
                            }
                            if (right.length === 1) {
                                right = right.pop();
                            } else {
                                right = changeWhereArrayToWhereObj(right);
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
        return changeWhereArrayToWhereObj(whereArray);
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

    //查询数据
    async find() {
        const { ctx } = this;
        const B = ctx.request.body;
        const Fo = ctx.findOptions;
        const M = ctx.currentModel;


        // const SS = ctx.session;
        if (B.page === undefined || B.rows === undefined) {
            [Fo.offset, Fo.limit] = [0, 50]
        } else {
            [Fo.offset, Fo.limit] = this._limit(B.page, B.rows);
        }

        //兼容easyUI，应更改
        if (B.sort && B.order) {
            Fo.order = this._order(B.sort, B.order);
        }


        Fo.where = this._getWhereObj(B.where);

        let result = await M.findAndCountAll(Fo);
        ctx.response.body = {
            total: result.count,
            rows: result.rows
        };
    }


    
    //逐条增改删
    async save() {
        const { ctx } = this;
        const B = ctx.request.body;
        const Fo = ctx.findOptions;
        const M = ctx.currentModel;

        //{ B.delete, B.insert, B.update };

        var deleteRecordsLength = await this._delete(B.delete);
        var newRecordsLength = await this._insert(B.insert);
        var updateRecordsLength = await this._update(B.update);



        if (O.updateAttributes.includes('sn')) {
            let changeSnLength = await this.updateSn();
            message += `    序号重更${changeSnLength}条`;
        }


        ctx.response.body = {
            deleteRecordsLength,
            newRecordsLength,
            updateRecordsLength
        };





    }




    //404错误
    notFound(msg) {
        msg = msg || 'not found';
        this.ctx.throw(404, msg);
    }
}
module.exports = ModelController;