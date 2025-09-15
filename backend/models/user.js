import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const User = db.define('User', {
  googleId: DataTypes.STRING,
  givenName: DataTypes.STRING,
  familyName: DataTypes.STRING,
  displayName: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  image: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  tableName: 'users',
  timestamps: false,
});

export default User;
