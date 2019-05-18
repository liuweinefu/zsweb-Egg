const Service = require('egg').Service;

/**
 * 以'_'开头的函数原则上只考虑输入和输出，尽量不用ctx内的变量
 * 
 */
class NormalService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    /**
     *sqModel 按条件查询   参数options参见http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-findAndCountAll
     */
    async find() {
        const { ctx } = this;
        const M = ctx.currentModel;
        const C = ctx.options;
        if (!M) {
            return false;
        }
        let result = await M.findAndCountAll(C);
        return result;
    }

    async update() {
        const { ctx } = this;
        const M = ctx.currentModel;
        const C = ctx.options;
        const D = ctx.data;

        if (!Array.isArray(D) || D.length === 0) {
            return 0;
        }

        var PromiseQueue = [];

        PromiseQueue = D.map((row) => {
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

        return upsertRecords.length;


    }





}

module.exports = NormalService;

