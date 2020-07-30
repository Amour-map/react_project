const Router=require('koa-router');
const {md5}=require('../libs/crypto');

let router=new Router();


//管理员登录
router.post('/login', async ctx=>{
  let {username, password}=ctx.request.fields;

  if(!username || !password){
    ctx.body={ok: false, err: 'invaild argument'};
  }else{
    let rows=await ctx.db.query("SELECT ID, password FROM admin_table WHERE username=?", [username]);
    let data=rows[0];

    if(!data || data.password!=md5(password)){
      ctx.body={ok: false, err: 'invaild argument'};  //防止暴力猜测管理员账户
    }else{
      ctx.session.adminID=data.ID;

      ctx.body={ok: true};
    }
  }
});



module.exports=router.routes();
