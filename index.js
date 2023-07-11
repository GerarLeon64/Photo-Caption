const Sequelize = require('sequelize');

const sequelize = new Sequelize('photos', 'postgres', 'postgres', {
    host: 'localhost',
    port: 5433,
    dialect: 'postgres'
});

sequelize.authenticate().then(() => {
    console.log("Connection successful!");
}).catch((err) => {
    console.log(err);
});