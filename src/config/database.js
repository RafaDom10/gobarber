module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'gobarber',
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
