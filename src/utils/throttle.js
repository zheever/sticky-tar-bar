const throttle = function(fn, delay, atLeast) {
  let timer = null;
  let previous = null;

  return function() {
    let now = +new Date();

    if (!previous) previous = now;

    if (now - previous > atLeast) {
      fn();
      // 重置上一次开始时间为本次结束时间
      previous = now;
    } else {
      clearTimeout(timer);
      timer = setTimeout(function() {
        fn();
      }, delay);
    }
  };
};

export default throttle;
