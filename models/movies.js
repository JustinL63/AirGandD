// table for movies

module.exports = function(sequelize, DataTypes) {
    var Movies = sequelize.define("Movies",{
        rank:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
      },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        year:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        rating:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    })
    // associate to the usermovie tables
    Movies.associate = function(models) {
        Movies.hasMany(models.UserMovies);
    };

    return Movies;
}