define(function (require) {
  var tarefaRevista = addTarefa();

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _addPage(_text, _css, _objArr) {
    var size = Object.keys(this.paginas).length;
    if (!_objArr) _objArr = [];

    var _style = {
      boxShadow: '',
      ctPadding: 0,
      verso: {}
    };

    if (_css) $.extend(_style, _css);

    this.paginas[size + 1] = {
      texto: _text,
      objects: _objArr,
      style: _style
    };
  }

  function _init(settings, callBack, callBackFinal) {
    edi.iniciar(_configEDI);//montar o palco

    var config = {
      elevation: 50,
      gradients: true,
      autoCenter: false,
      frenteVerso: true,
      width: 312,
      height: 390,
      left: 100,
      top: 0
    };

    if (settings) $.extend(config, settings);
    config.width *= 2;
    var $dv_revista = $("<div>")
      .attr('id', 'revista_' + $(".revista").length)
      .addClass("revista")
      .css({
        left: config.left,
        top: config.top
      })
      .appendTo("#conteudo");

    for (var i in (paginas = this.paginas)) {
      var page = paginas[i];
      var $dv_pag = $("<div>")
        .attr('id', 'pagina_' + i)
        .addClass(page.style.capaDura ? 'pagina hard' : 'pagina')
        .css(page.style);
      var $pg_container = $("<div>")
        .html(page.texto)
        .css({
          padding: page.style.ctPadding
        })
        .appendTo($dv_pag);

      for (var j in (obj = page.objects)) {
        log(obj[j]);
        $pg_container.append(obj[j]);
      }

      $dv_pag.appendTo($dv_revista);

      if (!config.frenteVerso) {
        $("<div>")
          .attr('id', 'pagina_verso_branco' + i)
          .addClass(page.style.capaDura ? 'pagina hard' : 'pagina')
          .css(page.style.verso)
          .appendTo($dv_revista);
      }
    }

    var finalizar = function () {
      edi.finalizar({mostrarResultado: false});
    };
    //finalizar criado pois quando tem paginas impares não finalizava

    $dv_revista
      .turn(config)
      .bind("turned", function (event, page, view) {
        if (callBack) callBack(event, page, view);
      })
      .bind("last", function (event) {
        if (!callBackFinal) {
          if (!$("#final").length)
            edi.finalizar({mostrarResultado: false});
          return;
        }
        finalizar();
        finalizar = function () {
        };
        callBackFinal();
      });

    ARR_TAREFAS[tarefaRevista].resolve();
  }

  return {
    objetivos: [],
    paginas: {},
    setConfig: _setConfig,
    addPagina: _addPage,
    revista: _init
  };
});