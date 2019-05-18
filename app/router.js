'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

const models = ['User', 'UserType',]

module.exports = app => {
  const { router, controller } = app;

  // models.forEach(model => {
  //   // router.get('/' + ctr, controller[ctr].getTpl);
  //   router.post('/' + model + '/find', controller[model].find);
  //   router.post('/' + model + '/save', controller[model].save);
  //   router.post('/' + model + '/replace', controller[model].replace);
  //   router.post('/' + model + '/delete', controller[model].delete);
  // })

  // RESTfulAPI.forEach(url => {

  //   app.router.resources(url, '/api/' + url, app.controller.normal);
  // });


  // router.get('/', controller.home.index);
  // router.post('/upload', controller.home.upload);
};


// app/router.js
// module.exports = app => {
//   const { router, controller } = app;

//   // 挂载鉴权路由
//   // app.passport.mount('github');

//   // 上面的 mount 是语法糖，等价于
//   // const github = app.passport.authenticate('github', {});
//   // router.get('/passport/github', github);
//   // router.get('/passport/github/callback', github);
// };