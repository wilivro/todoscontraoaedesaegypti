define(function(require) {
  var C_PASTA_IMAGENS = "../wilib/img/",
    C_PASTA_IMAGENS_svg = "../wilib/img/svg/",
    config = {
      enunciado: "horizontal",
      sexo: "M",
      qtdTelas: 1,
      tempoFinal: 10,
      tempoMultitela: 0,
      width: 788,
      height: 383,
      corEnunciado: "",
      topoEnunciado: "topo1",
      titulo: "",
      icone: "",
      espacamento: "18px",
      mascote: "",
      motionGuidePlugin: !0
    },
    _init = function(settings) {
      if (!EDI_EXISTS) {
        if (EDI_EXISTS = !0, settings && $.extend(config, settings), config.motionGuidePlugin && createjs.MotionGuidePlugin.install(), ENUNCIADO_LIGA = config.enunciado, config.icone) {
          var icone = config.icone.charAt(0).toUpperCase() + config.icone.slice(1);
          config.icone = $.fn["icone" + icone]
        }
        var config_titulo = {
          width: "horizontal" == config.enunciado ? "788px" : "150px",
          height: "vertical" == config.enunciado ? "381px" : "78px",
          iconeSom: {
            left: "vertical" == config.enunciado ? 36 : 690,
            top: "vertical" == config.enunciado ? 10 : 5
          },
          icone: {
            left: "vertical" == config.enunciado ? 43 : 710,
            top: 0
          },
          mascote: {
            left: "vertical" == config.enunciado ? 48 : 20,
            top: "vertical" == config.enunciado ? 320 : 3
          },
          imagem: "M" == config.sexo ? "1" : "2"
        };
        this.qtdTelas = config.qtdTelas, this.tempoFinal = config.tempoFinal, this.tempoMultitela = config.tempoMultitela;
        var conteudoBody = $("body").html();
        $("body").html("");
        var container = $("<section>").attr("id", "principal").width(config.width).height(config.height).css({
          position: "absolute",
          display: "block",
          overflow: "hidden",
          top: "50%",
          left: "50%",
          "margin-left": "-" + config.width / 2 + "px",
          "margin-top": "-" + config.height / 2 + "px",
          border: "1px solid #000"
        }).appendTo($("body"));
        if (config.enunciado) {
          var dv_titulo = $("<header>").width(config_titulo.width).height(config_titulo.height).css("background-color", config.corEnunciado).css("background", "transparent url(" + C_PASTA_IMAGENS_svg + ("horizontal" == config.enunciado ? "topo" + config_titulo.imagem : "topo_vertical" + config_titulo.imagem) + ".svg)").attr("id", "dv_titulo").appendTo(container),
            dv_titulo_texto = $("<div>").width(600).height($(dv_titulo).height()).css("position", "absolute").css("display", "table").css("top", 0).css("left", "50%").css("margin", 0).css("margin-left", "-300px").css("font-family", "trebuchet-ms").css("color", "#fff").css("text-align", "center").append($("<div>").css("display", "table-cell").css("position", "static").css("vertical-align", "middle").append($("<div>").css("position", "relative").css("top", "-50%").css("line-height", config.espacamento).attr("id", "texto-titulo").html(config.titulo))).appendTo(dv_titulo);
          if ("vertical" == config.enunciado && dv_titulo_texto.css("width", 149).css("left", 300).find("div:first").css("top", $("#dv_titulo").height() / 2 - $("#texto-titulo").height() / 2), config.mascote) {
            var pathMascote = "../../canvas/objetos/" + config.mascote;
            require([pathMascote], function(canvas) {
              var mascote = new canvas.mascote;
              mascote.obj.css(config_titulo.mascote).appendTo("#dv_titulo"), mascote.play()
            })
          }
          "alfabetizacao" == config.icone ? $("<div>").css("position", "absolute").css(config_titulo.iconeSom).css("width", "83px").css("height", "56px").css("z-index", "2000").attr("id", "header_icone").css("cursor", "pointer").css("background", "transparent url(" + C_PASTA_IMAGENS + "icone_som.png)").appendTo(dv_titulo).click(function() {
            $("#texto-titulo").css("color", "#FFF"), p.playSom("enunciado"), p.mascara($("#texto-titulo"), {
              tempo: p.tela.tempoLocucao
            })
          }) : config.icone && ($.fn.icone = config.icone, $("<div>").css({
            position: "absolute",
            width: 0,
            height: 0
          }).css(config_titulo.icone).attr("id", "header_icone").appendTo(dv_titulo).icone(!0))
        }
        $("<section>").attr("id", "conteudo").css({
          position: "horizontal" == config.enunciado ? "" : "absolute",
          height: "horizontal" == config.enunciado ? "315px" : "383px",
          width: "horizontal" == config.enunciado ? "788px" : "638px",
          top: "horizontal" == config.enunciado ? "68px" : "0",
          left: "vertical" == config.enunciado ? "150px" : "0"
        }).append(conteudoBody).appendTo("#principal")
      }
    },
    _errou = function(options) {
      var config = {
        cor: "#999999"
      };
      options && $.extend(config, options);
      var voceErrou = require("../../canvas/objetos/voceErrou");
      voceErrou.obj.css({
        top: 15,
        left: 40
      }).appendTo($("#final .container")), voceErrou.play()
    },
    _acertou = function(options) {
      var config = {
        posx: "50%",
        posy: "70px",
        cor: "#999999"
      };
      options && $.extend(config, options);
      var muitoBem = require("../../canvas/objetos/muitoBem");
      muitoBem.obj.css({
        top: 15,
        left: 30
      }).appendTo($("#final .container")), muitoBem.play()
    },
    _prosseguir = function(x, y, callBack, settings) {
      var config = {
        animacao: !0,
        cor: ""
      };
      settings && $.extend(config, settings);
      var btnProsseguir = $("<div>").attr("id", "dv_prosseguir_wrap").css("position", "absolute").css("top", y + "px").css("left", x + "px").css("width", "65px").css("height", "68px").css("cursor", "pointer").appendTo($("#final")).click(function() {
          callBack && callBack()
        }),
        prosseguir = "../../canvas/objetos/prosseguir";
      require([prosseguir], function(canvas) {
        var mascote = new canvas.mascote;
        mascote.obj.css({
          top: 0,
          left: 0
        }).appendTo(btnProsseguir), mascote.play()
      })
    },
    _tentenovamente = function(x, y, callBack, settings) {
      var config = {
        branco: !1,
        cor: ""
      };
      settings && $.extend(config, settings);
      var btnTenteNovamente = $("<div>").css("position", "absolute").attr("id", "dv_tentenovamente_wrap").css("top", y + "px").css("left", x + "px").css("width", "106px").css("height", "51px").css("cursor", "pointer").appendTo($("#final")),
        tenteNovamente = $("<div>").css("position", "absolute").css("top", "0").css("left", "50%").css("margin-left", "-33px").css("width", "59px").css("height", "40px").css("z-index", "2000").css("background", 'transparent url("' + C_PASTA_IMAGENS + 'sprites/tentenovamente-seta.png") 0 0 no-repeat').appendTo(btnTenteNovamente);
      tenteNovamente.sprite({
        fps: 30,
        no_of_frames: 19
      });
      var bt_tente = $("<div>").css("position", "absolute").css("top", "40px").css("left", "50%").css("margin-left", "-53px").css("width", "106px").css("height", "11px").css("z-index", "2000").attr("id", "tentenovamente").appendTo(btnTenteNovamente),
        cor = config.corFinalizar.toLowerCase();
      "#fff" != cor && "#ffffff" != cor && "white" != cor || bt_tente.css("background", 'transparent url("' + C_PASTA_IMAGENS + 'sprites/tentenovamentewhite.png") 0 0 no-repeat').css("background-position", "-2120px 0px"), "#000" != cor && "#000000" != cor && "black" != cor || bt_tente.css("background", 'transparent url("' + C_PASTA_IMAGENS + 'sprites/tentenovamenteblack.png") 0 0 no-repeat').css("background-position", "-2120px 0px"), "" === cor && config.branco === !1 && bt_tente.css("background", 'transparent url("' + C_PASTA_IMAGENS + 'sprites/tentenovamente.png") 0 0 no-repeat').css("background-position", "-2120px 0px"), $(btnTenteNovamente).mouseenter(function() {
        $("#tentenovamente").sprite({
          fps: 30,
          no_of_frames: 21,
          play_frames: 21,
          start_at_frame: 21
        }), $("#seta-tentenovamente").spStop()
      }).mouseleave(function() {
        $("#seta-tentenovamente").spStart().fps(30)
      }).click(callBack)
    },
    regressiva = function(tempo, mensagem, cb, settings) {
      _regressiva(tempo, mensagem, !1, !1, cb, settings).appendTo("#conteudo")
    },
    _regressiva = function(tempoRegressivo, mensagem, x, y, callBack, settings) {
      var config = {
        animacao: !0,
        cor: "#000",
        posx: 655,
        posy: 340
      };
      settings && $.extend(config, settings), x1 = x ? x : config.posx, y1 = y ? y : config.posy;
      var progress = $("<section>").attr("id", "progress").css("width", "125px").css("position", "absolute").css("top", y1 + "px").css("left", x1 + "px").css("z-index", "2000"),
        tempoExtenso = $("<span>").addClass("spTempo").css("font-family", "open-sans-regular").css("font-size", "7pt").css("text-align", "center").css("font-weight", "bold").css("width", "100%").css("width", "100%").css("display", "block").css("margin", "0 0 5px 0").appendTo(progress),
        barra = $("<div>").appendTo(progress),
        barraInterno = $("<span>").addClass("spProgress").css("height", "6px").css("background-color", "#c7e373").css("display", "block").css("border", "1px solid #d7d7d7").css("font-weight", "bold").css("vertical-align", "bottom").appendTo(barra);
      $("<span>").css("width", "100%").css("height", "4px").css("background-color", "#99cc00").css("display", "block").css("font-weight", "bold").css("margin-top", "2px").appendTo(barraInterno), $("<span>").addClass("spMensagem").css("font-family", "open-sans-regular").css("font-size", "7pt").css("text-align", "center").css("font-weight", "bold").css("color", config.cor).css("width", "105%").css("display", "block").css("margin", "3px 0 3px 0").append(mensagem).appendTo(progress);
      var tempoInicio = Date.now(),
        t = setInterval(function() {
          var tempoAgora = Date.now() - tempoInicio,
            percentComplete = 100 * tempoAgora / tempoRegressivo;
          percentComplete >= 100 && (clearInterval(t), progress.fadeOut(300, function() {
            $(this).remove(), callBack && callBack(x, y)
          })), $(tempoExtenso).html(Math.floor(tempoRegressivo / 1e3 - tempoAgora / 1e3 + 1) + " segundos").css("color", config.cor), $(barraInterno).css("width", percentComplete + "%")
        }, 50);
      return progress
    },
    _finalize = function(options, callBack, callBackFinal) {
      var _this = this,
        configFinalize = {
          mostrarResultado: !0,
          corFinalizar: "black",
          tempoMultitela: 0
        };
      options && $.extend(configFinalize, options);
      for (var totalObjetivos = 0, finalizado = 0, erros = 0, i = 0; i < this.objetivos.length; i++) totalObjetivos++, 0 !== this.objetivos[i] && (finalizado += 1), 2 == this.objetivos[i] && (erros += 1);
      if (console.log(), !(finalizado < this.objetivos.length || 0 != $("#final").length)) {
        callBackFinal && callBackFinal();
        var boxFinalizacao = $("<section>").css({
            position: "absolute",
            right: "-150px",
            top: "horizontal" == config.enunciado ? 66 : 39,
            height: "255px",
            margin: "30px 0 30px 0",
            width: "151px",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "15px 0 0 15px",
            border: "1px solid black",
            boxSshadow: "0 0 10px rgba(0,0,0, 0.5)",
            display: "table",
            zIndex: "3000"
          }).hide().attr("id", "final").append($("<div>").addClass("container").css({
            display: "table-cell",
            verticalAlign: "middle"
          })).appendTo("#principal"),
          btnHide = $("<div>").attr("id", "btnHide").addClass("btn-final").css("display", "table").appendTo(boxFinalizacao),
          btnHidePos = {
            a: {
              left: 11,
              top: 9
            },
            b: {
              left: 10,
              top: 12
            }
          };
        $.browser.webkit && (btnHidePos.a.left = 9, btnHidePos.a.top = 8, btnHidePos.b.left = 8, btnHidePos.b.top = 9.5), $("<i>").addClass("fa fa-arrow-right").css({
          width: 14,
          height: 14,
          textAlign: "center",
          position: "absolute",
          left: btnHidePos.a.left,
          top: btnHidePos.a.top,
          "transitionduration:": "5s"
        }).appendTo(btnHide), btnHide.click(function() {
          return $("#final").hasClass("hide") ? ($(".btn-final i").transition({
            rotate: "-=180"
          }, 500).css({
            left: btnHidePos.a.left,
            top: btnHidePos.a.top
          }), $("#final").removeClass("hide"), void $("#final").animate({
            right: -1
          }, 1e3)) : ($(".btn-final i").transition({
            rotate: "+=180"
          }, 500).css({
            left: btnHidePos.b.left,
            top: btnHidePos.b.top
          }), void $("#final").addClass("hide").animate({
            right: -135
          }, 1e3))
        });
        var seta = {
            top: configFinalize.mostrarResultado ? 185 : 130,
            left: 15
          },
          telaAtual = _GET("quest");
        if (erros) configFinalize.mostrarResultado && _errou(configFinalize), _tentenovamente(seta.left + 12, seta.top - 30, function() {
          for (var url = window.location, urlString = url.toString(), urlArray = urlString.split("?"), file = urlArray[0].split("/"), oldParams = "", hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), i = 0; i < hashes.length; i++) {
            var ini = hashes[i].split("=");
            "acertos" !== ini[0] && "quest" !== ini[0] && (oldParams += "&" + hashes[i])
          }
          window.location.href = file[file.length - 1] + "?acertos=" + _this.acertos + "&quest=" + telaAtual + oldParams
        }, configFinalize);
        else if (configFinalize.mostrarResultado && setTimeout(function() {
            _acertou(configFinalize)
          }, 600), telaAtual >= this.qtdTelas) callBack && callBack(), _regressiva(1e3 * this.tempoFinal, "para o próximo exercício.", seta.left, seta.top, function(x1, y1) {
          _prosseguir(x1 + 35, y1 - 20, function() {
            parent.bloqueio(!1), parent.seguir()
          }, configFinalize)
        }, configFinalize).appendTo("#final");
        else {
          telaAtual += 1;
          var url = window.location,
            urlString = url.toString(),
            urlArray = urlString.split("?"),
            file = urlArray[0].split("/");
          _regressiva(1e3 * configFinalize.tempoMultitela, "para a próxima questão.", seta.left, seta.top, function(x1, y1) {
            _prosseguir(x1 + 35, y1 - 20, function() {
              for (var oldParams = "", hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), i = 0; i < hashes.length; i++) {
                var ini = hashes[i].split("=");
                "acertos" !== ini[0] && "quest" !== ini[0] && (oldParams += "&" + hashes[i])
              }
              window.location.href = file[file.length - 1] + "?quest=" + telaAtual + oldParams
            }, configFinalize)
          }, configFinalize).appendTo("#final")
        }! function() {
          $("#final").show().animate({
            right: -1
          }, 1e3, function() {
            $("#final").addClass("ok")
          })
        }(), $("#conteudo").click(function() {
          !$("#final").hasClass("hide") && $("#final").hasClass("ok") && $("#btnHide").click()
        })
      }
    },
    _corAleatoria = function() {
      for (var aleatorio = function(inferior, superior) {
          var numPossibilidades = superior - inferior,
            aleat = Math.random() * numPossibilidades;
          return aleat = Math.floor(aleat), parseInt(inferior) + aleat
        }, hexadecimal = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"), cor_aleatoria = "#", i = 0; 6 > i; i++) {
        var posarray = aleatorio(0, hexadecimal.length);
        cor_aleatoria += hexadecimal[posarray]
      }
      return cor_aleatoria
    },
    _altura = function(o) {
      return parseInt($(o).height())
    },
    _largura = function(o) {
      return parseInt($(o).width())
    },
    _pontoX = function(o) {
      return parseInt($(o).css("left").replace("px", ""))
    },
    _pontoY = function(o) {
      return parseInt($(o).css("top").replace("px", ""))
    },
    _pontoCentro = function(o) {
      return {
        x: _pontoX(o) + _altura(o) / 2,
        y: _pontoY(o) + _largura(o) / 2
      }
    },
    _GET = function(name) {
      void 0 === name && (name = "quest");
      var out, url = window.location.search.replace("?", ""),
        itens = url.split("&");
      for (var n in itens)
        if (itens.hasOwnProperty(n) && itens[n].match(name)) return out = decodeURIComponent(itens[n].replace(name + "=", "")), 0 === out ? "acertos" == name ? "" : 1 : "quest" == name ? parseInt(out) : out;
      return "acertos" == name ? null : 1
    },
    _embaralhar = function(arr) {
      for (var valorTemporaio, indexAleatorio, indexAtual = arr.length; 0 !== indexAtual;) indexAleatorio = Math.floor(Math.random() * indexAtual), indexAtual -= 1, valorTemporaio = arr[indexAtual], arr[indexAtual] = arr[indexAleatorio], arr[indexAleatorio] = valorTemporaio;
      return arr
    },
    _addZero = function(num, qtd) {
      for (var temp = num.toString(), i = 0; i < qtd - num.toString().length; i++) temp = "0" + temp;
      return temp
    },
    _popUp = function(texto, settings) {
      var config = {
        topBtn: -2
      };
      settings && $.extend(config, settings);
      var sc_quadro = $("<section>").css({
          position: "absolute",
          width: 788,
          height: 383,
          top: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 4999
        }).hide().appendTo("#principal"),
        dv_ficaTexto = $("<div>").addClass("arredondado").css({
          position: "relative",
          top: "50%",
          left: "50%",
          background: "#FFF",
          width: 400,
          height: 200,
          textAlign: "center",
          margin: "-100px 0 0 -250px",
          paddingLeft: "100px",
          border: "2px solid #333"
        }).hide().transition({
          scale: 0
        }, 0).appendTo(sc_quadro);
      $("<div>").css({
        position: "relative",
        verticalAlign: "middle",
        display: "table-cell",
        textAlign: "center",
        width: 300,
        height: 200
      }).html(texto).appendTo(dv_ficaTexto), $("<div>").addClass("redondo").css({
        position: "absolute",
        width: 29,
        height: 29,
        top: -11,
        left: 479,
        background: "#FFF",
        color: "#F00",
        cursor: "pointer",
        fontSize: "35px"
      }).html('<i class="fa fa-times-circle" style="position: relative; top: ' + config.topBtn + 'px;"></i>').click(function(evt) {
        sc_quadro.fadeOut(), dv_ficaTexto.fadeIn().transition({
          scale: 0
        }, 500, function() {
          sc_quadro.remove()
        })
      }).appendTo(dv_ficaTexto);
      sc_quadro.fadeIn(), dv_ficaTexto.fadeIn().transition({
        scale: 1
      }, 500)
    };
  return {
    objetivos: [],
    acertos: [],
    qtdTelas: null,
    tempoFinal: null,
    iniciar: _init,
    finalizar: _finalize,
    regressiva: regressiva,
    util: {
      getURL: _GET,
      telaAtual: _GET("quest") - 1,
      addZero: _addZero,
      removeLoading: onAllDeferredsComplete,
      corAleatoria: _corAleatoria,
      altura: _altura,
      largura: _largura,
      pontoX: _pontoX,
      pontoY: _pontoY,
      pontoCentro: _pontoCentro,
      embaralhar: _embaralhar,
      popUp: _popUp,
      Preloader: Preloader
    },
    interacao: {
      revela: 1,
      arrasta: 2,
      pergunta: 3,
      liga: 4,
      alternativa: 6,
      keyPress: 7
    }
  }
});