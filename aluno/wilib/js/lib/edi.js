define(function (require) {

  var C_PASTA_IMAGENS = '../wilib/img/';
  var C_PASTA_IMAGENS_svg = '../wilib/img/svg/';

  var config = {
    //para desativar  enunciado setar false
    enunciado: 'horizontal',
    sexo: 'M',
    qtdTelas: 1,
    tempoFinal: 10,
    tempoMultitela: 0,
    width: 788,
    height: 383,
    corEnunciado: '',
    topoEnunciado: 'topo1',
    titulo: '',
    icone: '',
    espacamento: '18px',
    mascote: '',
    motionGuidePlugin: true // utilizado nas animações de movimento dos canvas.
  };

  var _init = function (settings) {

    if (EDI_EXISTS)
      return;

    EDI_EXISTS = true;

    if (settings)
      $.extend(config, settings);

    if (config.motionGuidePlugin) createjs.MotionGuidePlugin.install();
    ENUNCIADO_LIGA = config.enunciado;

    if (!!config.icone) {
      var icone = config.icone.charAt(0).toUpperCase() + config.icone.slice(1);
      config.icone = $.fn['icone' + icone];
    }

    var config_titulo = {
      width: config.enunciado == 'horizontal' ? '788px' : '150px',
      height: config.enunciado == 'vertical' ? '381px' : '78px',
      iconeSom: {
        left: config.enunciado == 'vertical' ? 36 : 690,
        top: config.enunciado == 'vertical' ? 10 : 5
      },
      icone: {
        left: config.enunciado == 'vertical' ? 43 : 710,
        top: 0
      },
      mascote: {
        left: config.enunciado == 'vertical' ? 48 : 20,
        top: config.enunciado == 'vertical' ? 320 : 3
      },
      imagem: config.sexo == 'M' ? '1' : '2'

    };

    this.qtdTelas = config.qtdTelas;
    this.tempoFinal = config.tempoFinal;
    this.tempoMultitela = config.tempoMultitela;

    var conteudoBody = $('body').html();

    $('body').html('');

    var container = $('<section>')
      .attr('id', 'principal')
      .width(config.width)
      .height(config.height)
      .css({
        'position': 'absolute',
        'display': 'block',
        'overflow': 'hidden',
        'top': '50%',
        'left': '50%',
        'margin-left': '-' + (config.width / 2) + 'px',
        'margin-top': '-' + (config.height / 2) + 'px',
        'border': '1px solid #000'
      })
      .appendTo($('body'));

    if (!!config.enunciado) {
      var dv_titulo = $('<header>')
        .width(config_titulo.width)
        .height(config_titulo.height)
        .css('background-color', config.corEnunciado)
        .css('background', 'transparent url(' + C_PASTA_IMAGENS_svg + (config.enunciado == 'horizontal' ? 'topo' + config_titulo.imagem : 'topo_vertical' + config_titulo.imagem) + '.svg)')
        .attr('id', 'dv_titulo')
        .appendTo(container);

      var dv_titulo_texto = $('<div>')
        .width(600)
        .height($(dv_titulo).height())
        .css('position', 'absolute')
        .css('display', 'table')
        .css('top', 0)
        .css('left', '50%')
        .css('margin', 0)
        .css('margin-left', '-' + (600 / 2) + 'px')
        .css('font-family', 'trebuchet-ms')
        .css('color', '#fff')
        .css('text-align', 'center')
        .append(
          $('<div>')
          .css('display', 'table-cell')
          .css('position', 'static')
          .css('vertical-align', 'middle')
          .append(
            $('<div>')
            .css('position', 'relative')
            .css('top', '-50%')
            .css('line-height', config.espacamento)
            .attr('id', 'texto-titulo')
            .html(config.titulo)
          )
        )
        .appendTo(dv_titulo);

      if (config.enunciado == 'vertical') {
        dv_titulo_texto
          .css("width", 149)
          .css("left", 300)
          .find("div:first")
          .css("top", $("#dv_titulo").height() / 2 - $("#texto-titulo").height() / 2);
      }

      if (!!config.mascote) {
        var pathMascote = "../../canvas/objetos/" + config.mascote;

        require([pathMascote], function (canvas) {
          var mascote = new canvas.mascote();
          mascote.obj.css(config_titulo.mascote).appendTo('#dv_titulo');
          mascote.play();
        });
      }

      if (config.icone == 'alfabetizacao') {
        $('<div>')
          .css('position', 'absolute')
          .css(config_titulo.iconeSom)
          .css('width', '83px')
          .css('height', '56px')
          .css('z-index', '2000')
          .attr('id', 'header_icone')
          .css('cursor', 'pointer')
          .css('background', 'transparent url(' + C_PASTA_IMAGENS + 'icone_som.png)')
          .appendTo(dv_titulo)
          .click(function () {
            //Aqui faz o efeito de pintar as letras de acordo com o tempo dado.
            $('#texto-titulo').css('color', '#FFF');
            p.playSom('enunciado');
            p.mascara($('#texto-titulo'), {
              tempo: p.tela.tempoLocucao //Aqui o tempo dado.
            });
          });

      } else {

        if (!!config.icone) {

          $.fn.icone = config.icone;

          $('<div>')
            .css({
              position: 'absolute',
              width: 0,
              height: 0
            })
            .css(config_titulo.icone)
            .attr('id', 'header_icone')
            .appendTo(dv_titulo)
            .icone(true);
        }
      }

    }
    var conteudo = $('<section>')
      .attr('id', 'conteudo')
      .css({
        position: (config.enunciado) == 'horizontal' ? '' : 'absolute',
        height: (config.enunciado) == 'horizontal' ? '315px' : '383px',
        width: (config.enunciado) == 'horizontal' ? '788px' : '638px',
        top: (config.enunciado) == 'horizontal' ? '68px' : '0',
        left: (config.enunciado) == 'vertical' ? '150px' : '0'
      })
      .append(conteudoBody)
      .appendTo('#principal');

  };

  var _errou = function (options) {

    var config = {
      cor: '#999999'
    };

    if (options)
      $.extend(config, options);

    var voceErrou = require('../../canvas/objetos/voceErrou');
    voceErrou.obj.css({
      top: 15,
      left: 40
    }).appendTo($('#final .container'));
    voceErrou.play();
  };

  var _acertou = function (options) {

    var config = {
      posx: '50%',
      posy: '70px',
      cor: '#999999'
    };

    if (options) $.extend(config, options);

    var muitoBem = require('../../canvas/objetos/muitoBem');
    muitoBem.obj.css({
      top: 15,
      left: 30
    }).appendTo($('#final .container'));
    muitoBem.play();
  };

  var _prosseguir = function (x, y, callBack, settings) {
    var config = {
      animacao: true,
      cor: ''
    };

    if (settings) {
      $.extend(config, settings);
    }

    var btnProsseguir = $('<div>')
      .attr('id', 'dv_prosseguir_wrap')
      .css('position', 'absolute')
      .css('top', y + 'px')
      .css('left', x + 'px')
      .css('width', '65px')
      .css('height', '68px')
      .css('cursor', 'pointer')
      .appendTo($('#final')).click(function () {
        if (!!callBack)
          callBack();
      });

    var prosseguir = "../../canvas/objetos/prosseguir";

    require([prosseguir], function (canvas) {
      var mascote = new canvas.mascote();
      mascote.obj.css({
        top: 0,
        left: 0
      }).appendTo(btnProsseguir);
      mascote.play();
    });

  };

  var _tentenovamente = function (x, y, callBack, settings) {
    var config = {
      branco: false,
      cor: ''
    };

    if (settings) {
      $.extend(config, settings);
    }

    var btnTenteNovamente = $('<div>')
      .css('position', 'absolute')
      .attr('id', 'dv_tentenovamente_wrap')
      .css('top', y + 'px')
      .css('left', x + 'px')
      .css('width', '106px')
      .css('height', '51px')
      .css('cursor', 'pointer')
      .appendTo($('#final'));

    var tenteNovamente = $('<div>')
      .css('position', 'absolute')
      .css('top', '0')
      .css('left', '50%')
      .css('margin-left', '-33px')
      .css('width', '59px')
      .css('height', '40px')
      .css('z-index', '2000')
      //.attr('id', wl.util.S4)
      .css('background', 'transparent url("' + C_PASTA_IMAGENS + 'sprites/tentenovamente-seta.png") 0 0 no-repeat')
      .appendTo(btnTenteNovamente);

    tenteNovamente.sprite({
      fps: 30,
      no_of_frames: 19
    });

    var bt_tente = $('<div>')
      .css('position', 'absolute')
      .css('top', '40px')
      .css('left', '50%')
      .css('margin-left', '-53px')
      .css('width', '106px')
      .css('height', '11px')
      .css('z-index', '2000')
      .attr('id', 'tentenovamente')
      .appendTo(btnTenteNovamente);

    var cor = config.corFinalizar.toLowerCase();

    if (cor == '#fff' || cor == '#ffffff' || cor == 'white')
      bt_tente
      .css('background', 'transparent url("' + C_PASTA_IMAGENS + 'sprites/tentenovamentewhite.png") 0 0 no-repeat')
      .css('background-position', '-2120px 0px');

    if (cor == '#000' || cor == '#000000' || cor == 'black')
      bt_tente
      .css('background', 'transparent url("' + C_PASTA_IMAGENS + 'sprites/tentenovamenteblack.png") 0 0 no-repeat')
      .css('background-position', '-2120px 0px');

    // Condição feita com o config.branco == false, pois alguma peças eram defenidas para branco somente com esse parâmetro
    // true e a cor vazia. Se deixar somente com a condição cor, as peças que tiverem o config.branco == true não ficarão branco pois
    // a cor estará vazia cor == '' aí essa condiçao sobrescreveria a condição do branco.
    if (cor === '' && config.branco === false)
      bt_tente
      .css('background', 'transparent url("' + C_PASTA_IMAGENS + 'sprites/tentenovamente.png") 0 0 no-repeat')
      .css('background-position', '-2120px 0px');


    $(btnTenteNovamente).mouseenter(function () {

      $('#tentenovamente').sprite({
        fps: 30,
        no_of_frames: 21,
        play_frames: 21,
        start_at_frame: 21
      });
      $('#seta-tentenovamente').spStop();

    }).mouseleave(function () {

      $('#seta-tentenovamente').spStart().fps(30);
    }).click(callBack);

  };

  var regressiva = function (tempo, mensagem, cb, settings) {
    _regressiva(tempo, mensagem, false, false, cb, settings).appendTo("#conteudo");
  };

  var _regressiva = function (tempoRegressivo, mensagem, x, y, callBack, settings) {

    var config = {
      animacao: true,
      cor: '#000',
      posx: 655,
      posy: 340,
      bloqueio: false
    };

    if (settings) {
      $.extend(config, settings);
    }

    if (config.bloqueio) {
      var $bloqueio = $('<div>')
        .attr({
          id: '#bloqueio'
        })
        .css({
          position: 'absolute',
          top: 0,
          left: 0,
          width: 788,
          height: 383,
          zIndex: 999
        })
        .appendTo('#principal');
    }

    x1 = x ? x : config.posx;
    y1 = y ? y : config.posy;

    var progress = $('<section>')
      .attr('id', 'progress')
      .css('width', '125px')
      .css('position', 'absolute')
      .css('top', y1 + 'px')
      .css('left', x1 + 'px')
      .css('z-index', '2000');
    //.appendTo($('#final'));

    var tempoExtenso = $('<span>')
      .addClass('spTempo')
      .css('font-family', 'open-sans-regular')
      .css('font-size', '7pt')
      .css('text-align', 'center')
      .css('font-weight', 'bold')
      .css('width', '100%')
      .css('width', '100%')
      .css('display', 'block')
      .css('margin', '0 0 5px 0')
      .appendTo(progress);

    var barra = $('<div>')
      .appendTo(progress);

    var barraInterno = $('<span>')
      .addClass('spProgress')
      .css('height', '6px')
      .css('background-color', '#c7e373')
      .css('display', 'block')
      .css('border', '1px solid #d7d7d7')
      .css('font-weight', 'bold')
      .css('vertical-align', 'bottom')
      .appendTo(barra);

    $('<span>')
      .css('width', '100%')
      .css('height', '4px')
      .css('background-color', '#99cc00')
      .css('display', 'block')
      .css('font-weight', 'bold')
      .css('margin-top', '2px')
      .appendTo(barraInterno);

    $('<span>')
      .addClass('spMensagem')
      .css('font-family', 'open-sans-regular')
      .css('font-size', '7pt')
      .css('text-align', 'center')
      .css('font-weight', 'bold')
      .css('color', config.cor)
      .css('width', '105%')
      .css('display', 'block')
      .css('margin', '3px 0 3px 0')
      .append(mensagem)
      .appendTo(progress);

    var tempoInicio = Date.now();

    var t = setInterval(function () {

      var tempoAgora = Date.now() - tempoInicio;
      var percentComplete = tempoAgora * 100 / tempoRegressivo;

      if (percentComplete >= 100) {
        //percentComplete = 0;
        clearInterval(t); //Stop updating
        progress.fadeOut(300, function () {
          if (config.bloqueio)
            $bloqueio.remove();

          $(this).remove();
          if (callBack) {
            callBack(x, y);
          }

        });
      }

      $(tempoExtenso).html(Math.floor((tempoRegressivo / 1000) - (tempoAgora / 1000) + 1) + ' segundos').css('color', config.cor);

      $(barraInterno).css('width', percentComplete + '%');

    }, 50);

    return progress;
  };
  var _passar = function () {
    this.tempoFim = Date.now();
    p.finalizar(true);
    PLATAFORMA.seguir();
    if (!licao.config.WIQUADRO) {
      if (PLATAFORMA && PLATAFORMA.bloqueio) {
        //p.finalizar(true);                PLATAFORMA.seguir();

        PLATAFORMA.bloqueio(false);
      }
    } else {
      Wiquadro.api.setEdcmidiaAsFinished();
    }
  };

  var _finalize = function (options, callBack, callBackFinal) {

    var _this = this;
    var configFinalize = {
      mostrarResultado: true,
      corFinalizar: 'black',
      tempoMultitela: 0
    };

    if (options) {
      $.extend(configFinalize, options);
    }

    var totalObjetivos = 0;
    var finalizado = 0;
    var erros = 0;

    for (var i = 0; i < this.objetivos.length; i++) {

      totalObjetivos++;
      if (this.objetivos[i] !== 0) {
        finalizado += 1;
      }
      if (this.objetivos[i] == 2) {
        erros += 1;
      }
    }

    console.log();

    if (finalizado < this.objetivos.length || $('#final').length != 0) {
      return;
    } else {
      if (callBackFinal) callBackFinal();
    }

    var boxFinalizacao = $('<section>')
      .css({
        position: 'absolute',
        right: '-150px',
        top: (config.enunciado == 'horizontal') ? 66 : 39,
        height: '255px',
        margin: '30px 0 30px 0',
        width: '151px',
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: '15px 0 0 15px',
        border: '1px solid black',
        boxSshadow: '0 0 10px rgba(0,0,0, 0.5)',
        display: 'table',
        zIndex: "3000"
      })
      .hide()
      .attr('id', 'final')
      .append(
        $("<div>")
        .addClass("container")
        .css({
          display: 'table-cell',
          verticalAlign: 'middle'
        })
      )
      .appendTo('#principal');

    var btnHide = $('<div>')
      .attr('id', 'btnHide')
      .addClass('btn-final')
      .css('display', 'table')
      .appendTo(boxFinalizacao);

    // corrigindo problema de posição do btn
    var btnHidePos = {
      a: { // posição antes de rotacionar
        left: 11,
        top: 9
      },
      b: { // posição depois de rotacionar
        left: 10,
        top: 12
      }
    };

    // para webkit
    if ($.browser.webkit) {
      btnHidePos.a.left = 9;
      btnHidePos.a.top = 8;
      btnHidePos.b.left = 8;
      btnHidePos.b.top = 9.5;
    }

    $('<i>')
      .addClass('fa fa-arrow-right')
      .css({
        width: 14,
        height: 14,
        textAlign: 'center',
        position: 'absolute',
        left: btnHidePos.a.left,
        top: btnHidePos.a.top,
        'transitionduration:': '5s'

      }).appendTo(btnHide);

    btnHide.click(function () {
      if ($('#final').hasClass('hide')) {
        $('.btn-final i').transition({
            rotate: '-=180'
          }, 500)
          .css({
            left: btnHidePos.a.left,
            top: btnHidePos.a.top
          });

        $('#final').removeClass('hide');
        $('#final')
          .animate({
            right: -1
          }, 1000);
        return;
      } else {

        $('.btn-final i').transition({
            rotate: '+=180'
          }, 500)
          .css({
            left: btnHidePos.b.left,
            top: btnHidePos.b.top
          });

        $('#final')
          .addClass('hide')
          .animate({
            right: -135
          }, 1000);
      }
    });

    var seta = {
      top: configFinalize.mostrarResultado ? 185 : 130,
      left: 15
    };

    var telaAtual = _GET('quest');

    if (!erros) //Sem erros -> prosseguir;
    {
      if (configFinalize.mostrarResultado)
        setTimeout(function () {
          _acertou(configFinalize);
        }, 600);

      if (telaAtual >= this.qtdTelas) {
        if (!!callBack) callBack();
        _regressiva(this.tempoFinal * 1000, 'para o próximo exercício.', seta.left, seta.top, function (x1, y1) {
          _prosseguir(x1 + 35, y1 - 20, function () {
            parent.bloqueio(false);
            parent.seguir();
          }, configFinalize);
        }, configFinalize).appendTo("#final");
      } else {
        telaAtual += 1;
        var url = window.location;
        var urlString = url.toString();
        var urlArray = urlString.split("?");
        var file = urlArray[0].split("/");
        _regressiva(configFinalize.tempoMultitela * 1000, 'para a próxima questão.', seta.left, seta.top, function (x1, y1) {
          _prosseguir(x1 + 35, y1 - 20, function () {
            var oldParams = "";
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
              var ini = hashes[i].split("=");
              if (ini[0] === "acertos" || ini[0] === "quest") continue;
              oldParams += '&' + hashes[i];
            }
            window.location.href = file[file.length - 1] + "?quest=" + telaAtual + oldParams;
          }, configFinalize);
        }, configFinalize).appendTo("#final");
      }
    } else // errou -> tentenovamente
    {

      if (configFinalize.mostrarResultado)
        _errou(configFinalize);
      _tentenovamente(seta.left + 12, seta.top - 30, function () {

        var url = window.location;
        var urlString = url.toString();
        var urlArray = urlString.split("?");
        var file = urlArray[0].split("/");

        var oldParams = "";

        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        for (var i = 0; i < hashes.length; i++) {
          var ini = hashes[i].split("=");
          if (ini[0] === "acertos" || ini[0] === "quest") continue;
          oldParams += '&' + hashes[i];
        }

        window.location.href = file[file.length - 1] + "?acertos=" + _this.acertos + "&alvos=" + _this.alvos + "&quest=" + telaAtual + oldParams;


      }, configFinalize);
    }

    //        $('.btn').off();

    (function showBoxHide() {
      $('#final')
        .show()
        .animate({
          right: -1
        }, 1000, function () {
          $('#final').addClass('ok');
        });
    })();

    $('#conteudo').click(function () {
      if (!$('#final').hasClass('hide') && $('#final').hasClass('ok'))
        $('#btnHide').click();
    });

  };

  var _corAleatoria = function () {

    var aleatorio = function (inferior, superior) {
      var numPossibilidades = superior - inferior;
      var aleat = Math.random() * numPossibilidades;
      aleat = Math.floor(aleat);
      return parseInt(inferior) + aleat;
    };

    var hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
    var cor_aleatoria = "#";
    for (var i = 0; i < 6; i++) {
      var posarray = aleatorio(0, hexadecimal.length);
      cor_aleatoria += hexadecimal[posarray];
    }
    return cor_aleatoria;
  };

  //Começo do DoCore
  var _altura = function (o) {

    return parseInt($(o).height());
  };

  var _largura = function (o) {
    return parseInt($(o).width());
  };

  var _pontoX = function (o) {
    return parseInt($(o).css('left').replace('px', ''));
  };

  var _pontoY = function (o) {
    return parseInt($(o).css('top').replace('px', ''));
  };

  var _pontoCentro = function (o) {
    return {
      x: _pontoX(o) + (_altura(o) / 2),
      y: _pontoY(o) + (_largura(o) / 2)
    };
  };
  //fim do DoCore

  var _GET = function (name) //retorna a quetão atual;
  {
    if (name === undefined) {
      name = "quest";
    }
    var url = window.location.search.replace("?", "");
    var itens = url.split("&");
    var out;
    for (var n in itens) {
      if (itens.hasOwnProperty(n)) {
        if (itens[n].split('=')[0] == name) {
          out = decodeURIComponent(itens[n].split('=')[1]);
          if (out === 0) {
            if (name == "acertos")
              return "";
            else if (name == "alvos")
              return "";
            else
              return 1;
          } else {
            if (name == "quest") {
              return parseInt(out);
            }
            return out;
          }
        }
      }
    }

    if (name == "acertos")
      return null;
    else if (name == "alvos")
      return "";
    else
      return 1;
  };

  // embaralha e retorna o array passado via param
  var _embaralhar = function (arr) {
    var indexAtual = arr.length,
      valorTemporaio, indexAleatorio;

    while (0 !== indexAtual) {
      indexAleatorio = Math.floor(Math.random() * indexAtual);
      indexAtual -= 1;

      valorTemporaio = arr[indexAtual];
      arr[indexAtual] = arr[indexAleatorio];
      arr[indexAleatorio] = valorTemporaio;
    }

    return arr;
  };

  var _addZero = function (num, qtd) {
    var temp = num.toString();
    for (var i = 0; i < qtd - num.toString().length; i++) {
      temp = "0" + temp;
    }
    return temp;
  };

  var _popUp = function (texto, settings) {

    var config = {
      topBtn: -2
    };

    if (settings)
      $.extend(config, settings);

    var sc_quadro = $('<section>')
      .css({
        position: 'absolute',
        width: 788,
        height: 383,
        top: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 4999
      })
      .hide()
      .appendTo('#principal');

    var dv_ficaTexto = $('<div>')
      .addClass('arredondado')
      .css({
        position: 'relative',
        top: '50%',
        left: '50%',
        background: '#FFF',
        width: 400,
        height: 200,
        textAlign: 'center',
        margin: '-100px 0 0 -250px',
        paddingLeft: '100px',
        border: '2px solid #333'
      })
      .hide()
      .transition({
        scale: 0
      }, 0)
      .appendTo(sc_quadro);

    var dv_texto = $('<div>')
      .css({
        position: 'relative',
        verticalAlign: 'middle',
        display: 'table-cell',
        textAlign: 'center',
        width: 300,
        height: 200
      })
      .html(texto)
      .appendTo(dv_ficaTexto);

    var dv_btn = $('<div>')
      .addClass('redondo')
      .css({
        position: 'absolute',
        width: 29,
        height: 29,
        top: -11,
        left: 479,
        background: '#FFF',
        color: '#F00',
        cursor: 'pointer',
        fontSize: '35px'
      })
      .html('<i class="fa fa-times-circle" style="position: relative; top: ' + config.topBtn + 'px;"></i>')
      .click(function (evt) {
        sc_quadro.fadeOut();
        dv_ficaTexto.fadeIn().transition({
          scale: 0
        }, 500, function () {
          sc_quadro.remove();
        });
      })
      .appendTo(dv_ficaTexto);

    sc_quadro.fadeIn();
    dv_ficaTexto.fadeIn().transition({
      scale: 1
    }, 500);

  };

  return {
    //public properties
    objetivos: [],
    acertos: [],
    alvos: [],
    qtdTelas: null,
    tempoFinal: null,
    //public methods
    iniciar: _init,
    finalizar: _finalize,
    regressiva: regressiva,
    util: {
      getURL: _GET,
      telaAtual: _GET('quest') - 1,
      addZero: _addZero,
      removeLoading: onAllDeferredsComplete,
      corAleatoria: _corAleatoria,
      altura: _altura,
      largura: _largura,
      pontoX: _pontoX,
      pontoY: _pontoY,
      pontoCentro: _pontoCentro,
      embaralhar: _embaralhar,
      popUp: _popUp
    },
    interacao: {
      revela: 1,
      arrasta: 2,
      pergunta: 3,
      liga: 4,
      //          naoUtilizado: 5, <-- NAO TEM ENTRADA NO BANCO DE DADOS
      alternativa: 6,
      keyPress: 7
      //          naoUtilizado: 8, <-- NAO TEM ENTRADA NO BANCO DE DADOS
    }
  };

});