'use strict';

module.exports = app => {
    const { STRING, INTEGER, DECIMAL } = app.Sequelize;

    const ResourceType = app.model.define('ResourceType', {
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
        }
    }, {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'resource_type',
        });


    ResourceType.associate = function () {
        //app.model.User.hasMany(app.model.Post, { as: 'posts', foreignKey: 'user_id' });
        const { ResourceType, ResourceTypeLocation, Resource } = app.model;

        ResourceType.belongsTo(ResourceTypeLocation);
        ResourceType.hasMany(Resource);
    };

    return ResourceType;
};