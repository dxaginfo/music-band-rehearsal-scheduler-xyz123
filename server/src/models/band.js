module.exports = (sequelize, DataTypes) => {
  const Band = sequelize.define('Band', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'bands',
    timestamps: true,
    underscored: true,
  });

  Band.associate = (models) => {
    Band.hasMany(models.BandMember, {
      foreignKey: 'bandId',
      as: 'members',
    });
    
    Band.hasMany(models.Rehearsal, {
      foreignKey: 'bandId',
      as: 'rehearsals',
    });
    
    Band.hasMany(models.Song, {
      foreignKey: 'bandId',
      as: 'songs',
    });
    
    Band.hasMany(models.Availability, {
      foreignKey: 'bandId',
      as: 'availabilities',
    });
    
    Band.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'creator',
    });
  };

  return Band;
};