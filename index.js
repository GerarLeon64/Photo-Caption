const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

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
        allowNull: false,
        get() {
            const rawValue = this.getDataValue('username');
            return rawValue;
        }
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
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
    image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
// setting up one-to-many and one-to-one relationships
User.hasMany(Caption);
Caption.hasOne(User);

Caption.sync( { alter: true }).then(() => {
    // working with our updated table

})
.catch((err) => {
    console.log(err);
})