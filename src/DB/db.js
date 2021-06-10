import s from "sequelize";
const { Sequelize, DataTypes } = s;

const { PGUSER, PGPORT, PGDATABASE, PGPASSWORD } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  port: PGPORT,
  host: "localhost",
  dialect: "postgres",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
  })
  .catch((e) => console.log(e));
const Blogs = sequelize.define("blogs", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cover: {
    type: DataTypes.BLOB,
    allowNull: false,
  },

  vaLue: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const Authors = sequelize.define("authors", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
});
const Comments = sequelize.define("comments", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rate: {
    type: DataTypes.INTEGER,
    min: 1,
    max: 5,
    allowNull: false,
  },
});
const category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Authors.hasMany(Blogs);
Blogs.belongsTo(Authors);

Blogs.hasMany(Comments);
Comments.belongsTo(Blogs);

Comments.hasOne(Authors);
Authors.belongsTo(Comments);

Comments.hasOne(category);
category.belongsTo(Comments);

export { Blogs, Authors, Comments, category };
export default sequelize;
