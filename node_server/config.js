const path=require('path');

module.exports={
  //database
  db_host: 'localhost',
  db_port: 3306,
  db_user: 'root',
  db_password: '',
  db_name: 'gkxdatabase',

  //server
  port: 8080,

  //path
  upload_path: path.resolve(__dirname, 'upload')
}
