(function() {
  var pressedKeys = {};

  function setKey(e, status) {
    var code = e.keyCode, key;

    switch (code) {
      case 32:
        key = 'SPACE'; break;
      case 37:
        key = 'LEFT'; break;
      case 38:
        key = 'UP'; break;
      case 39:
        key = 'RIGHT'; break;
      case 40:
        key = 'DOWN'; break;
      default:
        // convertendo códigos ASCII para letras
        key = String.fromCharCode(code);
    }

    pressedKeys[key] = status;
  }

  document.addEventListener('keydown', function(e) {
    setKey(e, true);
  });

  document.addEventListener('keyup', function(e) {
    setKey(e, false);
  });

  document.addEventListener('blur', function(e) {
    pressedKeys = {};
  });

  window.input = {
    isDown: function(key) {
      return pressedKeys[key.toUpperCase()];
    }
  };
})();
