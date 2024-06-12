module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    "Company",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.BIGINT,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "company",
      timestamps: true,
    }
  );

  return Company;
};
