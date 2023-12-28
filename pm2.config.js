module.exports = {
    apps: [
      {
        name: 'first-app-production',
        script: 'dist/src/main.js', // Path to your compiled Nest.js entry file
        instances: 'max', // Use all available CPU cores
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  