var EDI_EXISTS = false,
  WIDTH_DEFAULT = 793,
  HEIGHT_DEFAULT = 387,
  ARR_TAREFAS = [],
  FLAG_TAREFAS = false,
  ENUNCIADO_LIGA = null;

var getScale = function () {
  "use strict";
  return SCALE;
};

var setScale = function () {
  WINDOW_WIDTH = $(window).width();
  WINDOW_HEIGHT = $(window).height();
  SCALEW = WINDOW_WIDTH / WIDTH_DEFAULT;
  SCALEH = WINDOW_HEIGHT / HEIGHT_DEFAULT;
  SCALE = SCALEH < SCALEW ? SCALEH : SCALEW;

  $('#principal').css({
    'transform': 'scale(' + getScale() + ')'
  });
};

setScale();

$(window).resize(setScale);

var licao = {
  config: {
    WIQUADRO: false,
    DEBUG: true
  }
};

(function () {
  "use strict";
  var loading = $('<div>')
    .attr('id', 'ctLoading')
    .css({
      position: 'absolute',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(54,102,166,1)',
      zIndex: 5000,
      textShadow: '0 0 15px #000',
      color: '#ccc'
    })
    .appendTo('html');

  var spn = $('<span>')
    .css({
      position: 'relative',
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'center',
      width: loading.width(),
      height: loading.height()
    }).appendTo(loading);

  $('<i>')
    .attr('id', 'loadingR')
    .addClass('fa fa-cog')
    .appendTo(spn);

  $('<i>')
    .attr('id', 'loadingL')
    .css({})
    .addClass('fa fa-cog')
    .appendTo(spn);


})();


log = function (msg) {
  "use strict";
  if (licao.config.DEBUG) {
    console.log(msg);
    return true;
  }
};

//Gerenciador de tarefas
onAllDeferredsComplete = function (cb) {
  "use strict";
  FLAG_TAREFAS = true;

  setScale();

  $('#ctLoading').remove();
  if (!!cb) {
    cb();
  }

};

onFailDeferred = function () {
  "use strict";
  console.log("fail");
};

addTarefa = function () {
  "use strict";
  if (FLAG_TAREFAS) {
    return;
  }

  var aux = ARR_TAREFAS;
  for (var i in ARR_TAREFAS) {
    if (ARR_TAREFAS.hasOwnProperty(i)) {
      if (!ARR_TAREFAS[i].isResolved()) {
        ARR_TAREFAS[i].reject();
        ARR_TAREFAS[i] = new $.Deferred();
        break;
      }
    }
  }

  ARR_TAREFAS = [];
  for (var j in aux) {
    if (aux.hasOwnProperty(j)) {
      if (!aux[j].isResolved()) {
        ARR_TAREFAS.push(aux[j]);
      }
      else {
        ARR_TAREFAS.push(null);
      }
    }
  }
  ARR_TAREFAS.push(new $.Deferred());

  $.when.apply(null, ARR_TAREFAS).then(onAllDeferredsComplete, onFailDeferred);

  log(ARR_TAREFAS);
  return ARR_TAREFAS.length - 1;

};
//----------------------

if (licao.config.WIQUADRO) {
  /*jslint evil: true */
  document.write(unescape("%3Cscript src='../wilib/js/vendor/jquery.wiquadro.js' type='text/javascript'%3E%3C/script%3E"));
}


$.fn.peBalao = function (settings) {
  "use strict";
  var config = {
    top: 0,
    left: 0,
    scaleX: 1,
    scaleY: 1,
    background: '#FFF',
    borda: '#ccc',
    tamanhoBorda: 12,
    rotate: 0,
    zIndex: 0
  };
  if (settings) {
    $.extend(config, settings);
  }

  var $self = this;
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  var SVG = $(svg)
    .attr({
      width: "26",
      height: "20",
      'xmlns': "http://www.w3.org/2000/svg",
      'xmlns:xlink': "http://www.w3.org/1999/xlink",
      'xml:space': "preserve",
      'style': "shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
    })
    .css({
      position: 'absolute',
      transform: 'rotate(' + config.rotate + 'deg)' + ' scaleX(' + config.scaleX + ') scaleY(' + config.scaleY + ')',
      top: config.top,
      left: config.left,
      zIndex: config.zIndex
    })
    .appendTo($self);
  SVG[0].setAttribute('viewBox', '0 0 254 254');
  $(path).attr({
    d: 'M17 212c23,-114 94,-179 220,-168 -48,32 -106,88 -81,165',
    stroke: config.borda,
    'stroke-width': config.tamanhoBorda + "px",
    fill: config.background
  })
    .appendTo(SVG);
};
$.fn.iconeInterrogacao = function (anime, settings) {
  "use strict";
  var self = this,
    $self = $(this);

  var config = {
    widthInicial: 1010,
    heightInicial: 990,
    widthFinal: 81,
    heightFinal: 79,
    imagem: '../wilib/img/svg/interrogacao.svg',
    zIndex: 2001
  };

  if (settings) {
    $.extend(config, settings);
  }

  $self.each(function (i, obj) {
    var img = $('<img>')
      .css({
        position: 'absolute',
        zIndex: config.zIndex
      });

    if (anime) {
      img.attr({
        src: config.imagem,
        width: config.widthInicial,
        height: config.heightInicial

      })
        .css({
          left: 40 - 505,
          top: 39 - 445
        })
        .appendTo(obj);

      img.transition({
        width: config.widthFinal,
        height: config.heightFinal,
        top: 0,
        left: 0,
        rotate: '-360deg'
      }, 1000);

      return;
    }

    img.attr({
      src: '../wilib/img/svg/interrogacao.svg',
      width: config.widthFinal,
      height: config.heightFinal
    })
      .appendTo(obj);
  });

  return self;
};


$.fn.iconeExclamacao2 = function (anime, settings) {
  "use strict";
  var self = this,
    $self = $(this);

  var config = {
    widthFinal: 53,
    heightFinal: 47
  };

  if (settings) {
    $.extend(config, settings);
  }

  $self.each(function (i, obj) {
    var img = $('<img>')
      .css({
        position: 'absolute',
        zIndex: 2001
      });

    if (anime) {
      img.attr({
        src: '../wilib/img/svg/ico-exclamacao.svg'
      })
        .css({
          width: 13,
          height: 17,
          position: 'absolute',
          left: 20,
          top: 15
        })
        .appendTo(obj);

      img.transition({
        width: config.widthFinal,
        height: config.heightFinal,
        top: 0,
        left: 0,
        rotate: '360deg'
      }, 1000);

      return;
    }

    img.attr({
      src: '../wilib/img/svg/ico-exclamacao.svg',
      width: config.widthFinal,
      height: config.heightFinal
    })
      .appendTo(obj);
  });

  return self;
};

$.fn.iconeExclamacao = function (anime) {
  "use strict";
  var self = this,
    $self = $(this);

  var img = $('<img>')
    .css({
      position: 'absolute',
      zIndex: 2001
    });

  if (anime) {
    img.attr({
      src: '../wilib/img/svg/exclamacao.svg'
    }).appendTo($self);

    img.transition({
      width: 0,
      height: 0,
      top: 31,
      left: 31
    }, 1, function () {
      img.transition({
        width: 66,
        height: 66,
        top: 0,
        left: 0
      }, 200, function () {
        img.transition({
          width: 58,
          height: 58,
          top: 4,
          left: 4
        });
      });
    });

    return self;
  }

  img.attr({
    src: '../wilib/img/svg/exclamacao.svg',
    width: 58,
    height: 58
  })
    .appendTo($self);

  return self;
};

$.fn.iconeExemplo = function (anime, callBack) {
  "use strict";
  var self = this,
    $self = $(this);

  var img = $('<img>')
    .css({
      position: 'absolute',
      zIndex: 2001
    });

  if (anime) {
    img.attr({
      src: '../wilib/img/svg/exemplo.svg'
    }).appendTo($self);

    img.transition({
      width: 0,
      height: 0,
      top: 31,
      left: 31
    }, 1, function () {
      img.transition({
        width: 66,
        height: 66,
        top: 0,
        left: 0
      }, 200, function () {
        img.transition({
          width: 59,
          height: 59,
          top: 4,
          left: 4
        }, 500, callBack());
      });
    });

    return self;
  }

  img.attr({
    src: '../wilib/img/svg/exemplo.svg',
    width: 59,
    height: 59
  })
    .appendTo($self);

  return self;
};

$.fn.iconeInterrogacaoAzul = function (anime, settings) {
  "use strict";
  var config = {
    tamanhoAnimacao: 66,
    tamanho: 58,
    zIndex: 2001
  };

  if (settings) {
    $.extend(config, settings);
  }

  var self = this,
    $self = $(this);

  var img = $('<img>')
    .css({
      position: 'absolute',
      zIndex: config.zIndex
    });

  if (anime) {
    img.attr({
      src: '../wilib/img/svg/iconeInterrogacao.svg'
    }).appendTo($self);

    img.transition({
      width: 0,
      height: 0,
      top: config.tamanhoAnimacao / 2,
      left: config.tamanhoAnimacao / 2
    }, 1, function () {
      img.transition({
        width: config.tamanhoAnimacao,
        height: config.tamanhoAnimacao,
        top: 0,
        left: 0
      }, 200, function () {
        img.transition({
          width: config.tamanho,
          height: config.tamanho,
          top: (config.tamanhoAnimacao - config.tamanho) / 2,
          left: (config.tamanhoAnimacao - config.tamanho) / 2
        });
      });
    });

    return self;
  }

  img.attr({
    src: '../wilib/img/svg/iconeInterrogacao.svg',
    width: config.tamanho,
    height: config.tamanho
  })
    .appendTo($self);

  return self;
};

$.fn.iconeIndice = function (anime) {
  "use strict";
  var self = this,
    $self = $(this);
  var img = $('<img>')
    .css({
      position: 'absolute',
      zIndex: 2001,
      'border-radius': '50px'
    });

  if (anime) {
    img.attr({
      src: '../wilib/img/svg/iIndice.svg'
    }).appendTo($self);

    img.transition({
      width: 0,
      height: 0,
      top: 53,
      left: 53
    }, 1, function () {
      img.transition({
        width: 106,
        height: 106,
        top: -3,
        left: -3
      }, 500, function () {
        img.transition({
          width: 100,
          height: 100,
          top: 0,
          left: 0
        }, 100, function () {

          function repeteAnima() {
            img.css('box-shadow', '0px 0px 0px rgba(255,255,255,0.7)');
            img.transition({
              'box-shadow': '0px 0px 120px rgba(255,255,255,0.7)'
            }, 2000, function () {
              img.transition({
                'box-shadow': '0px 0px 120px transparent'
              }, 4000, repeteAnima);
            });
          }

          repeteAnima();
        });
      });
    });

    return self;
  }

  img.attr({
    src: '../wilib/img/svg/iIndice.svg',
    width: 101,
    height: 101
  })
    .appendTo($self);

  return self;
};

//Método: ajuda
//Data: 23/09/2014
//Uso:	$('[ajuda]').ajuda(css);
//		<tag ajuda="É simplesmente uma simulação de texto da indústria tipográfica.">Lorem Ipsum</tag>
function ajuda(_settings) {
  "use strict";
  var config = {
    width: 100,
    background: 'rgb(44, 62, 80)',
    color: '#FFF',
    top: 0,
    left: 0,
    linkColor: 'none',
    lineHeight: null,
    zIndex: null
  };

  if (_settings) {
    $.extend(config, _settings);
  }

  var $ajuda = $('.ajuda');

  $ajuda
    .css({
      fontWeight: 'bold',
      textDecoration: 'underline',
      cursor: 'help',
      position: 'relative',
      color: config.linkColor
    })
    .mouseenter(_.throttle(function () {
      $(this)
        .find('.tooltip')
        .css({
          background: config.background,
          border: '4px solid ' + config.background,
          color: config.background
        })
        .fadeIn(100);

      $(this)
        .find('.tooltip:after');
    },500))
    .mouseleave(function () {
      $(this)
        .find('.tooltip')
        .fadeOut(100);

      setTimeout(function () {
        $(this).remove();
      }, 300);
    });

  $ajuda.each(function (i, obj) {
    ajudaTop(obj);
  });

  function ajudaTop(a) {
    var spn = $('<span>')
      .css({
        color: config.color
      })
      .html($(a).attr('data-ajuda'));

    var $tooltip = $('<span>')
      .addClass('tooltip')
      .html(spn)
      .css({
        lineHeight: config.lineHeight,
        width: config.width,
        left: ($(a).width() / 2) - (config.width / 2) - 15 + (config.left),
        top: -65 + ($(a).height() * -1) + (config.top),
        zIndex: config.zIndex
      });

    $tooltip.appendTo(a);
  }
}

var toRGB = function (valor) {
  "use strict";
  var temp = valor.match(/.{1,2}/g);
  var alt = '';
  for (var i in temp) {
    if (temp.hasOwnProperty(i)) {
      alt += parseInt('0x' + temp[i]) + ' ';
    }
  }
};

/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
//var isMobile = (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
//console.log(!!isMobile);

// Uso: msg('msg', {opt}, cb);
// * {opt} opcional
// * cb opcional
var msg = function (msg, opt, cb) {
  "use strict";
  if (!cb) {
    cb = opt;
  }

  var _opt = {
    width: 350,
    height: 150,
    fontSize: 14,
    color: '#9D9D9D',
    textAlign: 'center'
  };

  $.extend(_opt, opt);

  var close = function () {
    $bg.fadeOut(function () {
      $bg.remove();
      if (cb) {
        cb();
      }
    });
  };

  var $bg = $('<div>')
    .addClass('msg-bg')
    .appendTo('#principal')
    .click(close);

  var $ctBox = $('<div>')
    .css({
      width: $bg.width() + 'px',
      height: $bg.height() + 'px',
      display: 'table-cell',
      verticalAlign: 'middle'
    })
    .appendTo($bg);

  var $msgBox = $('<div>')
    .addClass('msg-box')
    .css({
      margin: '0 auto',
      width: _opt.width,
      height: _opt.height
    })
    .appendTo($ctBox);

  $('<p>')
    .css({
      height: _opt.height,
      textAlign: _opt.textAlign,
      color: _opt.color,
      fontSize: _opt.fontSize
    })
    .html(msg)
    .appendTo($msgBox);

  $('<span>')
    .html('<i class="fa fa-close">')
    .addClass('btn-close')
    .appendTo($msgBox)
    .click(close);

  $bg.fadeIn();

};

var barraMsg = function (msg, opt) {
  "use strict";
  var $dv_titulo = $('#dv_titulo');
  console.log($dv_titulo.height())
  var _opt = {
    height: 150,
    zIndex: 2002,
    fontSize: 16,
    top: (!!$dv_titulo.length) ? (($dv_titulo.height() === 383) ? 0 : 68) : 0,
    left: (($dv_titulo.height() === 383) ? 0 : 100),
    topBotao: (!!$dv_titulo.length) ? (($dv_titulo.height() === 383) ? 1 : 71) : 1,
    wait: 1
  };

  $.extend(_opt, opt);

  setTimeout(function () {

    var div = $('<div>')
      .addClass('barra-msg')
      .css({
        position: 'absolute',
        top: _opt.top,
        left: _opt.left,
        zIndex: _opt.zIndex,
        height: 0,
        width: 600,
        fontSize: _opt.fontSize,
        background: '#fff',
        border: '1px solid #666',
        borderTop: 'none',
        borderRadius: '0 0 10px 10px',
        boxShadow: '5px 5px 5px rgba(0,0,0,0.5)',
        overflow: 'hidden'
      })
      .appendTo('#conteudo');


    div.animate({height: _opt.height}, 1000, function () {
      //jshint validthis: true
      function clique() {

        var $this = $(this);

        $(this).off();

        if ($(this).hasClass('r')) {
          div.animate({height: 0}, 1000, function () {
            $this.mousedown(clique);
          });

          $(this)
            .css({
              background: '#9c0'
            })
            .html('<span style="position: absolute; top: -6px; font-size: 19px; left: 4px;">+</span>')
            .removeClass('r');
        }
        else {
          div.animate({height: _opt.height}, 1000, function () {
            $this.mousedown(clique);
          });

          $(this)
            .css({
              background: '#f00'
            })
            .html('<span class="menos" style="position: absolute; top: -12px; font-size: 25px; left: 5px;">-</span>')
            .removeClass($(this).addClass('r'));
        }
      }

      $('<div>')
        .css({
          width: 560,
          height: _opt.height,
          padding: '0 20px',
          verticalAlign: 'middle',
          display: 'table-cell',
          textAlign: 'center',
          fontWeight: 'bold',
          color: '#666'
        })
        .html('<span style="width: 450px; display: inline-block;">' + msg + '</span>')
        .appendTo(div);

      $('<div>')
        .addClass('r')
        .css({
          position: 'absolute',
          top: _opt.topBotao,
          left: 10,
          zIndex: _opt.zIndex,
          height: 15,
          width: 20,
          background: '#f00',
          boxShadow: '2px 2px 3px rgba(0,0,0,0.5)',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer'
        })
        .html('<span class="menos" style="position: absolute; top: -12px; font-size: 25px; left: 5px;">-</span>')
        .mousedown(clique)
        .appendTo('#conteudo');

    });
  }, _opt.wait * 1000);
};

var msgLeft = function (msg, opt) {

  var $dv_titulo = $('#dv_titulo');
  var _opt = {
    width: 300,
    zIndex: 10,
    top: (($dv_titulo.width() == '788') ? 75 : 0),
    left: (($dv_titulo.width() == '788') ? 0 : 100),
    leftBtn: 1,
    wait: 1,
    color: '#666',
    background: '#fff'
  };

  $.extend(_opt, opt);

  setTimeout(function () {

    var div = $('<div>')
      .css({
        position: 'absolute',
        top: _opt.top,
        left: _opt.left,
        zIndex: _opt.zIndex,
        height: 300,
        width: 0,
        background: _opt.background,
        border: '1px solid #666',
        borderLeft: 'none',
        borderRadius: '0 10px 10px 0',
        boxShadow: '2px 2px 2px rgba(0,0,0,0.5)',
        overflow: 'hidden'
      })
      .appendTo('#conteudo');


    div.animate({width: _opt.width}, 1000, function () {

      function clique() {

        var $this = $(this);

        $(this).off();

        if ($(this).hasClass('r')) {
          div.animate({width: 0}, 1000, function () {
            $this.mousedown(clique);
          });

          $(this)
            .css({
              background: '#9c0'
            })
            .html('<span style="position: absolute; top: -6px; font-size: 19px; left: 4px;">+</span>')
            .removeClass('r');
        }
        else {
          div.animate({width: _opt.width}, 1000, function () {
            $this.mousedown(clique);
          });

          $(this)
            .css({
              background: '#f00'
            })
            .html('<span class="menos" style="position: absolute; top: -12px; font-size: 25px; left: 5px;">-</span>')
            .removeClass($(this).addClass('r'));
        }
      }

      var abs = $('<div>')
        .css({
          height: 300,
          width: _opt.width
        })
        .appendTo(div);

      $('<div>')
        .css({
          height: 300,
          width: _opt.width,
          padding: '0 20px',
          verticalAlign: 'middle',
          display: 'table-cell',
          textAlign: 'center',
          fontWeight: 'bold',
          color: _opt.color,
          background: _opt.background
        }).
        html(msg)
        .appendTo(abs);

      $('<div>')
        .addClass('r')
        .css({
          position: 'absolute',
          top: 77,
          left: _opt.leftBtn,
          zIndex: _opt.zIndex,
          height: 15,
          width: 20,
          background: '#f00',
          boxShadow: '2px 2px 3px 2px rgba(0,0,0,0.5)',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer'
        })
        .html('<span class="menos" style="position: absolute; top: -12px; font-size: 25px; left: 5px;">-</span>')
        .mousedown(clique)
        .appendTo('#conteudo');

    });
  }, _opt.wait * 1000);
};

var mensagem = function (msg, opt) {

  var _opt = {
    fontSize: 30,
    color: '#FFF',
    background: 'rgba(0,0,0,0.5)'
  };

  $.extend(_opt, opt);

  var $dv_titulo = $('#dv_titulo');

  var ct = $('<div>')
    .attr('id', 'msgFinalMain')
    .css({
      position: 'absolute',
      top: ((!!$dv_titulo.length) ? 68 : 0),
      left: 0,
      width: 788,
      height: ((!!$dv_titulo.length) ? 315 : 383),
      background: _opt.background,
      zIndex: 101,
      display: 'none'
    })
    .append()
    .appendTo('#conteudo');

  var middle = $('<div>')
    .css({
      position: 'relative',
      width: 788,
      height: (!!$dv_titulo.length) ? 315 : 383,
      color: _opt.color,
      display: 'table-cell',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontSize: _opt.fontSize,
      textShadow: 'rgba(0, 0, 0, 0.901961) 2px 2px 2px'
    })
    .html(msg)
    .appendTo(ct);

  $('<div>')
    .addClass('r')
    .css({
      position: 'absolute',
      top: 0,
      left: 10,
      height: 15,
      width: 20,
      background: '#f00',
      boxShadow: '2px 2px 3px rgba(0,0,0,0.5)',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer'
    })
    .html('<span class="menos" style="position: absolute; top: -10px; font-size: 25px; left: 5px;">-</span>')
    .mousedown(function () {
      ct.fadeOut();
      open.fadeIn();
    })
    .appendTo(ct);

  var open = $('<div>')
    .addClass('r')
    .css({
      position: 'absolute',
      top: ((!!$dv_titulo.length) ? 68 : 0),
      left: 10,
      zIndex: 101,
      height: 15,
      width: 20,
      display: 'none',
      background: '#9c0',
      boxShadow: '2px 2px 3px rgba(0,0,0,0.5)',
      color: '#fff',
      fontWeight: 'bold',
      cursor: 'pointer'
    })
    .html('<span style="position: absolute; top: -4px; font-size: 19px; left: 4px;">+</span>')
    .mousedown(function () {
      ct.fadeIn();
      open.fadeOut();
    })
    .appendTo('#conteudo');

  ct.fadeIn();

};

var clique = function () {
  setInterval(function () {
    $('#conteudo').click();
  }, 1000);
};

var seta = function (opt, cb, anexar) {

  if (!anexar && typeof cb == 'string')
    anexar = cb;

  if ((cb == 'function' || !cb) && !anexar)
    anexar = '#conteudo';

  var _opt = {
    position: 'absolute',
    top: 0,
    left: 0,
    rotate: 0,
    tamanho: 1,
    scale: 0,
    tempo: 750,
    autoClick: false,
    attr: {},
    addclass: '',
    css: {}
  };

  $.extend(_opt, opt);

  var clique = function () {

    $(this).css({cursor: 'default'}).off();
    seta.transition({
      width: (90 + (!!_opt.tamanho ? _opt.tamanho : 0))
    }, _opt.tempo, function () {
      if (!!cb && typeof cb == 'function')
        cb(this);
    });

    retangulo.transition({
      width: (64 + (!!_opt.tamanho ? _opt.tamanho : 0)),
      backgroundColor: '#9c0'
    }, _opt.tempo);

    triangulo.transition({
      'border-color': ' transparent transparent transparent #9c0'
    }, _opt.tempo);
  };

  var balao = $('<div>')
    .addClass(_opt.addclass)
    .css({
      position: _opt.position,
      top: _opt.top,
      left: _opt.left
    })
    .appendTo(anexar);

  var seta = $('<div>')
    .addClass('clique')
    .attr(_opt.attr)
    .css({
      position: 'absolute',
      top: 0,
      width: 40,
      height: '25px',
      cursor: 'pointer'
    })
    .css(_opt.css)
    .on('click', clique)
    .appendTo(balao);

  $('<div>')
    .addClass('trianguloSombra')
    .css({
      'float': 'right',
      'margin-left': '-21px',
      'margin-top': '-2px',
      'border-color': 'transparent transparent transparent #ccc',
      'border-width': '13px',
      'border-style': 'solid'
    })
    .appendTo(seta);

  var triangulo = $('<div>')
    .addClass('triangulo')
    .css({
      'float': 'right',
      'margin-left': '-21px',
      'margin-top': '1px',
      'border-color': ' transparent transparent transparent #FF9933',
      'border-width': '10px',
      'border-style': 'solid'
    })
    .appendTo(seta);

  var retangulo = $('<div>')
    .addClass('retangulo')
    .css({
      'float': 'left',
      'border-top': '1px solid #ccc',
      'border-bottom': '1px solid #ccc',
      'border-left': '1px solid #ccc',
      'background-color': '#FF9933',
      'width': '14px',
      'margin-top': '6px',
      'height': '8px'
    })
    .appendTo(seta);

  if (!!_opt.rotate)
    balao.css({rotate: _opt.rotate});

  if (!!_opt.scale)
    balao.transition({scale: _opt.scale}, 0);

  if (_opt.autoClick)
    seta.click();

};
