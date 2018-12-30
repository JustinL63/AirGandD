// Database table for albums.

// Creating our Album model
module.exports = function(sequelize, DataTypes) {
  var Album = sequelize.define("Album", {
    rank: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    album:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: false
    },
    Year:{
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: false
    }
  });

  // Creating association between album and useralbum
  Album.associate = function(models) {
    Album.hasMany(models.UserAlbum);
    };

      return Album;
};