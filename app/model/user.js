'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

    const User = app.model.define('User', {
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
        nickname: {
            //索引长度受限，776bytes
            type: STRING(16),
            allowNull: false,
            unique: true
        },
        name: {
            type: STRING(16),
            allowNull: false,
            unique: false
        },
        pass: {
            type: STRING(32),
            //allowNull: false,
            //defaultValue: md5('888888'),
        },
        phone: {
            type: STRING(11),
            allowNull: true,
        },
        remark: {
            type: STRING(255)
        },
        location: {
            type: STRING(32),
            //allowNull: false,
            //defaultValue: md5('888888'),
        },
        enable: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        year: {
            type: STRING(4),
            allowNull: false,
        },
        last_sign_in_at: {
            type: DATE,
        }
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'user',
        });

    User.prototype.logSignin = async () => {
        await this.update({ last_sign_in_at: new Date() });
    }

    User.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { User, UserType, Stu } = app.model;

        User.belongsTo(UserType);
        User.hasMany(Stu);


        // app.model.User.belongsTo(app.model.UserType);
        // app.model.User.hasMany(app.model.CardRecharge);
        // app.model.User.hasMany(app.model.CommodityWarehousing);
        // app.model.User.hasMany(app.model.Consumption);
        // app.model.User.hasMany(app.model.Wage);
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

    return User;
};