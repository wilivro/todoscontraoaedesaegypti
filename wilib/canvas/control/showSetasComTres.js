(function (lib, img, cjs) {

var p; // shortcut to reference prototypes
(lib.edi = null);
(lib.licao = null);

// library properties:
lib.properties = {
	width: 788,
	height: 315,
	fps: 24,
	color: "#FFFFFF",
	manifest: []
};
(lib.callback = function(){
});
// stage content:
(lib.Revela_Q04 = function() {
	this.initialize();

	lib.edi.objetivos.push(0);
	lib.edi.objetivos.push(0);
	lib.edi.objetivos.push(0);

	// Camada 1
	this.seta_01 = new lib.mc_seta();
	this.seta_01.setTransform(388.7,99.1,4.108,4.108,0,90,-90);

	this.seta_02 = new lib.mc_seta2();
	this.seta_02.setTransform(180.8,-23.2,3.811,3.811,90);

	this.seta_03 = new lib.mc_seta3();
	this.seta_03.setTransform(613.2,240.2,4.542,4.542,-90);

	this.addChild(this.seta_03,this.seta_02,this.seta_01);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(580.3,166.3,446.5,143.6);


// symbols:
(lib.mc_seta3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	var seta = this;

        this.frame_0 = function () {
            this.stop();
        }

        this.frame_19 = function () {
            this.stop();

            if (!!licao.config.WIQUADRO)
                Wiquadro.api.addInteration(1, 'btn3', 'seta3', 'T');

            if (lib.edi.objetivos.indexOf(0) < 0) {
                $("[data-name='showSetas']").css({
                    zIndex: -1
                });

                if (lib.callback) lib.callback();
                lib.edi.finalizar();
            }
        }

        seta.on("click", function () {
            this.play();
            this._listeners = null;
            lib.edi.objetivos.pop();
            lib.edi.objetivos.unshift(1);
        });

        // actions tween:
        this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_1 = new cjs.Graphics().p("AgMABIAAgBIAZAAIAAAAIAAABg");
	var mask_graphics_2 = new cjs.Graphics().p("AgNAHIABgNIAZAAIABANg");
	var mask_graphics_3 = new cjs.Graphics().p("AgOAYIACgvIAYAAIADAvg");
	var mask_graphics_4 = new cjs.Graphics().p("AgQAnIAEhNIAYAAIAFBNg");
	var mask_graphics_5 = new cjs.Graphics().p("AgTBFIAGiJIAZAAIAICJg");
	var mask_graphics_6 = new cjs.Graphics().p("AgWBcIAJi3IAZAAIALC3g");
	var mask_graphics_7 = new cjs.Graphics().p("AgYBvIALjdIAYAAIAODdg");
	var mask_graphics_8 = new cjs.Graphics().p("AgcBWIAHgCIABAAIAxAAIg5A1gAgUBUIAKjcIAZAAIAODcg");
	var mask_graphics_9 = new cjs.Graphics().p("AglBVIAagKIABAAIAwAAIhLBHgAgKBLIAKjcIAZAAIANDcg");
	var mask_graphics_10 = new cjs.Graphics().p("AgzBSIA0gTIAAAAIAzAAIhnBfgAABA/IALjcIAaAAIAODcg");
	var mask_graphics_11 = new cjs.Graphics().p("AiaCeIABAAIDMAAIAAgCIABAAIgBgBIADhKIA1gTIABAAIAyAAIhqBhgAiZCeIgEiFIDVAAIgCA4IgDBKIABABIgBAAIAAACgABsA+IAKjcIAbAAIANDcg");
	var mask_graphics_12 = new cjs.Graphics().p("AiYCeIABAAIDMAAIAAgCIABAAIgBgBIADhKIA1gTIABAAIAyAAIhqBhgAiXCeIgIkBIDdAAIgGC0IgDBKIABABIgBAAIAAACgABuA+IAKjcIAbAAIANDcg");
	var mask_graphics_13 = new cjs.Graphics().p("AiVDXIABAAIDMAAIAAgCIABAAIgBgBIADhKIA1gTIABAAIAyAAIhqBhgAiUDXIgOmuIDpAAIgMFhIgDBKIABABIgBAAIAAACgABxB3IAKjcIAbAAIANDcg");
	var mask_graphics_14 = new cjs.Graphics().p("AiSEsIABAAIDMAAIAAgCIABAAIgBgBIADhKIA1gTIABAAIAyAAIhqBhgAiREsIgUpYID0AAIgRILIgDBKIABABIgBAAIAAACgAB0DMIAKjcIAbAAIANDcg");
	var mask_graphics_15 = new cjs.Graphics().p("AiRFiIACgBIDMAAIAAgCIAAAAIAAAAIAChKIA2gTIAAAAIAzAAIhqBhgAiPFhIgYrDID8AAIgWJ3IgCBKIAAAAIAAAAIAAACgAB1ECIALjeIAaAAIAODeg");
	var mask_graphics_16 = new cjs.Graphics().p("AhtF/IABgBIDMAAIAAgCIABAAIgBAAIAAACIjMAAIgZrrIhFAAIAUgSIFgAAIAVASIhGAAIgWKfIgDBKIADhKIA1gTIABAAIAyAAIhqBhgACZEfIAKjfIAbAAIANDfg");
	var mask_graphics_17 = new cjs.Graphics().p("AhtGWIABAAIDMAAIAAgCIABAAIgBAAIAAACIjMAAIgZrsIhFAAIBKhAID1AAIBKBAIhGAAIgWKfIgDBKIADhKIA1gTIABAAIAyAAIhqBhgACZE2IAKjeIAbAAIANDeg");
	var mask_graphics_18 = new cjs.Graphics().p("AhtGiIABAAIDMAAIAAgCIABAAIgBAAIAAACIjMAAIgZrrIhFAAIBmhZIC9AAIBmBZIhGAAIgWKeIgDBLIADhLIA1gTIABAAIAyAAIhqBhgACZFCIAKjeIAbAAIANDeg");
	var mask_graphics_19 = new cjs.Graphics().p("AhtHMIABAAIDMAAIAAgCIABAAIgBgBIADhKIA1gTIABAAIAyAAIhqBhgAhsHMIgZrsIhFAAIDFisIDECsIhGAAIgWKfIgDBKIABABIgBAAIAAACgACZFsIAKjeIAbAAIANDeg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(1).to({graphics:mask_graphics_1,x:20.8,y:6.1}).wait(1).to({graphics:mask_graphics_2,x:20.8,y:6.7}).wait(1).to({graphics:mask_graphics_3,x:20.8,y:8.4}).wait(1).to({graphics:mask_graphics_4,x:20.8,y:9.9}).wait(1).to({graphics:mask_graphics_5,x:20.9,y:12.9}).wait(1).to({graphics:mask_graphics_6,x:20.9,y:15.2}).wait(1).to({graphics:mask_graphics_7,x:20.9,y:17.1}).wait(1).to({graphics:mask_graphics_8,x:20.6,y:19.7}).wait(1).to({graphics:mask_graphics_9,x:19.6,y:20.6}).wait(1).to({graphics:mask_graphics_10,x:18.2,y:21.8}).wait(1).to({graphics:mask_graphics_11,x:7.6,y:21.9}).wait(1).to({graphics:mask_graphics_12,x:7.4,y:21.9}).wait(1).to({graphics:mask_graphics_13,x:7.1,y:16.2}).wait(1).to({graphics:mask_graphics_14,x:6.8,y:7.7}).wait(1).to({graphics:mask_graphics_15,x:6.6,y:2.3}).wait(1).to({graphics:mask_graphics_16,x:3.1,y:-0.5}).wait(1).to({graphics:mask_graphics_17,x:3.1,y:-2.9}).wait(1).to({graphics:mask_graphics_18,x:3.1,y:-4.1}).wait(1).to({graphics:mask_graphics_19,x:3.1,y:-8.3}).wait(1));

	// mask
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#28377A").s().p("AhlHMIgarrIhFAAIDEisIDFCsIhGAAIgYLpIAAAAIAAAAIAAACg");
	this.shape.setTransform(2.5,-8.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#3A4FAF").s().p("AicAvIEGheIAAAAIAzAAIhqBfg");
	this.shape_1.setTransform(7.7,33);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#28377A").s().p("AgYBvIALjdIAYAAIAODdg");
	this.shape_2.setTransform(20.9,17.1);

	this.shape.mask = this.shape_1.mask = this.shape_2.mask = mask;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(19));

	// Layer 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#28377A").s().p("AgMAPIAAgdIAZAAIAAAdg");
	this.shape_3.setTransform(20.7,2.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(19.4,1.2,2.6,3.2);


(lib.mc_seta2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	var seta = this;

    this.frame_0 = function () {
        this.stop();
    }

    this.frame_19 = function () {
        this.stop();

        if (!!licao.config.WIQUADRO)
            Wiquadro.api.addInteration(1, 'btn2', 'seta2', 'T');

        if (lib.edi.objetivos.indexOf(0) < 0) {
            $("[data-name='showSetas']").css({
                zIndex: -1
            });

            if (lib.callback) lib.callback();
            lib.edi.finalizar();
        }
    }

    seta.on("click", function () {
        this.play();
        this._listeners = null;
        lib.edi.objetivos.pop();
        lib.edi.objetivos.unshift(1);
    });

    // actions tween:
    this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_1 = new cjs.Graphics().p("AgMABIAAgBIAZAAIAAABg");
	var mask_graphics_2 = new cjs.Graphics().p("AgOASIACgjIAZAAIACAjg");
	var mask_graphics_3 = new cjs.Graphics().p("AgQAnIAFhNIAYAAIAEBNg");
	var mask_graphics_4 = new cjs.Graphics().p("AgTA+IAIh7IAZAAIAGB7g");
	var mask_graphics_5 = new cjs.Graphics().p("AgVBVIAKipIAZAAIAICpg");
	var mask_graphics_6 = new cjs.Graphics().p("AgYBsIAOjXIAYAAIALDXg");
	var mask_graphics_7 = new cjs.Graphics().p("AgeBRIANjcIAZAAIAKDcIABAAIAMAHIAAA0g");
	var mask_graphics_8 = new cjs.Graphics().p("AgsBFIAOjcIAbAAIAIDcIAAAAIAnAXIAAA8g");
	var mask_graphics_9 = new cjs.Graphics().p("AhZAcIAOjcIAbAAIAKDcIAAAAIB/BKIAABbg");
	var mask_graphics_10 = new cjs.Graphics().p("Ah8gDIANjeIAbAAIALDeIAAAAIC+BtIAAABIACAAIAFADIAAgDIABAAIAAB3g");
	var mask_graphics_11 = new cjs.Graphics().p("AAWDkIAAgCIj9jnIAOjeIAbAAIAKDeIAAAAIC/BtIAAABIACAAIAEADIAAgDIDWAAIgDB7g");
	var mask_graphics_12 = new cjs.Graphics().p("AAUDkIAAgCIj8jnIANjeIAbAAIAKDeIABAAIDFBxIgDhiIDcAAIgHDag");
	var mask_graphics_13 = new cjs.Graphics().p("AARDkIAAgCIj8jnIAOjeIAaAAIALDeIAAAAIDFBxIgIj7IDnAAIgNFzg");
	var mask_graphics_14 = new cjs.Graphics().p("AANEuIAAgCIj8jpIAOjcIAaAAIALDcIAAAAIDFBzIgOnjID1AAIgVJbg");
	var mask_graphics_15 = new cjs.Graphics().p("AALFtIAAgBIj8jqIAOjcIAaAAIALDcIAAAAIDFBzIgSphID9AAIgZLZg");
	var mask_graphics_16 = new cjs.Graphics().p("AgWGAIAAgCIj+jpIAOjdIAaAAIALDdIAAAAIDHByIgVpzIhFAAIAVgTIFeAAIAWATIhGAAIgZLsg");
	var mask_graphics_17 = new cjs.Graphics().p("AgWGSIAAgCIj+jpIAOjcIAaAAIALDcIAAAAIDHBzIgVp0IhFAAIA/g3IELAAIA/A3IhGAAIgZLsg");
	var mask_graphics_18 = new cjs.Graphics().p("AgWGwIAAgCIj+jpIAOjcIAaAAIALDcIAAAAIDHBzIgVp0IhFAAICChzICCAAICFBzIhGAAIgZLsg");
	var mask_graphics_19 = new cjs.Graphics().p("AgWHMIAAgBIj+jqIAOjeIAaAAIALDeIAAAAIDHBzIgVpzIhFAAIDDisIDGCsIhGAAIgZLrg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(1).to({graphics:mask_graphics_1,x:33.2,y:0.2}).wait(1).to({graphics:mask_graphics_2,x:33.2,y:1.9}).wait(1).to({graphics:mask_graphics_3,x:33.2,y:3.9}).wait(1).to({graphics:mask_graphics_4,x:33.1,y:6.3}).wait(1).to({graphics:mask_graphics_5,x:33.1,y:8.6}).wait(1).to({graphics:mask_graphics_6,x:33.1,y:10.9}).wait(1).to({graphics:mask_graphics_7,x:33.7,y:14}).wait(1).to({graphics:mask_graphics_8,x:35.1,y:15.2}).wait(1).to({graphics:mask_graphics_9,x:39.6,y:19.4}).wait(1).to({graphics:mask_graphics_10,x:43.1,y:22.6}).wait(1).to({graphics:mask_graphics_11,x:53.8,y:22.9}).wait(1).to({graphics:mask_graphics_12,x:53.9,y:22.9}).wait(1).to({graphics:mask_graphics_13,x:54.2,y:22.9}).wait(1).to({graphics:mask_graphics_14,x:54.6,y:15.5}).wait(1).to({graphics:mask_graphics_15,x:54.8,y:9.1}).wait(1).to({graphics:mask_graphics_16,x:58.3,y:7.3}).wait(1).to({graphics:mask_graphics_17,x:58.3,y:5.5}).wait(1).to({graphics:mask_graphics_18,x:58.3,y:2.5}).wait(1).to({graphics:mask_graphics_19,x:58.3,y:-0.4}).wait(1));

	// Layer 8
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#28377A").s().p("AgYBvIAOjdIAYAAIALDdg");
	this.shape.setTransform(33.1,11.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#202C62").s().p("Ah+h0IAyAAIABAAIDGB0IAEB1g");
	this.shape_1.setTransform(43.3,34);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#28377A").s().p("AhlHMIgZrrIhGAAIDEisIDFCsIhGAAIgYLrg");
	this.shape_2.setTransform(66.3,-0.4);

	this.shape.mask = this.shape_1.mask = this.shape_2.mask = mask;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(19));

	// Layer 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#28377A").s().p("AgMAPIAAgdIAZAAIAAAdg");
	this.shape_3.setTransform(33.4,-3);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(32.1,-4.6,2.7,3.1);


(lib.mc_seta = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	var seta = this;

    this.frame_0 = function () {
        this.stop();
    }

    this.frame_19 = function () {
        this.stop();

        if (!!licao.config.WIQUADRO)
            Wiquadro.api.addInteration(1, 'btn', 'seta', 'T');

        if (lib.edi.objetivos.indexOf(0) < 0) {
            $("[data-name='showSetas']").css({
                zIndex: -1
            });

            if (lib.callback) lib.callback();
            lib.edi.finalizar();
        }
    }

    seta.on("click", function () {
        this.play();
        this._listeners = null;
        lib.edi.objetivos.pop();
        lib.edi.objetivos.unshift(1);
    });

    // actions tween:
    this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(19).call(this.frame_19).wait(1));

	// mask (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_1 = new cjs.Graphics().p("AgMABIAAgBIAZAAIAAAAIAAABg");
	var mask_graphics_2 = new cjs.Graphics().p("AgNAHIABgNIAZAAIABANg");
	var mask_graphics_3 = new cjs.Graphics().p("AgOAYIACgvIAYAAIADAvg");
	var mask_graphics_4 = new cjs.Graphics().p("AgQAnIAEhNIAYAAIAFBNg");
	var mask_graphics_5 = new cjs.Graphics().p("AgTBFIAGiJIAZAAIAICJg");
	var mask_graphics_6 = new cjs.Graphics().p("AgWBcIAJi3IAZAAIALC3g");
	var mask_graphics_7 = new cjs.Graphics().p("AgYBvIALjdIAYAAIAODdg");
	var mask_graphics_8 = new cjs.Graphics().p("AgcBWIAHgCIABAAIAxAAIg5A1gAgUBUIAKjcIAZAAIAODcg");
	var mask_graphics_9 = new cjs.Graphics().p("AglBVIAagKIABAAIAwAAIhLBHgAgKBLIAKjcIAZAAIANDcg");
	var mask_graphics_10 = new cjs.Graphics().p("AgzBSIA0gTIAAAAIAzAAIhnBfgAABA/IALjcIAaAAIAODcg");
	var mask_graphics_11 = new cjs.Graphics().p("AiaCeIABAAIDMAAIAAgCIABAAIgBgBIADhKIA1gTIABAAIAyAAIhqBhgAiZCeIgEiFIDVAAIgCA4IgDBKIABABIgBAAIAAACgABsA+IAKjcIAbAAIANDcg");
	var mask_graphics_12 = new cjs.Graphics().p("AiYCeIABAAIDMAAIAAgCIABAAIgBgBIADhKIA1gTIABAAIAyAAIhqBhgAiXCeIgIkBIDdAAIgGC0IgDBKIABABIgBAAIAAACgABuA+IAKjcIAbAAIANDcg");
	var mask_graphics_13 = new cjs.Graphics().p("AiVDXIABAAIDMAAIAAgCIABAAIgBgBIADhKIA1gTIABAAIAyAAIhqBhgAiUDXIgOmuIDpAAIgMFhIgDBKIABABIgBAAIAAACgABxB3IAKjcIAbAAIANDcg");
	var mask_graphics_14 = new cjs.Graphics().p("AiSEsIABAAIDMAAIAAgCIABAAIgBgBIADhKIA1gTIABAAIAyAAIhqBhgAiREsIgUpYID0AAIgRILIgDBKIABABIgBAAIAAACgAB0DMIAKjcIAbAAIANDcg");
	var mask_graphics_15 = new cjs.Graphics().p("AiRFiIACgBIDMAAIAAgCIAAAAIAAAAIAChKIA2gTIAAAAIAzAAIhqBhgAiPFhIgYrDID8AAIgWJ3IgCBKIAAAAIAAAAIAAACgAB1ECIALjeIAaAAIAODeg");
	var mask_graphics_16 = new cjs.Graphics().p("AhtF/IABgBIDMAAIAAgCIABAAIgBAAIAAACIjMAAIgZrrIhFAAIAUgSIFgAAIAVASIhGAAIgWKfIgDBKIADhKIA1gTIABAAIAyAAIhqBhgACZEfIAKjfIAbAAIANDfg");
	var mask_graphics_17 = new cjs.Graphics().p("AhtGWIABAAIDMAAIAAgCIABAAIgBAAIAAACIjMAAIgZrsIhFAAIBKhAID1AAIBKBAIhGAAIgWKfIgDBKIADhKIA1gTIABAAIAyAAIhqBhgACZE2IAKjeIAbAAIANDeg");
	var mask_graphics_18 = new cjs.Graphics().p("AhtGiIABAAIDMAAIAAgCIABAAIgBAAIAAACIjMAAIgZrrIhFAAIBmhZIC9AAIBmBZIhGAAIgWKeIgDBLIADhLIA1gTIABAAIAyAAIhqBhgACZFCIAKjeIAbAAIANDeg");
	var mask_graphics_19 = new cjs.Graphics().p("AhtHMIABAAIDMAAIAAgCIABAAIgBgBIADhKIA1gTIABAAIAyAAIhqBhgAhsHMIgZrsIhFAAIDFisIDECsIhGAAIgWKfIgDBKIABABIgBAAIAAACgACZFsIAKjeIAbAAIANDeg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(1).to({graphics:mask_graphics_1,x:20.8,y:6.1}).wait(1).to({graphics:mask_graphics_2,x:20.8,y:6.7}).wait(1).to({graphics:mask_graphics_3,x:20.8,y:8.4}).wait(1).to({graphics:mask_graphics_4,x:20.8,y:9.9}).wait(1).to({graphics:mask_graphics_5,x:20.9,y:12.9}).wait(1).to({graphics:mask_graphics_6,x:20.9,y:15.2}).wait(1).to({graphics:mask_graphics_7,x:20.9,y:17.1}).wait(1).to({graphics:mask_graphics_8,x:20.6,y:19.7}).wait(1).to({graphics:mask_graphics_9,x:19.6,y:20.6}).wait(1).to({graphics:mask_graphics_10,x:18.2,y:21.8}).wait(1).to({graphics:mask_graphics_11,x:7.6,y:21.9}).wait(1).to({graphics:mask_graphics_12,x:7.4,y:21.9}).wait(1).to({graphics:mask_graphics_13,x:7.1,y:16.2}).wait(1).to({graphics:mask_graphics_14,x:6.8,y:7.7}).wait(1).to({graphics:mask_graphics_15,x:6.6,y:2.3}).wait(1).to({graphics:mask_graphics_16,x:3.1,y:-0.5}).wait(1).to({graphics:mask_graphics_17,x:3.1,y:-2.9}).wait(1).to({graphics:mask_graphics_18,x:3.1,y:-4.1}).wait(1).to({graphics:mask_graphics_19,x:3.1,y:-8.3}).wait(1));

	// mask
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#1B7CC1").s().p("AhlHMIgarrIhFAAIDEisIDFCsIhGAAIgYLpIAAAAIAAAAIAAACg");
	this.shape.setTransform(2.5,-8.3);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#1B7CC1").s().p("AgYBvIALjdIAYAAIAODdg");
	this.shape_1.setTransform(20.9,17.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#319CD7").s().p("AicAvIEGheIAAAAIAzAAIhqBfg");
	this.shape_2.setTransform(7.7,33);

	this.shape.mask = this.shape_1.mask = this.shape_2.mask = mask;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(19));

	// Layer 1
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#1B7CC1").s().p("AgMAPIAAgdIAZAAIAAAdg");
	this.shape_3.setTransform(20.7,2.7);

	this.timeline.addTween(cjs.Tween.get(this.shape_3).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(19.4,1.2,2.6,3.2);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;