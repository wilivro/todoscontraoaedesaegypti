define(function (require) {

  var salve_a_floresta = addTarefa();
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(cb) {
    //jshint validthis: true
    edi.iniciar(_configEDI);

    ARR_TAREFAS[salve_a_floresta].resolve(cb);
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    start: _init
  };
});
