const os=require('os');

let hosts=[];
let interfaces=os.networkInterfaces();
for(let name in interfaces){
  if(name.startsWith('VMware')){
    continue;
  }

  interfaces[name].forEach(({family, address})=>{
    if(family=='IPv4')hosts.push(address);
  });
}

module.exports=hosts;
