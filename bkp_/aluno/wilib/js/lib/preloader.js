var Preloader = function() {
  return {
    images: {},
    taks: [],
    manifest: [],
    progress: 0,
    createManifest: function(_manifest) {
      var that = this;
      that.images = {};
      that.manifest = _manifest;
      that.taks = [];
      for(var i = 0; i < _manifest.length; i++) {
        var img = new Image();
        var promise = new $.Deferred();
        that.taks.push(promise);
        that.images[_manifest[i].id] = img;
      }
    },
    loadAll: function(callBackDone, callBackFail){
      var that = this;

      var $ctProgress = $('<div>').css({
        position: 'relative',
        top: '5%',
        left: '35%',
        width: '30%'
      })
      .appendTo('#ctLoading span');

      var $progress = $('<div>').addClass('progress').appendTo($ctProgress);

      var $bar = $('<div>').addClass('progress-bar progress-bar-info progress-bar-striped active')
      .attr({
        'role': 'progressbar',
        'aria-valuenow': 40,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'style': 'width: 0%'
      }).appendTo($progress);

      var $txt = $('<div>').attr('id','txt-progress').css({fontSize: 10}).html('Carregando...').appendTo($ctProgress);
      
      $.when.apply(null, that.taks).then(callBackDone, callBackFail);
      
      var id;
      that.manifest.forEach(function(el, i){
        id = el.id;        
        that.images[id].src = el.src;
        that.images[id].onload = function(a) {
          var promise = that.taks[i];
          that.progress += 1/that.manifest.length;
          $bar.attr({'aria-valuenow': that.progress*100, 'style': 'width: '+ that.progress*100+'%' });
          promise.resolve();
        }
        that.images[id].onerror = function() {
            var promise = that.taks[i];
            promise.reject(el.src);
            $('#ctLoading').find('i').removeClass('fa-cog').addClass('fa-exclamation-triangle')
            .css({
              fontSize: 200,
              'color':'#ff0',
              '-webkit-animation': 'none',
              '-moz-animation': 'none',
              '-ms-animation': 'none',
              'animation:':  'none'
            })[1].remove();

            $txt.html('A imagem “' +el.src+ '” não foi encontrada!');
        };
      });
    },
    get: function(id) {
      return $(this.images[id]).clone();
    }
  }
};