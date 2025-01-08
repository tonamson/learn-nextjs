module.exports = {
    apps: [
        {
            id: 0,
            name: 'API',
            script: './dist/main.js',
            instances: 1,
            exec_mode: 'cluster',
            watch: false,
            autorestart: true,
        },
    ],
}
