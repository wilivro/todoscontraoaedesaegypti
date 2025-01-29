document.write(unescape("%3Cscript src='../wilib/js/vendor/jquery-1.7.2.min.js' type='text/javascript'%3E%3C/script%3E")), document.write(unescape("%3Cscript src='../wilib/js/lib/main.js' type='text/javascript'%3E%3C/script%3E")), requirejs.config({
    shim: {
      "../wilib/js/lib/edi": {
        deps: [
        	"../vendor/jquery.spritely-0.6",
        	"../vendor/jquery.transit.min",
        	"../vendor/tweenjs-0.6.1.min",
        	"../vendor/easeljs-0.8.1.min",
        	"../vendor/movieclip-0.8.1.min",
        	"../vendor/jquery.slimscroll.min",
        	"../lib/canvas-load.js",
        	"../vendor/lodash.js",
        	"../lib/introducao.js",
          "../lib/preloader"
        ]
      },
      "../wilib/lib/apresentacao": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/indice": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/reflita": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/comparaTexto": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/alternativa_pn": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/alternativa_vf": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/alternativa": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_palavra": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/alternativa_prova": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/alternativa_img": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/alternativa_botao": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/cartas": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/slide_vertical": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_carrosel": {
        deps: ["./edi", "../vendor/jquery-rotate.js"]
      },
      "../wilib/js/lib/alternativa_balao": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/alternativa_botao_asterisco": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/alternativa_boliche": {
        deps: ["./alternativa_botao"]
      },
      "../wilib/js/lib/alternativa_carimbo": {
        deps: ["./edi"]
      },
      "../wilib/js/vendor/tweenjs-0.6.1.min": {
        deps: ["./easeljs-0.8.1.min"]
      },
      "../wilib/js/vendor/movieclip-0.8.1.min": {
        deps: ["./tweenjs-0.6.1.min"]
      },
      "../wilib/js/lib/ct_b08": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_r01b": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_d05": {
        deps: ["./edi", "../vendor/jquery-ui-1.10.4.custom"]
      },
      "../wilib/js/lib/revela_bolas": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_e10": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_roletinha": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_e11": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/arrasta_img": {
        deps: ["./arrasta"]
      },
      "../wilib/js/lib/revela_espiral": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_interrogacao": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/ligar": {
        deps: ["./edi", "../vendor/jquery.ui.touch-punch-liga.min"]
      },
      "../wilib/js/lib/revela_pergaminho": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/arrasta_mais_menos": {
        deps: ["./arrasta"]
      },
      "../wilib/js/lib/revela_bloco_nota": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_seta": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_slide": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/arrasta": {
        deps: ["./edi", "../vendor/jquery.ui.touch-punch.min"]
      },
      "../wilib/js/lib/arrasta_numero": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/quebra-cabeca": {
        deps: ["./edi", "../vendor/jigsawpuzzle-rhill"]
      },
      "../wilib/js/lib/arrasta-folha": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/arrastaBola": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela-btn": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_lampada": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/dicas": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/caneta": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/cacaPalavras": {
        deps: ["./edi"]
      },
      "../wilib/js/lib/revela_bloco_seta": {
        deps: ["./edi"]
      },
      "../wilib/js/vendor/jquery.ui.touch-punch-liga.min": {
        deps: ["../lib/jquery-ui-liga"]
      },
      "../wilib/js/vendor/jquery.ui.touch-punch.min": {
        deps: ["../lib/jquery-ui-modificado"]
      },
      "../wilib/js/lib/revista": {
        deps: ["./edi", "../vendor/turn"]
      },
      "../wilib/js/lib/revela_btn_numero": {
        deps: ["./edi"]
      },
      "../wilib/js/vendor/turn": {
        deps: ["./modernizr.2.5.3.min"]
      },
      "../wilib/js/vendor/preloadjs-0.3.1.min": {
        deps: ["./IndexOf", "./Event", "./EventDispatcher", "./Sound", "./WebAudioPlugin", "./HTMLAudioPlugin"]
      },
      "../wilib/canvas/objetos/curiosidade": {
        deps: ["../control/curiosidade"]
      },
      "../wilib/canvas/objetos/bolicheAcerto": {
        deps: ["../control/Boliche_acerto_Mini_Canvas"]
      },
      "../wilib/canvas/objetos/garota_bicicleta": {
        deps: ["../control/garota_bicicleta"]
      },
      "../wilib/canvas/objetos/animaLampada": {
        deps: ["../control/lampada"]
      },
      "../wilib/canvas/objetos/basqueteAcerto": {
        deps: ["../control/basqueteAcerto"]
      },
      "../wilib/canvas/objetos/basqueteErro": {
        deps: ["../control/basqueteErro"]
      },
      "../wilib/canvas/objetos/mascote": {
        deps: ["../control/mascote"]
      },
      "../wilib/canvas/objetos/mascoteTeste": {
        deps: ["../control/mascoteTeste"]
      },
      "../wilib/canvas/objetos/torneira_pingando": {
        deps: ["../control/torneira_pingando"]
      },
      "../wilib/canvas/objetos/homemEscritorio": {
        deps: ["../control/homemEscritorio"]
      },
      "../wilib/canvas/objetos/professora": {
        deps: ["../control/professora"]
      },
      "../wilib/canvas/objetos/showSetas": {
        deps: ["../control/showSetas"]
      },
      "../wilib/canvas/objetos/showSetasComTres": {
        deps: ["../control/showSetasComTres"]
      },
      "../wilib/canvas/objetos/animaCerto": {
        deps: ["../control/animaCerto"]
      },
      "../wilib/canvas/objetos/animaErrado": {
        deps: ["../control/animaErrado"]
      },
      "../wilib/canvas/objetos/prosseguir": {
        deps: ["../control/prosseguir"]
      },
      "../wilib/canvas/objetos/muitoBem": {
        deps: ["../control/muitoBem"]
      },
      "../wilib/canvas/objetos/voceErrou": {
        deps: ["../control/voceErrou"]
      },
      "../wilib/canvas/objetos/mascoteVarinha": {
        deps: ["../control/mascoteVarinha"]
      },
      "../wilib/canvas/objetos/mascoteIndice": {
        deps: ["../control/mascoteIndice"]
      },
      "../wilib/canvas/objetos/bolicheErro": {
        deps: ["../control/Boliche_erro_Mini_Canvas"]
      },
      "../wilib/canvas/objetos/animaMundo": {
        deps: ["../control/mundo"]
      },
      "../wilib/canvas/objetos/animacao_carro": {
        deps: ["../control/animacao_carro"]
      },
      "../wilib/canvas/objetos/anim_homem_e_mulher": {
        deps: ["../control/anim_homem_e_mulher"]
      },
      "../wilib/canvas/objetos/animaDicas": {
        deps: ["../control/dicas"]
      },
      "../wilib/canvas/objetos/animaReflita": {
        deps: ["../control/reflita"]
      }
    }
  }),
  function(i, s, o, g, r, a, m) {
    i.GoogleAnalyticsObject = r, i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date, a = s.createElement(o), m = s.getElementsByTagName(o)[0], a.async = 1, a.src = g, m.parentNode.insertBefore(a, m)
  }(window, document, "script", "//www.google-analytics.com/analytics.js", "ga"), ga("create", "UA-53173925-2", "auto"), ga("send", "pageview");