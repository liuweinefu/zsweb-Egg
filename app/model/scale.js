'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL } = app.Sequelize;

    const ExchangeRate = app.model.define('CardType', {
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
        scale: {
            type: DECIMAL(16, 4),
            allowNull: false,
            defaultValue: 1,
        },
        remark: {
            type: STRING(255)
        }
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'discount',
        });


    CardType.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { CardType, Card } = app.model;
        CardType.hasMany(Card);
    };

    return CardType;
};