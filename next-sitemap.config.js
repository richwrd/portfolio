/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://eduardorichard.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
}

