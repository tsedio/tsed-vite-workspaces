const { resolve, join } = require("path");
const packagesDir = resolve(__dirname, "../..");

/**
 * @param name {string}
 * @returns {string}
 */
function get(name) {
  return resolve(packagesDir, name);
}

/**
 *
 * @param name {string}
 * @param paths {string[]}
 * @returns {string[]}
 */
function map(name, paths) {
  const root = get(name);
  return paths.map((path) => join(root, path));
}

module.exports = {
  packagesDir,
  get,
  map
};
