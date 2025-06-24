module.exports = (sequelize, DataTypes) => {
  const Rehearsal = sequelize.define('Rehearsal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    bandId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'bands',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    locationDetails: {
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
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'scheduled',
      validate: {
        isIn: [['scheduled', 'cancelled', 'completed']],
      },
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    cancelledBy: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    cancellationReason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    reminderSent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'rehearsals',
    timestamps: true,
    underscored: true,
  });

  Rehearsal.associate = (models) => {
    Rehearsal.belongsTo(models.Band, {
      foreignKey: 'bandId',
      as: 'band',
    });
    
    Rehearsal.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator',
    });
    
    Rehearsal.belongsTo(models.User, {
      foreignKey: 'cancelledBy',
      as: 'canceller',
    });
    
    Rehearsal.hasMany(models.Attendance, {
      foreignKey: 'rehearsalId',
      as: 'attendances',
    });
    
    Rehearsal.hasMany(models.RehearsalNote, {
      foreignKey: 'rehearsalId',
      as: 'notes',
    });
    
    Rehearsal.belongsToMany(models.Song, {
      through: 'rehearsal_songs',
      foreignKey: 'rehearsalId',
      otherKey: 'songId',
      as: 'songs',
    });
  };

  return Rehearsal;
};