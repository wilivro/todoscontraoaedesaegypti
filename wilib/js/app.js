document.write(unescape("%3Cscript src='../wilib/js/vendor/jquery-1.7.2.min.js' type='text/javascript'%3E%3C/script%3E"));
document.write(unescape("%3Cscript src='../wilib/js/lib/main.js' type='text/javascript'%3E%3C/script%3E"));

requirejs.config({
  shim: {
    '../wilib/js/lib/edi': {
      deps: [
        '../vendor/jquery.spritely-0.6',
        '../vendor/jquery.transit.min',
        '../vendor/tweenjs-0.6.1.min',
        '../vendor/easeljs-0.8.1.min',
        '../vendor/movieclip-0.8.1.min',
        '../vendor/jquery.slimscroll.min',
        '../lib/canvas-load',
        '../vendor/lodash',
        '../lib/preloader',
        '../lib/introducao'
      ]
    },
    '../wilib/lib/apresentacao': {
      deps: ['./edi']
    },
    '../wilib/js/lib/indice': {
      deps: ['./edi']
    },
    '../wilib/js/lib/reflita': {
      deps: ['./edi']
    },
    '../wilib/js/lib/comparaTexto': {
      deps: ['./edi']
    },
    '../wilib/js/lib/alternativa_pn': {
      deps: ['./edi']
    },
    '../wilib/js/lib/alternativa_vf': {
      deps: ['./edi']
    },
    '../wilib/js/lib/check_text': {
      deps: ['./edi']
    },
    '../wilib/js/lib/alternativa': {
      deps: ['./edi']
    },
    '../wilib/js/lib/revela_palavra': {
      deps: ['./edi']
    },
    '../wilib/js/lib/alternativa_prova': {
      deps: ['./edi']
    },
    '../wilib/js/lib/alternativa_img': {
      deps: ['./edi']
    },
    '../wilib/js/lib/alternativa_botao': {
      deps: ['./edi']
    },
    '../wilib/js/lib/cartas': {
      deps: ['./edi']
    },
    '../wilib/js/lib/slide_vertical': {
      deps: ['./edi']
    },
    '../wilib/js/lib/revela_carrosel': {
      deps: [
        './edi',
        '../vendor/jquery-rotate.js'
      ]
    },
    '../wilib/js/lib/alternativa_balao': {
      deps: ['./edi']
    },
    '../wilib/js/lib/alternativa_botao_asterisco': {
      deps: ['./edi']
    },
    '../wilib/js/lib/alternativa_boliche': {
      deps: [
        './alternativa_botao'
      ]
    },
    '../wilib/js/lib/alternativa_carimbo': {
      deps: ['./edi']
    },
    '../wilib/js/vendor/tweenjs-0.5.0.min': {
      deps: ['./easeljs-0.7.0.min']
    },
    '../wilib/js/vendor/movieclip-0.7.0.min': {
      deps: ['./tweenjs-0.5.0.min']
    },
    '../wilib/js/lib/ct_b08': {
      deps: ['./edi']
    },
    '../wilib/js/lib/revela_r01b': {
      deps: ['./edi']
    },
    '../wilib/js/lib/revela': {
      deps: ['./edi']
    },
    '../wilib/js/lib/revela_d05': {
      deps: [
        './edi',
        '../vendor/jquery-ui-1.10.4.custom'
      ]
    },
    '../wilib/js/lib/revela_bolas': {
      deps: ['./edi']
    },
    '../wilib/js/lib/revela_e10': {
      deps: ['./edi']
    },
    '../wilib/js/lib/revela_roletinha': {
      deps: [
        './edi'
      ]
    },
    '../wilib/js/lib/revela_e11': {
      deps: [
        './edi'
      ]
    },
    '../wilib/js/lib/arrasta_img': {
      deps: ['./arrasta']
    },
    '../wilib/js/lib/revela_espiral': {
      deps: ['./edi']
    },
    '../wilib/js/lib/revela_interrogacao': {
      deps: ['./edi']
    },
    '../wilib/js/lib/ligar': {
      deps: [
        './edi',
        '../vendor/jquery.ui.touch-punch-liga.min',
      ]
    },
    '../wilib/js/lib/revela_pergaminho': {
      deps: ['./edi']
    },
    '../wilib/js/lib/arrasta_mais_menos': {
      deps: ['./arrasta']
    },
    '../wilib/js/lib/revela_bloco_nota': {
      deps: ['./edi']
    },
    '../wilib/js/lib/revela_seta': {
      deps: ['./edi']
    },
    '../wilib/js/lib/revela_slide': {
      deps: ['./edi']
    },
    '../wilib/js/lib/arrasta': {
      deps: [
        './edi',
        '../vendor/jquery.ui.touch-punch.min'
      ]
    },
    '../wilib/js/lib/arrasta_numero': {
      deps: [
        './edi'
      ]
    },
    '../wilib/js/lib/quebra-cabeca': {
      deps: [
        './edi',
        '../vendor/jigsawpuzzle-rhill'
      ]
    },
    '../wilib/js/lib/arrasta-folha': {
      deps: [
        './edi'
      ]
    },
    '../wilib/js/lib/arrastaBola': {
      deps: [
        './edi'
      ]
    },
    '../wilib/js/lib/revela-btn': {
      deps: [
        './edi'
      ]
    },
    '../wilib/js/lib/revela_lampada': {
      deps: [
        './edi'
      ]
    },
    '../wilib/js/lib/dicas': {
      deps: [
        './edi'
      ]
    },
    '../wilib/js/lib/caneta': {
      deps: [
        './edi'
      ]
    },
    '../wilib/js/lib/cacaPalavras': {
      deps: [
        './edi'
      ]
    },
    '../wilib/js/lib/revela_bloco_seta': {
      deps: [
        './edi'
      ]
    },
    '../wilib/js/vendor/jquery.ui.touch-punch-liga.min': {
      deps: ['../lib/jquery-ui-liga']
    },
    '../wilib/js/vendor/jquery.ui.touch-punch.min': {
      deps: ['../lib/jquery-ui-modificado']
    },
    '../wilib/js/lib/revista': {
      deps: [
        './edi',
        '../vendor/turn'
      ]
    },
    '../wilib/js/lib/revela_btn_numero': {
      deps: ['./edi']
    },
    '../wilib/js/vendor/turn': {
      deps: [
        './modernizr.2.5.3.min'
      ]
    },
    '../wilib/js/vendor/preloadjs-0.3.1.min': {
      deps: [
        './IndexOf',
        './Event',
        './EventDispatcher',
        './Sound',
        './WebAudioPlugin',
        './HTMLAudioPlugin'
      ]
    },

    /*##############################################################*/
    /*############################CANVAS############################*/
    /*##############################################################*/

    '../wilib/canvas/objetos/gas_cfxclx': {
      deps: ['../control/gas_cfxclx']
    },
    '../wilib/canvas/objetos/gas_ch4': {
      deps: ['../control/gas_ch4']
    },
    '../wilib/canvas/objetos/gas_co2': {
      deps: ['../control/gas_co2']
    },
    '../wilib/canvas/objetos/gas_n2o': {
      deps: ['../control/gas_n2o']
    },
    '../wilib/canvas/objetos/curiosidade': {
      deps: ['../control/curiosidade']
    },
    '../wilib/canvas/objetos/mundo_com_estufa': {
      deps: ['../control/mundo_com_estufa']
    },
    '../wilib/canvas/objetos/mundo_sem_estufa': {
      deps: ['../control/mundo_sem_estufa']
    },
    '../wilib/canvas/objetos/bolicheAcerto': {
      deps: ['../control/Boliche_acerto_Mini_Canvas']
    },
    '../wilib/canvas/objetos/garota_bicicleta': {
      deps: ['../control/garota_bicicleta']
    },
    '../wilib/canvas/objetos/animaLampada': {
      deps: ['../control/lampada']
    },
    '../wilib/canvas/objetos/basqueteAcerto': {
      deps: ['../control/basqueteAcerto']
    },
    '../wilib/canvas/objetos/cidade_1': {
      deps: ['../control/cidade_1']
    },
    '../wilib/canvas/objetos/cidade_2': {
      deps: ['../control/cidade_2']
    },
    '../wilib/canvas/objetos/basqueteErro': {
      deps: ['../control/basqueteErro']
    },
    '../wilib/canvas/objetos/mascote': {
      deps: ['../control/mascote']
    },
    '../wilib/canvas/objetos/mascoteTeste': {
      deps: ['../control/mascoteTeste']
    },
    '../wilib/canvas/objetos/torneira_pingando': {
      deps: ['../control/torneira_pingando']
    },
    '../wilib/canvas/objetos/foguete': {
      deps: ['../control/foguete']
    },
    '../wilib/canvas/objetos/sol': {
      deps: ['../control/sol']
    },
    '../wilib/canvas/objetos/fumaca': {
      deps: ['../control/fumaca']
    },
    '../wilib/canvas/objetos/cidade': {
      deps: ['../control/cidade']
    },
    '../wilib/canvas/objetos/homemEscritorio': {
      deps: ['../control/homemEscritorio']
    },
    '../wilib/canvas/objetos/professora': {
      deps: ['../control/professora']
    },
    '../wilib/canvas/objetos/showSetas': {
      deps: ['../control/showSetas']
    },
    '../wilib/canvas/objetos/showSetasComTres': {
      deps: ['../control/showSetasComTres']
    },
    '../wilib/canvas/objetos/mapa_brasil': {
      deps: ['../control/mapa_brasil']
    },
    '../wilib/canvas/objetos/animaCerto': {
      deps: ['../control/animaCerto']
    },
    '../wilib/canvas/objetos/animaErrado': {
      deps: ['../control/animaErrado']
    },
    '../wilib/canvas/objetos/prosseguir': {
      deps: ['../control/prosseguir']
    },
    '../wilib/canvas/objetos/muitoBem': {
      deps: ['../control/muitoBem']
    },
    '../wilib/canvas/objetos/voceErrou': {
      deps: ['../control/voceErrou']
    },
    '../wilib/canvas/objetos/mascoteVarinha': {
      deps: ['../control/mascoteVarinha']
    },
    '../wilib/canvas/objetos/mascoteIndice': {
      deps: ['../control/mascoteIndice']
    },
    '../wilib/canvas/objetos/bolicheErro': {
      deps: ['../control/Boliche_erro_Mini_Canvas']
    },
    '../wilib/canvas/objetos/animaMundo': {
      deps: ['../control/mundo']
    },
    '../wilib/canvas/objetos/animacao_carro': {
      deps: ['../control/animacao_carro']
    },
    '../wilib/canvas/objetos/anim_homem_e_mulher': {
      deps: ['../control/anim_homem_e_mulher']
    },
    '../wilib/canvas/objetos/animaDicas': {
      deps: ['../control/dicas']
    },
    '../wilib/canvas/objetos/animaReflita': {
      deps: ['../control/reflita']
    },
    // aquecimento_global_1
    '../wilib/canvas/objetos/aquecimento_global_1': {
      deps: ['../control/aquecimento_global_1']
    },
    // aquecimento_global_2
    '../wilib/canvas/objetos/aquecimento_global_2': {
      deps: ['../control/aquecimento_global_2']
    },
    // aquecimento_global_1
    '../wilib/canvas/objetos/aquecimento_global_3': {
      deps: ['../control/aquecimento_global_3']
    },
    '../wilib/canvas/objetos/jogoCar': {
      deps: ['../control/jogoCar']
    },
    // 7_erros_10_23
    '../wilib/canvas/objetos/7_erros_10_23': {
      deps: ['../control/7_erros_10_23']
    },
    '../wilib/canvas/objetos/paissagem': {
      deps: ['../control/paissagem']
    },
    // meio ambiente licao 09 peca 64 6 canvas (sala, cozinha, quarto, banheiro, jardim, garagem)
    '../wilib/canvas/objetos/sala': {
      deps: ['../control/sala']
    },
    '../wilib/canvas/objetos/cozinha': {
      deps: ['../control/cozinha']
    },
    '../wilib/canvas/objetos/quarto': {
      deps: ['../control/quarto']
    },
    '../wilib/canvas/objetos/banheiro': {
      deps: ['../control/banheiro']
    },
    '../wilib/canvas/objetos/jardim': {
      deps: ['../control/jardim']
    },
    '../wilib/canvas/objetos/garagem': {
      deps: ['../control/garagem']
    },
    '../wilib/canvas/objetos/l7p30_praia': {
      deps: ['../control/l7p30_praia']
    },
    '../wilib/canvas/objetos/l7p30_nuvem': {
      deps: ['../control/l7p30_nuvem']
    },
    '../wilib/canvas/objetos/personagem': {
      deps: ['../control/personagem']
    },
    '../wilib/canvas/objetos/l7p36_monstro': {
      deps: ['../control/l7p36_monstro']
    },
  }
});

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-53173925-2', 'auto');
ga('send', 'pageview');
