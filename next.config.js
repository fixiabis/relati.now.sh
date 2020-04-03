const withSass = require('@zeit/next-sass')

module.exports = withSass({
  distDir: 'build',
  exportTrailingSlash: true,
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    };
  }
});
