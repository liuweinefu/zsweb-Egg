'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL } = app.Sequelize;

    const Branch = app.model.define('Branch', {
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
        remark: {
            type: STRING(255)
        },
        enable: {
            type: BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'branch',
        });


    Branch.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { Branch, Payment, Consumption } = app.model;
        Branch.hasMany(Payment);
        Branch.hasMany(Consumption);

    };

    return CardType;
};