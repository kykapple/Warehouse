const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
              type: Sequelize.STRING(40),
              allowNull: false,
              primaryKey: true,
            },
            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            provider: {     // 로컬 혹은 카카오 로그인 구별 -> default 로컬
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: "User",
            tableName: "users",
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
            paranoid: true,
        });
    }

    static associate(db) {
        db.User.hasMany(db.Post, { foreignKey: 'userId', sourceKey: 'id'});
        db.User.hasOne(db.Characteristic, { foreignKey: 'userId', sourceKey: 'id'});
    }
}

module.exports = User;