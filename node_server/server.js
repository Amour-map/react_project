const Koa=require('koa');
const Router=require('koa-router');
const {port, upload_path}=require('./config');
const http=require('http');
const io=require('socket.io');
const body=require('koa-better-body');
const convert=require('koa-convert');
const static=require('koa-static');
const session=require('koa-session');
const fs=require('fs');
const path=require('path');

//
let server=new Koa();
server.context.db=require('./libs/database');

try{
  server.keys=JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '.keys')).toString()
  );
  console.log(`loaded ${server.keys.length} keys`);
}catch(e){
  console.log('can not read keys, please generate it first:\nnode utils/genkeys');
}

server.use(session({
  maxAge: 20*60*1000,
  autoCommit: true,
  httpOnly: true,
  signed: true,
  renew: true
}, server));

server.use(convert(body({uploadDir: upload_path})));

//
server.use(async (ctx,next)=>{
  try{
    console.log(`[${new Date().toGMTString()}] ${ctx.method} ${ctx.url}`);
    await next();
    console.log(ctx.body);
  }catch(e){
    ctx.body={ok: false, err: 'service internal error'};
    console.error(e);
  }
});

server.context.checkLogin=function (){
  let {adminID}=this.session;

  if(!adminID){
    this.body={ok: false, err: 'need to login'};
  }else{
    return true;
  }
}

//
let router=new Router();

router.use('/api', require('./router/api'));
router.use('/admin', require('./router/admin'));

server.use(router.routes());

//
server.use(static('./static'));

//
let httpServer=http.Server(server.callback());
httpServer.listen(port);
require('./libs/host').forEach(host=>{
  console.log(`server running at ${host}:${port}`);
});

console.log('http server ready');

//
let wsServer=io.listen(httpServer);

wsServer.on('connection', sock=>{

});
console.log('websocket server ready');
