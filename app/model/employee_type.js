'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL } = app.Sequelize;

    const EmployeeType = app.model.define('EmployeeType', {
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
        wage: {
            type: DECIMAL(16,4),
            allowNull: false,
            defaultValue: 0.0,
        },
        sn: {
            type: INTEGER,
            allowNull: false,
            //unique: true
        },
        remark: {
            type: STRING(255)
        },
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'employee_type',
        });

    EmployeeType.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { EmployeeType, Employee } = app.model;
        EmployeeType.hasMany(Employee);
    };



    return EmployeeType;
};