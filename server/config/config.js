let config = require('./config.json')
const env = process.env.NODE_ENV || 'development'
console.log('NODE_ENV ***', env)

if (env === 'development' || env === 'test') {
    envConfig = config[env]

    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key]
    })
}