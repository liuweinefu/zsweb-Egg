'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;

    const UserType = app.model.define('UserType', {
        // id: {
        //     type: UUID,
        //     primaryKey: true,
        //     defaultValue: UUIDV1,
        // },
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
            //defaultValue: DataTypes.UUIDV1,
        },
        name: {
            type: STRING(16),
            allowNull: false,
            unique: true
        },
        sn: {
            type: INTEGER,
            allowNull: false,
            //unique: true
        },
        remark: {
            type: STRING(255)
        }
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'user_type',
        });

    UserType.associate = function () {
        const { User, UserType, Menu } = app.model;
        UserType.hasMany(User);
        UserType.belongsToMany(Menu, { through: 'user_type_menu' });
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

    return UserType;
};