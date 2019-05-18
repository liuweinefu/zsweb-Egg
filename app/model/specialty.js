'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, BOOLEAN, TEXT } = app.Sequelize;

    const Specialty = app.model.define('Specialty', {
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
        code: {
            //索引长度受限，776bytes
            type: STRING(16),
            allowNull: false,
            // unique: false
        },
        name: {
            type: STRING(16),
            allowNull: false,
            // unique: false
        },
        abstract: {
            type: TEXT,
            //defaultValue: UUIDV1,
        },
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'specialty',
        });


    Specialty.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });

        const { SpecialtyYear, Specialty, College, Stu } = app.model;
        Specialty.hasMany(SpecialtyYear);
        Specialty.belongsTo(College);
        Specialty.belongsToMany(Stu, { through: 'stu_specialty' });

        // Batch.belongsTo(Stu);
        // User.hasMany(Stu);


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

    return Specialty;
};