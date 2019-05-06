'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL } = app.Sequelize;

    const Card = app.model.define('Card', {
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
        card_number: {
            type: STRING(16),
            allowNull: false,
            unique: true
        },
        name: {
            type: STRING(16),
            allowNull: false,
            unique: true
        },
        pass: {
            type: STRING(32),
            allowNull: true,
        },
        phone: {
            type: STRING(11),
            allowNull: false,
        },
        otherphone: {
            type: STRING(64),
            allowNull: true,
        },
        remark: {
            type: STRING(255)
        },
        price: {
            type: DECIMAL(16, 4),
            allowNull: false,
            defaultValue: 0.0,
        },
        value: {
            type: DECIMAL(16, 4),
            allowNull: false,
            defaultValue: 0.0,
        },
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'card',
        });


    Card.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { Card, CardType, Member, CardRecharge, Consumption } = app.model;
        Card.belongsTo(CardType);
        Card.hasMany(Member);
        Card.hasMany(CardRecharge);
        Card.hasMany(Consumption);
    };

    return Card;
};