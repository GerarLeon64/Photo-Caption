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

User.sync( { alter: true }).then(() => {
    // working with our updated table
    return User.create({
        username: 'Jimmy',
        password: '456'
    });
}).then((data) => {
    console.log(data.toJSON());
    console.log('User added to database!');
})
.catch((err) => {
    console.log(err);
})