'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL, DATE, BOOLEAN } = app.Sequelize;

    const Stu = app.model.define('Stu', {
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
        year: {
            type: STRING(4),
            allowNull: false,
        },
        enable: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        xm: {
            type: STRING(16),
            allowNull: false,
            unique: false
        },
        ksh: {
            type: STRING(14),
            allowNull: true,
        },
        sfzh: {
            type: STRING(18),
            allowNull: true,
        },
        score: {//总分
            type: DECIMAL(16, 4),
            defaultValue: 0.00,
        },
        ranking: {//排位
            type: INTEGER,
            //defaultValue: UUIDV1,
        },

    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'stu',
        });


    Stu.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { User, Stu, Specialty } = app.model;

        Stu.belongsTo(User);

        Stu.belongsToMany(Specialty, { through: 'stu_specialty' });

        // Stu.hasMany(Batch);
        // User.hasMany(Stu);


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

    return Stu;
};