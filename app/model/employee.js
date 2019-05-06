'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL } = app.Sequelize;

    const Employee = app.model.define('Employee', {
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
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'employee',
        });

    Employee.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { EmployeeType, Employee, Consumption, Wage } = app.model;
        Employee.belongsTo(EmployeeType);
        Employee.hasMany(Consumption);
        Employee.hasMany(Wage);
    };



    return Employee;
};