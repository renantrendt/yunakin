import platformConfig from "./config/app-config";

/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: platformConfig.variables.NEXT_URL || 'http://localhost:3000/',
    generateRobotsTxt: true, // (optional)
    // ...other options
}