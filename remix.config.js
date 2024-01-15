/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  // publicPath: '/Ping-Pong-Application/',
  serverBuildPath: 'build/index.js',
  serverBuildTarget: 'vercel',
};
