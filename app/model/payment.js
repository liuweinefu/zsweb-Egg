'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL, BOOLEAN } = app.Sequelize;

    const Consumption = app.model.define('Consumption', {
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
        price: {
            type: DECIMAL(16, 4),
            allowNull: false,
            defaultValue: 0.0,
        },
        quantity: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        // is_discount: {
        //     type: BOOLEAN,
        //     allowNull: false,
        //     defaultValue: true,
        // },
        is_cash: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_close: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_discount: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        remark: {
            type: STRING(255)
        }
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'consumption',
            paranoid: true,
            // defaultScope: {
            //     where: {
            //         deleted_at: null
            //     }
            // },
        });

    Consumption.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { Consumption, User, Card, Member, Employee, Commodity, Wage } = app.model;
        Consumption.belongsTo(User);
        Consumption.belongsTo(Card);
        Consumption.belongsTo(Member);
        Consumption.belongsTo(Employee);
        Consumption.belongsTo(Commodity);
        Consumption.belongsTo(Wage);
    };



    return Consumption;
};