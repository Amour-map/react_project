const Router=require('koa-router');
const {upload_path}=require('../config');
const fs=require('fs');
const path=require('path');

function deleteUpload(file){
  return new Promise((resolve, reject)=>{
    fs.unlink(path.resolve(upload_path, file), err=>{
      if(err){
        resolve();
      }else{
        reject(err);
      }
    });
  });
}
function moveUpload(file){
  return new Promise((resolve, reject)=>{
    if(file.size==0){
      fs.unlink(file.path, ()=>{
        resolve(null);
      });
    }else{
      let newFile=path.basename(file.path).split('_')[1]+path.extname(file.name);
      fs.rename(file.path, path.resolve(upload_path, newFile), err=>{
        if(err){
          reject(err);
        }else{
          resolve(newFile);
        }
      });
    }
  });
}

function convertFeature(features){
  let json={};
  let keys={
    '上牌时间': 'purchase_time',
    '本车排量': 'mileage',
    '表显里程': 'distance',
    '变速箱': 'shift',
  };
  features.split(',').forEach(feature=>{
    let [name,value]=feature.split('|');

    if(keys[name]){
      json[keys[name]]=value;
    }
  });

  return json;
}
function fixCarData(car){
  car.images=car.images.split(',');
  Object.assign(car, convertFeature(car.features));
  car.features=car.features.split(',').map(feature=>feature.split('|'));

  return car;
}










let router=new Router();

//----------------------------------banner------------------------------------//
//OK
//获取所有banner数据
router.get('/banner', async ctx=>{
  let data=await ctx.db.query("SELECT * FROM banner_table");

  ctx.body={ok: true, data};
});
//OK
//删除一个banner
router.del('/banner/:id', async ctx=>{
  if(!ctx.checkLogin())return;

  let {id}=ctx.params;

  let data=await ctx.db.query("SELECT * FROM banner_table WHERE ID=?", [id]);
  if(!data.length){
    ctx.body={ok: false, err: `banner not found: ${id}`};
  }else{
    let {image}=data[0];

    await ctx.db.query("DELETE FROM banner_table WHERE ID=?", [id]);
    await deleteUpload(image);

    ctx.body={ok: true};
  }
});
//OK
//添加一个banner
router.post('/banner', async ctx=>{
  if(!ctx.checkLogin())return;

  let {title,sub_title,image}=ctx.request.fields;

  if(!title || !sub_title){
    ctx.body={ok: false, err: 'invaild argument'};
  }else{
    image=await moveUpload(image[0]);

    await ctx.db.query("INSERT INTO banner_table (title, sub_title, image) VALUES(?,?,?)", [
      title, sub_title, image
    ]);

    ctx.body={ok: true};
  }
});
//OK
//修改一个banner
router.post('/banner/:id', async ctx=>{
  if(!ctx.checkLogin())return;

  let {id}=ctx.params;
  console.log(ctx.request.fields);
  let {title, sub_title, image}=ctx.request.fields;

  if(!title || !sub_title){
    ctx.body={ok: false, err: 'invaild argument'};
  }else{
    image=await moveUpload(image[0]);

    if(image){
      await ctx.db.query("UPDATE banner_table SET title=?, sub_title=?,image=? WHERE ID=?", [title, sub_title, image, id]);
    }else{
      await ctx.db.query("UPDATE banner_table SET title=?, sub_title=? WHERE ID=?", [title, sub_title, id]);
    }
    ctx.body={ok: true};
  }
});

//------------------------------------car-------------------------------------//
//OK
//获取车辆列表
router.get('/carlist/:page', async ctx=>{
  let {page}=ctx.params;
  const pageSize=6;

  page=parseInt(page);

  if(isNaN(page)||page<1){
    ctx.body={ok: false, err: 'invaild page'};
  }else{
    let data=await ctx.db.query("SELECT ID,title,price,features,images FROM car_table LIMIT ?,?", [(page-1)*pageSize, pageSize]);
    data.forEach(car=>{
      fixCarData(car);
    });

    ctx.body={ok: true, data};
  }
});
//OK
//获取车辆详情
router.get('/car/:id', async ctx=>{
  let {id}=ctx.params;

  let rows=await ctx.db.query("SELECT * FROM car_table WHERE ID=?", [id]);

  if(!rows.length){
    ctx.body={ok: false, err: `data not found: ${id}`};
  }else{
    ctx.body={ok: true, data: fixCarData(rows[0])};
  }
});
//OK
//删除车辆
router.del('/car/:id', async ctx=>{
  if(!ctx.checkLogin())return;

  let {id}=ctx.params;

  let data=await ctx.db.query("SELECT images FROM car_table WHERE ID=?", [id]);

  if(!data.length){
    ctx.body={ok: false, err: `data not found: ${id}`};
  }else{
    let images=data[0].images.split(',');
    for(let i=0;i<images.length;i++){
      await deleteUpload(images[i]);
    }
    await ctx.db.query("DELETE FROM car_table WHERE ID=?", [id]);

    ctx.body={ok: true};
  }
});
//OK
//添加车辆信息
router.post('/car', async ctx=>{
  if(!ctx.checkLogin())return;

  let {title, price, feature_name, feature_value, description, images}=ctx.request.fields;
  price=parseInt(price);

  if(!title || !price || !feature_name || !feature_value || isNaN(price)){
    ctx.body={ok: false, err: 'invaild argument'};
  }else{
    features=[];
    for(let i=0;i<feature_name.length;i++){
      features.push(
        feature_name[i]+'|'+feature_value[i]
      );
    }
    features=features.join(',');

    let result=[];
    for(let i=0;i<images.length;i++){
      let img=await moveUpload(images[i]);

      img && result.push(img);
    }
    images=result.join(',');

    let data=await ctx.db.query(
      "INSERT INTO car_table (title,price,features,description,images) VALUES(?,?,?,?,?)",
      [title, price, features, description, images]
    );

    ctx.body={ok: true, data: {ID: data.insertId}};
  }
});
//OK
//修改车辆信息
router.post('/car/:id', async ctx=>{
  if(!ctx.checkLogin())return;

  let {id}=ctx.params;
  let {title, price, description}=ctx.request.fields;
  price=parseInt(price);

  if(!title || !price || isNaN(price) || !description){
    ctx.body={ok: false, err: 'invaild argument'};
  }else{
    let data=await ctx.db.query("SELECT * FROM car_table WHERE ID=?", [id]);
    if(!data.length){
      ctx.body={ok: false, err: `data not found: ${id}`};
    }else{
      await ctx.db.query("UPDATE car_table SET title=?,price=?,description=? WHERE ID=?", [title, price, description,id]);

      ctx.body={ok: true};
    }
  }
});

module.exports=router.routes();
