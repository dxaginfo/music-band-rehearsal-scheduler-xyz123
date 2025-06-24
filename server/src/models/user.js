const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  });

  // Instance methods
  User.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  // Class methods
  User.associate = (models) => {
    User.hasMany(models.BandMember, {
      foreignKey: 'userId',
      as: 'bandMemberships',
    });
    
    User.hasMany(models.Rehearsal, {
      foreignKey: 'createdBy',
      as: 'createdRehearsals',
    });
    
    User.hasMany(models.Attendance, {
      foreignKey: 'userId',
      as: 'attendances',
    });
    
    User.hasMany(models.Availability, {
      foreignKey: 'userId',
      as: 'availabilities',
    });
    
    User.hasMany(models.Notification, {
      foreignKey: 'userId',
      as: 'notifications',
    });
    
    User.hasMany(models.File, {
      foreignKey: 'uploadedBy',
      as: 'uploadedFiles',
    });
  };

  return User;
};