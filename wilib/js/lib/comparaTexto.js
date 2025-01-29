define(function(require) {
  var click = {
    x: 0,
    y: 0
  }; // used for recording mouse cords
  var tarefaDigita = addTarefa();
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(input, callback, callbackFinal, config) {
    var peca = this;
    var objetivos = 0;

    edi.iniciar(_configEDI);

    //configurações
    var settings = {
      corCerta: '#27ae60',
      corErrada: 'red',
      corPadrao: '#666',
      fontBold: 'normal',
      validarAcentos: false,
      validarPontos: false,
      upCaser: false,
      lowerCaser: false,
      cb: function() {}
    };

    var ultimoCaractere, caractereEquivalente;

    //verificar se foi passado algum parametro no config"
    if (config) $.extend(settings, config);

    $(input).each(function() {
      if ($(this).attr('data-correta')) {
        peca.objetivos.push(0);
        edi.objetivos.push(0);
      }
    });

    //eventos
    $(input).keyup(function() {
      var texto;

      //validando acentos
      if (settings.validarAcentos) {

        var com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ',
          sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC';
        ultimoCaractere = $(this).val().toLowerCase().substring($(this).val().length - 1, $(this).val().length);
        caractereEquivalente = $(this).attr('data-correta').toLowerCase().substring($(this).val().length - 1, $(this).val().length);

        for (var i = 0; i < sem_acento.length; i++) {
          if (ultimoCaractere == sem_acento[i] && caractereEquivalente == com_acento[i]) {
            texto = $(this).val().substring(0, $(this).val().length - 1);
            $(this).val(texto + caractereEquivalente);
          }
        }

      }

      //validando pontos
      if (settings.validarPontos) {
        pontos = ',.;:';
        ultimoCaractere = $(this).val().toLowerCase().substring($(this).val().length - 1, $(this).val().length);
        caractereEquivalente = $(this).attr('data-correta').toLowerCase().substring($(this).val().length - 1, $(this).val().length);

        for (var j = 0; j < pontos.length; j++) {
          if (ultimoCaractere === pontos[j] && caractereEquivalente !== pontos[j]) {
            texto = $(this).val().substring(0, $(this).val().length - 1);
            $(this).val(texto);
          }
        }
      }

      //comparação de texto
      var a = $(this).val().toLowerCase() === $(this).attr("data-correta").substring(0, $(this).val().length).toLowerCase() && $(this).val().length !== 0;

      var b = $(this).val().toLowerCase() !== $(this).attr("data-correta").substring(0, $(this).val().length).toLowerCase() && $(this).val().length !== 0;

      //validação
      if (a) {
        $(this).css({
          color: settings.corPadrao
        });
      } else {
        $(this).css({
          color: settings.corErrada
        });
        $(this).css({
          fontWeight: settings.fontBold
        });
      }
      //validação
      if (a && $(this).val().length == $(this).attr("data-correta").length) {
        edi.objetivos.pop();
        peca.objetivos.pop();
        $(this).attr("disabled", true)
          .removeAttr('data-correta')
          .css("color", settings.corCerta);
        if (settings.upCaser)
          $(this).val($(this).val().toUpperCase());
        if (settings.lowerCaser)
          $(this).val($(this).val().toLowerCase());

        if (!edi.objetivos.length) {
          edi.finalizar();
          if (callbackFinal)
            callbackFinal($(this));

        }

        if (callback) callback($(this));

      }

    }).keydown(function() {

      //$(this) = $(this).attr('id');

      if ($(this).val().length == $(this).attr('data-correta').length) {
        $(this).addClass('full');
      } else {
        $(this).removeClass('full');
      }
    });

    ARR_TAREFAS[tarefaDigita].resolve(settings.cb);
  }

  return {
    objetivos: [],
    telaAtual: edi.util.getURL('quest'),
    setConfig: _setConfig,
    comparaTexto: _init,
    util: edi.util
  };

});