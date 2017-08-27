module.exports = {
  apps: [
    {
      name: 'Jobo-Mysql',
      script: 'server.js',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'production',
        NODE_PATH: './api',
        APIPORT: 58724
      },
      env_production: {
        NODE_ENV: 'production',
        NODE_PATH: './api',
        APIPORT: 58724
      }
    },
  ],
};