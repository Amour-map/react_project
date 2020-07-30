const base = require("./config/webpack.base");
module.exports = function(env, argv) {
  let config = null;
  if(!env) {
    // 生产环境
    config = {...require("./config/webpack.prod")}
  } else {
    // 测试环境
    config = {...require("./config/webpack.dev")}
  }
  return {
    ...base,
    ...config
  }
}
