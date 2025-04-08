const mainConfig = {
  app: {
    port: process.env.APP_PORT || 3000,
  },
  db: {
    url: process.env.DATABASE_URL,
  },
};

export default mainConfig;
