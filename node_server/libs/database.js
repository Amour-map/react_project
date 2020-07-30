const mysql=require('mysql');
const co=require('co-mysql');
const config=require('../config');

let conn=mysql.createPool({
  host: config.db_host,
  port: config.db_port,
  user: config.db_user,
  password: config.db_password,
  database: config.db_name,
});
let db=co(conn);

module.exports=db;

db.close=function (){
  conn.end();
};
