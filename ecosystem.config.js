module.exports = {
  apps: [
    {
      name: "nuxt-app",
      exec_mode: "cluster",
      instances: "1",
      script: "./server/index.mjs",
      port: 80
    },
  ],
};
