// Database table for user interaction with albums.

// Creating our UserAlbum model
module.exports = function(sequelize, DataTypes) {
    var UserAlbum = sequelize.define("UserAlbum", {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nextup:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        unique: false
      },
      completed:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        unique: false
      },
      remove:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        unique: false
      }
    });
  
// Creating association between album and useralbum
UserAlbum.associate = function(models) {
    UserAlbum.belongsTo(models.Album, {foreignKey: "item"});
    };

      return UserAlbum;
  };