const Sequelize = require('sequelize');

class Characteristic extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            age: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            hobby: {
                type: Sequelize.STRING(20),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: false,
            paranoid: false,
            modelName: "Characteristic",
            tableName: "characteristics",
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
            underscored: false,
        })
    }

    static associate(db) {
        db.Characteristic.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
    }
}

module.exports = Characteristic;