const Service = require('egg').Service;

/**
 * 以'_'开头的函数原则上只考虑输入和输出，尽量不用ctx内的变量
 * 
 */
class NormalService extends Service {
    constructor(ctx) {
        super(ctx);
    }
    async findAll(page = 1, rows = 50) {

        const user = await this.ctx.db.query('select * from user where uid = ?', uid);
        return user;
    }

}

module.exports = NormalService;

