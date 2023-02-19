/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true
};

const withTranspileModules = require("next-transpile-modules")(["pdfjs-dist"]);

module.exports = withTranspileModules({
  // your Next.js configuration goes here
});
