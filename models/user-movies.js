module.exports = function(sequelize, DataTypes) {
    var UserMovies = sequelize.define("UserMovies", {
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

    UserMovies.associate = function(models){
        UserMovies.belongsTo(models.Movies, {foreignKey: "item"})
    };

    return UserMovies;
};