module.exports = function(sequelize, DataTypes) {
    var UserBooks = sequelize.define("UserBooks", {
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
UserBooks.associate = function(models) {
    UserBooks.belongsTo(models.Books);
    };

      return UserBooks;
  };