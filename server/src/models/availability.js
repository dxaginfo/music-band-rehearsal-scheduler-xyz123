module.exports = (sequelize, DataTypes) => {
  const Availability = sequelize.define('Availability', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    bandId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bands',
        key: 'id',
      },
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfterStartTime(value) {
          if (new Date(value) <= new Date(this.startTime)) {
            throw new Error('End time must be after start time');
          }
        },
      },
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isRecurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    recurringPattern: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['daily', 'weekly', 'biweekly', 'monthly', 'custom']],
      },
    },
    recurringEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true,
      },
    },
    dayOfWeek: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 6,
      },
    },
  }, {
    tableName: 'availabilities',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['user_id', 'band_id'],
      },
      {
        fields: ['start_time', 'end_time'],
      },
    ],
  });

  Availability.associate = (models) => {
    Availability.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    
    Availability.belongsTo(models.Band, {
      foreignKey: 'bandId',
      as: 'band',
    });
  };

  return Availability;
};