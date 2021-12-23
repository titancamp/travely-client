/**
 * @description - Returns a function which knows provided prefix and will return string prefix + name.
 * @param {String} prefix - prefix
 * @returns {Function}
 */
export default function createPrefix(prefix) {
  return (name) => `@@APP/${prefix}/${name}`;
}
