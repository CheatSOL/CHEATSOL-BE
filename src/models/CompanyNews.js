module.exports = (sequelize, DataTypes) => {
  const CompanyNews = sequelize.define(
    "CompanyNews",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      link: {
        type: DataTypes.STRING,
      },
      company_id: {
        type: DataTypes.BIGINT,
      },
    },
    {
      tableName: "company",
      timestamps: true,
    }
  );

  return CompanyNews;
};
