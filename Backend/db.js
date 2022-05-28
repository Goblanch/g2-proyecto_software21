import mysql2 from 'mysql2';

let database = {
    "host": "localhost",
    "user": "root",
    "password": "", 
    "database": "quizgeon"
}

const pool = mysql2.createPool(database)

pool.getConnection((err, conn) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error('Se ha cerrado la conexión a la base de datos');
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error('Demasiadas conexiones a la base de datos');
        }
        if (err.code === "ECONNREFUSED") {
            console.error('Conexión rechazada a la base de datos');
        }
    } else {
        if (conn) conn.release()
        console.log('Conexión establecida con la base de datos')
        return;
    }
})

export default pool;