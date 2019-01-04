module.exports = function (sequelize, DataTypes) {
    var BookAdded = sequelize.define("BookAdded", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return BookAdded;
};