const uuid=require('uuid/v4');
const fs=require('fs');
const path=require('path');
const stdin=require('../libs/stdin');

(async ()=>{
  let str=await stdin('the number of keys: (100)');
  let N=parseInt(str);
  if(!str){
    N=100;
  }else{
    if(isNaN(N)||N<=0){
      console.log(`invaild number: ${str}`);
      return;
    }
  }

  let arr=[];
  for(let i=0;i<N;i++){
    arr.push(uuid().replace(/\-/g, ''));
  }

  fs.writeFileSync(path.resolve(__dirname, '../.keys'), JSON.stringify(arr));
  console.log(`generated ${N} keys`);

  stdin.close();
})();
