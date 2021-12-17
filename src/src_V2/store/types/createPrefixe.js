/**
 * @description - Returns a function which know provided prefix, that function will return string prefix + name.
 * @param {String} prefix - prefix
 * @returns {Function}
 */
export default (prefix) => (name) => `@@APP/${prefix}/${name}`;
