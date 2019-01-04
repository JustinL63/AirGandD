module.exports = function (sequelize, DataTypes) {
    var MovieAdded = sequelize.define("MovieAdded", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        year:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return MovieAdded;
};