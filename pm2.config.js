module.exports = {
    apps: [{
        name: 'nest',
        script: './dist/main.js',
        cwd: './',
        watch: true,
        autorestart: true,
        max_memory_restart: '200M',
        ignore_watch: [
            'node_modules',
            'logs',
            'src'
        ],
        merge_logs: true
    }]
}