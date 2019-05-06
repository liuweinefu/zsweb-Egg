/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1555493708327_3301';

  // add your middleware config here
  config.middleware = [];

  // //关闭csrf防御
  config.security = {
    csrf: false,
    // csrf: {
    //   useSession: true, // 默认为 false，当设置为 true 时，将会把 csrf token 保存到 Session 中
    //   // cookieName: 'csrfToken', // Cookie 中的字段名，默认为 csrfToken
    //   sessionName: 'csrfToken', // Session 中的字段名，默认为 csrfToken
    // },
  };
  // config.security = {
  //   csrf: {
  //     enable: false,
  //     ignoreJSON: true
  //   },
  //   domainWhiteList: ['http://localhost:8080']
  // };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };




  //模板设置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  //数据库设置
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'gct5',
    username: 'root',
    password: 'liu6wei5',
  };


  // // config/default.js
  // config.passportGithub = {
  //   //key: 'your_clientID',
  //   key: '0e973c5d6f91c8e0fa7e',
  //   // secret: 'your_clientSecret',
  //   secret: '5b299c268c5f1dc5ab8d06de54a25cebc3fa20c3',
  //   // callbackURL: '/passport/github/callback',
  //   callbackURL: 'http://127.0.0.1:7001/passport/github/callback'
  //   // proxy: false,
  // };



  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };



  return {
    ...config,
    ...userConfig,
  };
};
