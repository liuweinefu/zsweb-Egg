'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const Menu = app.model.define('Menu', {
        // id: {
        //     type: UUID,
        //     primaryKey: true,
        //     defaultValue: UUIDV1,
        // },
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            //defaultValue: UUIDV1,
        },
        name: {
            type: STRING(16),
            allowNull: false,
            //unique: true
        },
        router: {
            type: STRING(255)
        },
        sn: {
            type: INTEGER,
            allowNull: false,
            //unique: true
        },
        enable: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'menu',
        });


    Menu.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { Menu, UserType } = app.model;
        Menu.belongsToMany(UserType, { through: 'user_type_menu' });
    };

    // User.findByLogin = function* (login) {
    //     return yield this.findOne({
    //         where: {
    //             login: login
    //         }
    //     });
    // }

    // User.prototype.logSignin = function* () {
    //     yield this.update({ last_sign_in_at: new Date() });
    // }

    // User.associate = function (models) {
    //     //this === app.model.User;
    //     app.model.User.belongsTo(app.model.UserType);
    //     app.model.User.hasMany(app.model.CardRecharge);
    //     app.model.User.hasMany(app.model.CommodityWarehousing);
    //     app.model.User.hasMany(app.model.Consumption);
    //     app.model.User.hasMany(app.model.Wage);

    // };

    return Menu;
};