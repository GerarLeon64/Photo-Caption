const Sequelize = require('sequelize');

const sequelize = new Sequelize('photos', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres'
});

const User = sequelize.define('user', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

const Image = sequelize.define('image', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    captionId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

const Caption = sequelize.define('caption', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
    },
    imageId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true
    },
    descripton: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
// setting up one-to-many and one-to-one relationships
User.hasMany(Caption, {
    foreignKey: 'userId'
});
Caption.belongsTo(User);

Caption.hasOne(Image, {
    foreignKey: 'captionId'
});
Image.belongsTo(Caption);

Image.sync( { alter: true }).then(() => {
    // working with our updated table
    return Image.findAll();
}).then((data) => {
    data.forEach(element => {
        console.log(element.toJSON());
    })
})
.catch((err) => {
    console.log(err);
})