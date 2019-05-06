'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL, BOOLEAN } = app.Sequelize;

    const CommodityType = app.model.define('CommodityType', {
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
            unique: true
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
        remark: {
            type: STRING(255)
        }
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'commodity_type',
        });

    CommodityType.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { CommodityType, Commodity } = app.model;
        CommodityType.hasMany(Commodity);
    };



    return CommodityType;
};