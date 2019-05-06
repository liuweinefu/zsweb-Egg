'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // ctx.body = 'hi, egg';
    const dataList = {};
    await ctx.render('index.tpl', dataList);
  }
  async upload() {
    const { ctx } = this;
    ctx.body = 'hi, egg';

  }
}

module.exports = HomeController;
