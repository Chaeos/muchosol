module.exports = {

    port: process.env.PORT || 3000,
    secret_token: process.env.SECRET || 'miclave',

    db: {
    
        host: process.env.DB_HOST || 'dbdesarrollo.c9vjqe4r9oeg.eu-west-1.rds.amazonaws.com',
        user: process.env.DB_USER || 'subroot',
        password: process.env.DB_PASSWORD || 'DDBcxgDsdz3CZMP0YM8e',
        database: process.env.DB_DATABASE || 'mtcplan'
    }
}