const dotenv = require('dotenv').config();

if (!dotenv) {
    throw new Error("Couldn't find .env file");
}

module.exports = {
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
    port: parseInt(process.env.PORT) || 5000,
    db: {
        path: process.env.DB_PATH
    }
}
