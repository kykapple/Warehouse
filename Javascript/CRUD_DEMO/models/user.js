const Sequelize = require('sequelize');

class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true,
            },
            age: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            married: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            comment: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
        }, {
            sequelize,                  // static init 메서드의 매개변수와 연결되는 옵션, 추후 db.sequelize 객체를 넣어야한다.
            modelName: "User",          // 모델 이름
            tableName: "users",         // 테이블 이름
            charset: 'utf8',            // 한글 입력 설정
            collate: 'utf8_general_ci', // 한글 입력 설정
            timestamps: false,          // true 이면, createAt과 updateAt 컬럼이 자동으로 추사된다.
            paranoid: false,            // true 이면, deleteAt 컬럼이 생성된다. 이후 로우를 삭제할 때 완전히 지워지지 않고 deleteAt에 지운 시각이 기록된다.
                                        // 로우를 조회하는 명령을 내렸을 때는 deleteAt의 값이 null인 로우를 조회한다. 이렇게 하는 이유는 로우를 복원해야하는 상황이 생기는 것을 대비하기 위함.
            underscored: false,         // camel case를 snake case로 바꾸는 옵션 -> ex) createdAt -> created_at
        });
    }

    static association(db) {
        db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id'});       // 일대다 연관 관계 매핑 (1 : N에서 1)
    }

};

module.exports = User;