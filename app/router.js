'use strict';

/**
 * @param {Egg.Application} app - egg application
 */


module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/upload', controller.home.upload);
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