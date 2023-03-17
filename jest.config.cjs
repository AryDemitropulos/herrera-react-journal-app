module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: [], //Para que los paquetes de node no sean ignorados //Para que no haga transpilaciones de las cosas de firebase
};
