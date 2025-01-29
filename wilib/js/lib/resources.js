(function () {
  var resourceCache = {};
  var readyCallbacks = [];

  // lendo url da imagem ou array de imagens
  function load(objOrArray) {
    if (objOrArray instanceof Array) {
      objOrArray.forEach(function (obj) {
        _load(obj);
      });
    } else {
      _load(objOrArray);
    }
  }

  function _load(obj) {
    if (resourceCache[obj.id]) {
      return resourceCache[obj.id];
    } else {
      var img = new Image();
      img.onload = function () {
        resourceCache[obj.id] = img;

        if (isReady)
          readyCallbacks.forEach(function (func) {
            func();
          });
      };

      resourceCache[obj.id] = false;
      img.src = obj.url;
    }
  }

  function get(id) {
    return resourceCache[id];
  }

  function isReady() {
    var ready = true;
    for (var k in resourceCache) {
      if (resourceCache.hasOwnProperty(k) && !resourceCache[k])
        ready = false;
    }

    return ready;
  }

  function onReady(func) {
    readyCallbacks.push(func);
  }

  window.resources = {
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady
  };
})();
