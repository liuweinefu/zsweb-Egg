'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL } = app.Sequelize;

    const Wage = app.model.define('Wage', {
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
        wage: {
            type: DECIMAL(16, 4),
            allowNull: false,
            defaultValue: 0.0,
        },
        bonus: {
            type: DECIMAL(16, 4),
            allowNull: false,
            defaultValue: 0.0,
        },
        remark: {
            type: STRING(255)
        }
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'wage',
        });

    Wage.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { Wage, Consumption, Employee, User } = app.model;

        Wage.hasMany(Consumption);
        Wage.belongsTo(Employee);
        Wage.belongsTo(User);

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

    return Wage;
};