const stdin=require('../libs/stdin');
const db=require('../libs/database');
const {md5}=require('../libs/crypto');

(async()=>{
  let username=await stdin('entry admin name: ');
  let password=await stdin('entry password: ');

  if(!username || !password){
    if(!username)console.log('invaild username');
    if(!password)console.log('invaild password');
  }else{
    let ok=await stdin(`admin name: ${username}\npassword: ${password}\nis this ok? (y/N)`);

    if(ok=='y'){
      let rows=await db.query("SELECT * FROM admin_table WHERE username=?", [username]);

      if(rows.length>0){
        console.log(`user exsits: ${username}`);
      }else{
        await db.query("INSERT INTO admin_table (username, password) values(?,?)", [username, md5(password)]);
        console.log(`administrator created successfully: ${username}`);
      }

    }else{
      console.log('user canceled');
    }
  }

  stdin.close();
  db.close();
})()
