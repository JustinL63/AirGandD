module.exports = function (sequelize, DataTypes) {
    var AlbumAdded = sequelize.define("UserAddedAlbums", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        album: {
            type: DataTypes.STRING,
            allowNull: false
        },
        artist:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        year:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return AlbumAdded;
};