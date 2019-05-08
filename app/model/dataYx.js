'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL, BOOLEAN } = app.Sequelize;

    const DataYx = app.model.define('DataYx', {
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
        yxdh: {
            type: STRING(16),
            allowNull: false,
        },
        yxmc: {
            type: STRING(16),
            allowNull: false,
        },
        pcdm: {
            type: STRING(16),
            allowNull: false,
        },
        pcmc: {
            type: STRING(16),
            allowNull: false,
        },
        zydh: {
            type: STRING(16),
            allowNull: false,
        },
        zymc: {
            type: STRING(16),
            allowNull: false,
        },
        gbzydm: {
            type: STRING(16),
            allowNull: false,
        },
        gbzymc: {
            type: STRING(16),
            allowNull: false,
        },
        kldm: {
            type: STRING(16),
            allowNull: false,
        },
        klmc: {
            type: STRING(16),
            allowNull: false,
        },
        lqrs: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 9999999,
        },
        zgpm: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 9999999,
        },
        zdpm: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 9999999,
        },
        zgcj: {
            type: DECIMAL(16, 4),
            allowNull: false,
            defaultValue: 0.0,
        },
        zdcj: {
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
            tableName: 'data_yx',
            paranoid: true,
            // defaultScope: {
            //     where: {
            //         deleted_at: null
            //     }
            // },
        });

    DataYx.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        // const { Consumption, User, Card, Member, Employee, Commodity, Wage } = app.model;
        // Consumption.belongsTo(User);
        // Consumption.belongsTo(Card);
        // Consumption.belongsTo(Member);
        // Consumption.belongsTo(Employee);
        // Consumption.belongsTo(Commodity);
        // Consumption.belongsTo(Wage);
    };



    return DataYx;
};