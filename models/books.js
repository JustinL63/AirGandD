module.exports = function(sequelize, DataTypes) {
    var Books = sequelize.define("Books", {
        rank: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        author:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    })

    Books.associate = function(models){
        Books.hasMany(models.UserBooks);
    };

    return Books;
}