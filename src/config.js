export default {
  env: process.env.NODE_ENV || "development",
  server: {
    port: process.env.PORT || 3001,
  },
  db: {
    url:
      process.env.MONGODB_URI ||
      "mongodb://heroku_g33rmkjk:gek3bvvq4dir2ui52hl4rith86@ds149874.mlab.com:49874/heroku_g33rmkjk",
  },
};
