define(function (require) {
  "use strict";

  var tarefaarrasta_img = addTarefa();

  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  var arrastaMod = require('../lib/arrasta');

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(arr, cb, cbfinal, opt) {
    edi.iniciar(_configEDI); //montar o palco

    var _arr = []; //recebe os arrastas para embaralhar

    var config = {
      width: 100,
      height: 150,
      left: 10,
      top: 80,
      margin: 8,
      fontSize: 12,
      marginArrasta: '10px 14px',
      cb: null
    };

    if (opt) {
      $.extend(config, opt);
    }

    // container principal
    var $arrasta_img = $('<section>')
      .attr({
        'id': 'arrasta-img',
        'data-edi': 'arrasta-img'
      })
      .css({
        position: 'absolute',
        left: config.left,
        top: config.top
      })
      .appendTo('#conteudo');

    var $arrastas = $('<div>')
      .attr('id', 'arrastas')
      .css({
        width: 788,
        height: 80,
        position: 'absolute',
        textAlign: 'center',
        left: 0,
        bottom: 0,
        background: '#eee',
        borderTop: '1px solid #ddd'
      })
      .appendTo('#conteudo');

    arr.forEach(function (data, i) {
      var $alvo = $('<div>')
        .addClass('alvo')
        .css({
          background: '#fff',
          width: config.width,
          height: config.height,
          border: '1px solid rgba(0, 0, 0, 0.1)',
          display: 'inline-block',
          margin: config.margin,
          borderRadius: 5,
          padding: 5,
          position: 'relative'
        })
        .appendTo($arrasta_img);

      var $img = $('<img>')
        .attr('src', data.img)
        .css({
          width: config.width,
          height: config.width,
          position: 'absolute',
          left: 5,
          top: 5,
          borderRadius: 5
        })
        .appendTo($alvo);

      var $alvoInner = $('<div>')
        .addClass('alvo-inner')
        .attr('data-correta', i)
        .css({
          width: config.width,
          height: config.height - config.width - 5,
          position: 'absolute',
          bottom: 5,
          left: 5
        })
        .appendTo($alvo);

      // adicionando arrasta à outro array para embaralhar
      _arr.push({
        txt: data.txt,
        dataCorreta: i
      });

    });// fim arr.forEach()


    _arr.sort(function () {
      return 0.5 - Math.random();
    });

    _arr.forEach(function (data) {

      var $center = $('<div>')
        .css({
          display: 'inline-block',
          width: config.width,
          height: config.height - config.width - 5,
          margin: config.marginArrasta
        })
        .appendTo($arrastas);

      var $arrasta = $('<div>')
        .addClass('arrasta')
        .attr('data-correta', data.dataCorreta)
        .css({
          width: config.width,
          height: config.height - config.width - 5,
          display: 'table',
          fontSize: config.fontSize,
          textAlign: 'center',
        })
        .appendTo($center);

      $('<div>').css({
        width: '100%',
        display: 'table-cell',
        verticalAlign: 'middle'
      })
        .html(data.txt)
        .appendTo($arrasta);

      $arrasta.mouseenter(function () {
        $(this).css('background', '#ccc');
      });

      $arrasta.mouseleave(function () {
        $(this).css('background', 'transparent');
      });
    });

    ARR_TAREFAS[tarefaarrasta_img].resolve(config.cb);

    arrastaMod.arrasta('arrasta', 'alvo-inner', function (a, b, c) {
      $(b).off().css({
        margin: 0,
        backgrond: 'transparent'
      });

      $(c).html($(b).html()).css({
        'font-size': config.fontSize
      });

      if (cb) cb(a, b, c);
    }, function () {
      if (cbfinal) cbfinal();
    }, {
      alvoFixo: false
    });
  }// fim init();

  return {
    objetivos: [],
    setConfig: _setConfig,
    arrasta_img: _init
  };

});