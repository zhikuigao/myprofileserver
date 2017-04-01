const config = {
    local: {
        localDb: {
            host: 'mongodb://127.0.0.1:27017',
            name: 'myProcessTest'
        },
        remoteDb: {
            host: '192.168.1.205:27017',
            name: 'myProcess'
        },
        host: '/api'
    }
}

module.exports = config.local;
