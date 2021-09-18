// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // CN:autoprefixer 会去读取 package.json 下 browserslist的配置参数
    // EN:to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
