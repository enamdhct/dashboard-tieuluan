/** @type {import('next').NextConfig} */
const path = require('path')
 
module.exports = {
  experimental: {
    serverActions: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    url: 'http://localhost:8000/api',
  }
}
