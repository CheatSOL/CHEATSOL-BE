module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define(
    "AuthToken",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
      access_token: {
        type: DataTypes.TEXT,
      },
      access_token_expired: {
        type: DataTypes.DATE,
      },
      token_type: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "auth_token",
      timestamps: true,
    }
  );

  return AuthToken;
};
