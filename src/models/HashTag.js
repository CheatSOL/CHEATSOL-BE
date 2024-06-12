module.exports = (sequelize, DataTypes) => {
  const HashTag = sequelize.define(
    "HashTag",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: "hash_tag",
      timestamps: false,
    }
  );

  return HashTag;
};
