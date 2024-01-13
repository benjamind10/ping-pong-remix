/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/.*'],
  appDirectory: 'app',
  assetsBuildDirectory: 'public/build',
  publicPath: '/ping-pong-remix/',
  serverBuildPath: 'build/index.js',
  serverBuildTarget: 'netlify',
};
