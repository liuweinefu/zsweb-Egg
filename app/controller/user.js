'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  constructor(ctx) {
    ctx.currentModel = ctx.model.User;
    ctx.findOptions = {};//参考：http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-findAll
    ctx.upsertOptions = {};//参考:http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-upsert
    ctx.destroyOptions = {};//参考：http://docs.sequelizejs.com/class/lib/model.js~Model.html#static-method-destroy
    super(ctx);
  }




  async create() {
    const { ctx } = this;
    this.ctx.body = '创建';
  }
  async destroy() {
    const { ctx } = this;
    this.ctx.body = '删除';
  }
  async update() {
    const { ctx } = this;
    this.ctx.body = '修改';
  }
  async show() {
    const { ctx } = this;
    this.ctx.body = '查询';
  }

  async index() {
    // this.ctx.body = '列表';
    const { ctx, service } = this;

    const PAGE = 1;
    const ROWS = 50;

    let result = await service.findAll(PAGE, ROWS);

    ctx.response.body = {
      total: result.count,
      rows: result.rows
    };

  }


  async edit() {
    const { ctx } = this;
    this.ctx.body = '修改页面';
  }
}

module.exports = UserController;
