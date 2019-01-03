module.exports = function (sequelize, DataTypes) {
    var BookAdded = sequelize.define("UserAddedBooks", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist:{
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return BookAdded;
};