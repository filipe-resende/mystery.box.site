require('babel-register')({
  presets: ['es2015', 'react']
})

const Sitemap = require('react-router-sitemap').default
const router = require('./src/routes/routes').default

function generateSitemap() {
  return new Sitemap(router)
    .build('http://eliastudioarq.com.br')
    .save('./public/eliastudioarqsitemap.xml')
}

generateSitemap()
yarn
