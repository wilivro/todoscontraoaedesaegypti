define(function (require) {
  var tarefaRevela = addTarefa();

  var edi = require('./edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(btnRevela, callback, callbackFinal, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var peca = this;

    var config = {
      top: 70,
      left: 2,
      width: 300,
      height: 100,
      fontSize: 12
    };

    if (settings) {
      $.extend(config, settings);
    }

    var section = $('<section>')
      .attr('id', 'roletas')
      .css({
        position: 'absolute',
        top: config.top - 2,
        left: config.left - 4,
        padding: 2,
        width: (76+config.width)*2
      })
      .appendTo('#conteudo');

    for(var i=0; i < btnRevela.length; i++){

      peca.objetivos.push(0);
      edi.objetivos.push(0);

      var ctPai = $('<div>')
      .addClass('ctPai')
      .css({
        display: 'inline-block',
        width: config.width +72,
        height: config.height + 4,
        margin: '0 2px'
      })
      .appendTo(section);

      var divPai = $('<div>')
        .css({
          display: 'flex',
          margin: '0 10px 10px 0',
          position: 'relative'
        })
        .appendTo(ctPai);

      var ctTxt = $('<div>')
       
        .addClass('ctTxt')
        .css({
          width: config.width,
          position: 'absolute',
          left: 0,
          zIndex: 0,
          cursor: 'default',
          padding: '0 10px 0 60px',
          backgroundColor: '#fff',
          overflow: 'hidden',
          height: 0,
          borderRadius: 10,
          boxShadow: '1px 1px 2px rgba(0,0,0,0.5)'
        })      
        .appendTo(divPai);

      var txt = $('<div>')
        .css({
          display: 'table-cell',
          verticalAlign: 'middle',
          height: config.height,
          fontSize: config.fontSize
        })
        .html(btnRevela[i].texto)
        .appendTo(ctTxt);

      var ctImg = $('<div>')
        .addClass('ctImg')
        .css({
          position: 'relative',
          zIndex: 1,
          top: (config.height / 2) - 25,
          left: 5
        })
        .appendTo(divPai);

      $('<img>')
        .addClass('loadingR')
        .css({cursor: 'pointer'})
        .attr({
          src: '../wilib/img/svg/asterisco.svg'
        })
        .mouseover(function(){
          $(this)
          .removeClass('loadingR')
          .attr({src: '../wilib/img/svg/asterisco_amarelo.svg'})
        })
        .mouseleave(function(){
          $(this)
          .addClass('loadingR')
          .attr({src: '../wilib/img/svg/asterisco.svg'});
        })
        .click(function(){
          $(this).removeClass('loadingR').css({cursor: 'default'}).off();
          $($(this).parent().parent()[0].firstChild)
          .css({border: '1px solid #ccc'})
          .animate({height: config.height});
          verificar();    
        })
        .appendTo(ctImg);
    }

    var verificar = function() {
      peca.objetivos.pop();
      edi.objetivos.pop();
      edi.objetivos.unshift(1);
      if (!!callback) callback($(this));

      if (!!licao.config.WIQUADRO)
        Wiquadro.api.addInteration(1, revelado.attr('id'), _this.attr('id'), true);

      if (peca.objetivos.length === 0) {
        edi.finalizar();
        if (callbackFinal) callbackFinal(self);
      }
    }

    ARR_TAREFAS[tarefaRevela].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_roleta: _init
  };

});
