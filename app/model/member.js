'use strict';

module.exports = app => {
    const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

    const Member = app.model.define('Member', {
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
            //索引长度受限，776bytes
            type: STRING(16),
            allowNull: false,
            //unique: true
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
        case: {
            type: TEXT
        },
        case_remark: {
            type: TEXT
        }
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'member',
        });


    Member.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { Member, Card, Consumption } = app.model;
        Member.belongsTo(Card);
        Member.hasMany(Consumption);
        // Member.hasMany(Case);

    };



    return Member;
};