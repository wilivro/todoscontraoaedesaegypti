define(function (require) {
  var tarefaRevela = addTarefa();

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(cavalinhos, frase, callback, callBackFinal, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var peca = this;

    var config = {
      posx: '620px',
      posy: '220px',
      width: '350px',
      height: '300px',
      topTexto: 30,
      txt: 'CLIQUE AQUI',
      ocultarTxt: true,
      link: false,
      bold: true,
      textAlign: 'center',
      bloqueioLink: 10000
    };

    if (settings) {
      $.extend(config, settings);
    }

    if (config.link)
      $(document).on('click', 'a', function (e) {
        e.preventDefault();
      });

    if (!!frase) {

      for (var i = 0; i < cavalinhos.length; i++) {
        var aux = '';
        for (var j = 0; j < cavalinhos[i].length; j++) {
          aux += '_';
        }
        frase = frase.replace('{' + i + '}', '<div style="display:inline-block;" palavra=\'' + cavalinhos[i] + '\'>' + aux + '</div>');
      }
    }
var $conteudo = $('#conteudo');

    var dv_frase = $('<div>')
      .css('position', 'absolute')
      .css('top', config.topTexto)
      .css('left', 30)
      .css('width', config.width)
      .css('height', config.height)
      .addClass('box')
      .appendTo($conteudo);

    var dv_centraliza_vertical = $('<div>')
      .addClass('centraliza-vertical')
      .css('width', '100%')
      .css('height', '100%')
      .css('position', 'absolute')
      .css('display', 'inline-table')
      .css('top', '0')
      .css('left', '0')
      .appendTo(dv_frase);


    var dv_centraliza_vertical2 = $('<div>')
      .addClass('centraliza-vertical2')
      .css('font-size', '100%')
      .css({
        display: 'table-cell',
        position: 'static',
        verticalAlign: 'middle',
        height: '100%'
      })
      .css('color', '#999999')
      .appendTo(dv_centraliza_vertical);

    if (config.bold) {
      $(dv_centraliza_vertical2).addClass('bold');
    }

    $('<div>')
      .addClass('centraliza-vertical3')
      .css('margin', '0 10px')
      .css('text-align', config.textAlign)
      .css('line-height', '26px')
      .css('position', 'relative')
      .css('font-size', '10pt')
      .html(frase)
      .appendTo(dv_centraliza_vertical2);

    var dv_carrossel = $('<div>')
      .css('position', 'absolute')
      .css('top', config.posy)
      .css('left', config.posx)
      .css('width', 1)
      .css('height', 1)
      .css('border', '3px solid #ccc')
      .attr('id', 'carrossel')
      .appendTo($conteudo);

    var angle_add = 360 / cavalinhos.length;
    var angle = 0;
    var distancia = 100;
    var tamanho_bola = 80;

    //desenhando os cavalinhos na tela
    var cssBola, _x, _y;
    for (var x = 0; x < cavalinhos.length; x++) {

      _x = Math.sin((angle / 180) * Math.PI) * distancia;
      _y = Math.cos((angle / 180) * Math.PI) * distancia;
      var cor = edi.util.corAleatoria();

      cssBola = {
        'background': 'radial-gradient(ellipse at center,  #DDDDDD 0%,' + cor + ' 100%)',
        'filter': 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#DDDDDD", endColorstr="' + cor + '",GradientType=1 )'
      };

      var dv_cavalinho = $('<div>')
        .css('position', 'absolute')
        .css('top', tamanho_bola / 2 * (-1) - 2) // _x - tamanho_bola/2)
        .css('left', tamanho_bola / 2 * (-1) - 2) // _y - tamanho_bola/2)
        .css('width', tamanho_bola)
        .css('height', tamanho_bola)
        .css('border', '3px solid ' + cor)
        .addClass('cavalinho')
        .attr('angle', (angle * (-1)) - 90)
        .attr('angle-init', angle)
        .attr('angle-proximo', (angle * (-1)) - 90 - angle_add)
        .attr('banco_id', x)
        .attr('posx', _x - tamanho_bola / 2)
        .attr('posy', _y - tamanho_bola / 2)
        .css(cssBola)
        .css({
          borderTopLeftRadius: tamanho_bola,
          borderTopRightRadius: tamanho_bola,
          borderBottomLeftRadius: tamanho_bola,
          borderBottomRightRadius: tamanho_bola,
          WebkitBorderTopLeftRadius: tamanho_bola,
          WebkitBorderTopRightRadius: tamanho_bola,
          WebkitBorderBottomLeftRadius: tamanho_bola,
          WebkitBorderBottomRightRadius: tamanho_bola,
          MozBorderRadius: tamanho_bola
        })
        .appendTo(dv_carrossel);

      var vf_dv_centraliza_vertical = $('<div>')
        .css('width', '100%')
        .css('height', '100%')
        .css('position', 'absolute')
        .css('top', '0')
        .css('left', '0')
        .css('display', 'inline-table')
        .appendTo(dv_cavalinho);


      var vf_dv_centraliza_vertical2 = $('<div>')
        .addClass('bold')
        .css('font-size', '100%')
        .css({
          display: 'table-cell',
          position: 'static',
          verticalAlign: 'middle',
          height: '100%'
        })
        .appendTo(vf_dv_centraliza_vertical);

      var vf_dv_centraliza_vertical3 = $('<div>')
        .addClass('centraliza-vertical3')
        .addClass('texto-interno')
        .addClass('sombra-texto')
        .css('position', 'relative')
        .css('color', '#fff')
        .css('margin', '0 10px')
        .css('text-align', 'center')
        .css('font-size', '10pt')
        .css('display', 'none')
        .html(cavalinhos[x])
        .attr('banco_id', x)
        .appendTo(vf_dv_centraliza_vertical2);

      $(dv_cavalinho).rotate(angle + 90);

      if (cavalinhos[x].length >= 10) {
        $(vf_dv_centraliza_vertical3).css('font-size', '8pt');
      }
      angle += angle_add;
    }

    var cavalinho_central = $('<div>')
      .css('position', 'absolute')
      .css('top', (tamanho_bola / 2 * (-1)) - 2)
      .css('left', (tamanho_bola / 2 * (-1)) - 2)
      .css('width', tamanho_bola)
      .css('height', tamanho_bola)
      .css('border', '3px solid #ccc')
      .addClass('central')
      .attr('posx', _x - tamanho_bola / 2)
      .attr('posy', _y - tamanho_bola / 2)
      .css(cssBola)
      .css({
        borderTopLeftRadius: tamanho_bola,
        borderTopRightRadius: tamanho_bola,
        borderBottomLeftRadius: tamanho_bola,
        borderBottomRightRadius: tamanho_bola,
        WebkitBorderTopLeftRadius: tamanho_bola,
        WebkitBorderTopRightRadius: tamanho_bola,
        WebkitBorderBottomLeftRadius: tamanho_bola,
        WebkitBorderBottomRightRadius: tamanho_bola,
        MozBorderRadius: tamanho_bola
      })
      .appendTo(dv_carrossel)
      .css('cursor', 'pointer')
      .click(function () {
        var eu = $(this);

        $('.cavalinho').each(function (key, value) {

          if (config.ocultarTxt)
            $('.texto-interno-central').fadeOut();

          $(eu).css('cursor', 'default');

          $(value).animate({
            top: $(value).attr('posx'),
            left: $(value).attr('posy')
          }, 1000);

          if (!!licao.config.WIQUADRO)
            Wiquadro.api.addInteration(6, $(this).attr('id'), null, true);

        });
      });

    dv_centraliza_vertical = $('<div>')
      .addClass('centraliza-vertical')
      .css('width', '100%')
      .css('height', '100%')
      .css('position', 'absolute')
      .css('display', 'inline-table')
      .css('top', '0')
      .css('left', '0')
      .appendTo(cavalinho_central);

    dv_centraliza_vertical2 = $('<div>')
      .addClass('centraliza-vertical2')
      .addClass('bold')
      .css('font-size', '100%')
      .css('color', '#999999')
      .css({
        display: 'table-cell',
        position: 'static',
        verticalAlign: 'middle',
        height: '100%'
      })
      .appendTo(dv_centraliza_vertical);

    $('<div>')
      .addClass('centraliza-vertical3')
      .addClass('texto-interno-central')
      .css('position', 'relative')
      .css('margin', '0 10px')
      .css('text-align', 'center')
      .css('font-size', '10pt')
      .addClass('sombra-texto')
      .css('color', '#fff')
      .html(config.txt)
      .appendTo(dv_centraliza_vertical2);
    $(cavalinho_central).rotate(90);

    if (config.link) {
      var modal = $('<div>')
        .attr({id: 'myModal'})
        .css({
          position: 'absolute',
          display: 'none',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,.5)'
        })
        .appendTo('body');

      var closed = $('<div>')
        .css({
          width: 60,
          height: 60,
          background: '#f00',
          borderRadius: 60,
          marginRight: 5,
          marginTop: 5,
          cursor: 'pointer',
          float: 'right'
        }).mousedown(function () {
          modal.fadeOut();
        })
        .appendTo(modal);

      $('<i>')
        .addClass("fa fa-reply-all")
        .css({
          fontSize: 40,
          color: '#fff',
          textAlign: 'center',
          width: 55,
          height: 60,
          verticalAlign: 'middle',
          display: 'table-cell',
          textShadow: '1px 3px 3px #000'
        })
        .appendTo(closed);

      var iframe = $('<iframe>', {
        id: 'myFrame',
        frameborder: 0,
        scrolling: 'yes'
      }).css({
        position: 'absolute',
        width: '80%',
        height: $(window).height() - 40,
        top: 20,
        left: '10%',
        zIndex: 100000
      }).appendTo(modal);
    }

    var fn_cavalinho = function () {
      var $textoInteiro = $('.texto-interno');
      $textoInteiro.fadeOut();

      var palavra = $(this).find('.texto-interno').html();
      var banco_id = $(this).find('.texto-interno').attr('banco_id');

      $('div[palavra="' + palavra + '"]').html(palavra).css('color', '#ACD22F');
      peca.objetivos[banco_id] = 1;

      if (config.link) {
        $('<div>')
          .attr({id: 'bloqueio'})
          .css({
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 1000
          })
          .appendTo('#conteudo');

        edi.regressiva(config.bloqueioLink, 'para clicar em outro botão!', function () {
          $('#bloqueio').remove();
        });
      }

      $('.cavalinho').removeClass('ativo');
      $(this).addClass('ativo').unbind('click');

      $(this).css('cursor', 'default');
      var proximo = parseInt($(this).attr('banco_id')) + 1;
      if (proximo < cavalinhos.length) {

        // rotaciona os circulos ao clicar
        var cont = 0;
        for (var i = parseInt($(this).attr('angle')); i >= parseInt($(this).attr('angle-proximo')); i--) {

          setTimeout('$(\'#carrossel\').rotate(' + i + ')', cont * 10);
          cont++;
        }

        $('.cavalinho[banco_id=' + (proximo) + ']')
          .click(fn_cavalinho)
          .css('cursor', 'pointer')
          .find('.texto-interno')
          .fadeIn(1000, function () {
            if (config.link) {

              var url = $('.cavalinho.ativo').find('a').attr('href');

              $('#myFrame')
                .attr({src: url})
                .load(function () {
                  $('#myModal').fadeIn();
                });
            }
          });
      } else {
        edi.finalizar();

        if (callBackFinal)
          callBackFinal();

        var angle_rotator = parseInt($(this).attr('angle'));
        $textoInteiro.fadeIn();
        setInterval(function () {
          $('#carrossel').rotate(angle_rotator -= 1);
        }, 10);

      }

      if (callback)
        callback();

    };

    $('.cavalinho[banco_id=0]').click(fn_cavalinho).css('cursor', 'pointer').find('.texto-interno').fadeIn();

    $(dv_carrossel).rotate(-90);

    ARR_TAREFAS[tarefaRevela].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_carrosel: _init
  };

});