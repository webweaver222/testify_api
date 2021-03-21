function getKey(args) {
  return args.map((arg) => "[" + arg + ":" + typeof arg + "]").join("|");
}

module.exports = {
  memo: function (fn, length) {
    const cache = new Map();

    return async (...args) => {
      const key = getKey(args);
      if (cache.has(key)) return cache.get(key);

      const data = await fn(...args);

      if (cache.size > length) {
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
        console.log(`${firstKey} deleted`);
      }

      cache.set(key, data);
      console.log(`${key} was add to cache`);

      return data;
    };
  },

  verifyOrigin: function (ctx) {
    return function (validOrigins) {
      const origin = ctx.headers.origin;
      if (validOrigins.indexOf(origin) === -1) return false;
      return origin;
    };
  },
};
