const db=require('../libs/database');
const readline=require('readline');

const r1=readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function read(msg){
  return new Promise((resolve, reject)=>{
    r1.question(msg, answer=>{
      resolve(answer);
    });
  });
}

module.exports=read;

read.close=function (){
  r1.close();
};
