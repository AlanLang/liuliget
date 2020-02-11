const withLess = require('@zeit/next-less')
if (typeof require !== 'undefined') {
  require.extensions['.less'] = (file) => {}
}

/* Without CSS Modules, with PostCSS */
module.exports = withLess({
  lessLoaderOptions : {
    javascriptEnabled : true
  }
})