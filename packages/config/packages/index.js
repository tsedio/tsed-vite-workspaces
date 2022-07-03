const { resolve, join } = require("path");
const packagesDir = resolve(__dirname, "../..");

function get(name) {
  return resolve(packagesDir, name);
}

function map(name, paths) {
  const root = get(name);
  return paths.map((path) => join(root, path));
}

module.exports = {
  packagesDir,
  get,
  map
};
