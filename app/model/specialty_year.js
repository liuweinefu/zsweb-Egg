'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL, DATE, BOOLEAN, TEXT } = app.Sequelize;

    const SpecialtyYear = app.model.define('SpecialtyYear', {
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
        year: {
            type: STRING(4),
            allowNull: false,
        },
        maxScore: {//最高分
            type: DECIMAL(16, 4),
            defaultValue: 0.00,
        },
        minScore: {//最低分
            type: DECIMAL(16, 4),
            defaultValue: 0.00,
        },
        avgScore: {//平均分
            type: DECIMAL(16, 4),
            defaultValue: 0.00,
        },
        highestRanking: {//最高排位
            type: INTEGER,
        },
        lowestRanking: {//最低排位
            type: INTEGER,
        },
        middleRanking: {//中位数排位
            type: INTEGER,
        },
        total: {//招生量
            type: INTEGER,
            //defaultValue: UUIDV1,
        },
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'specialty_year',
        });


    SpecialtyYear.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { SpecialtyYear, Specialty, Batch } = app.model;

        SpecialtyYear.belongsTo(Specialty);
        SpecialtyYear.belongsTo(Batch);


        // College.hasMany(CollegeYear);


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

    return SpecialtyYear;
};