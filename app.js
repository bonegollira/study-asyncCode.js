(function () {

  var LOOPCOUNT = 10000;

  function log (message) {
    document.querySelector('.console').textContent = message;
  }

  function doTest (testFunc) {
    for (var i = 1; i <= LOOPCOUNT; i++) {
      testFunc(i);
    }
  }

  function start (message) {
    var t = Date.now();

    return function () {
      var benchmark = Date.now() - t;
      log(LOOPCOUNT + ', ' + benchmark + 'ms: ' + message);
    };
  }

  window.doTestSetTimeout = function () {
    var i = 1;
    var end = start('setTimeout');
    doTest(function () {
      setTimeout(function () {
        ++i === LOOPCOUNT && end();
      });
    });
  };

  window.doTestSetInterval = function () {
    var i = 1;
    var end = start('setInterval');
    var t = setInterval(function () {
      if (++i === LOOPCOUNT) {
        clearInterval(t);
        end();
      }
    }, 0);
  };

  window.doTestEventListener = function () {
    var i = 0;
    var end = start('eventListener');
    var dom = document.createElement('div');
    var eventName = 'load';
    doTest(function (i) {
      dom.addEventListener(eventName, function () {
        ++i === LOOPCOUNT && end();
      }, false);
    });
    dom.dispatchEvent(new Event(eventName));
  };

}());
