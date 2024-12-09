
const mysql=require('mysql2');



const connection= mysql.createPool({
    host: 'localhost', // Replace with your database host
    user: 'root', // Replace with your database user
    password: '', // Replace with your database password
    database: 'oldmutual', // Replace with your database name
    connectionLimit: 10 // Adjust connection limit as needed (default is 10)
  });
  




 module.exports=connection