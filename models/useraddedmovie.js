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
        },
        nextup:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        completed:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        remove:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
    });
    return MovieAdded;
};