module.exports = function(sequelize, DataTypes){
    var AlbumAdded = sequelize.define("AlbumAdded", {
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
    // AlbumAdded.associate = function(models) {
    //     AlbumAdded.belongTo(models.User);
    //     };
    return AlbumAdded;
};