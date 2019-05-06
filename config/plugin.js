'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // },
//   nunjucks: {
//     enable: true,
//     package: 'egg-view-nunjucks',
//   },
//   session: true,
//   // sequelize = {
//   //   enable: true,
//   //   package: 'egg-sequelize'
//   // },

// };


module.exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

module.exports.session = true;

module.exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

// // config/plugin.js
// module.exports.passport = {
//   enable: true,
//   package: 'egg-passport',
// };

// module.exports.passportGithub = {
//   enable: true,
//   package: 'egg-passport-github',
// };

module.exports.cors = {
  enable: true,
  package: 'egg-cors',
};
