(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// stage content:
(lib.mundo = function() {
	this.initialize();

	// Camada 1
	this.instance = new lib.mc_Site();
	this.instance.setTransform(88.9,43.8,1,1,0,0,0,88.9,43.8);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,105,87.5);


// symbols:
(lib.gr_transp = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.lf(["#69C5EB","#1C8FD0","#1C8FD0","#62C1EA"],[0,0.463,0.541,1],-31.5,-4.6,31.7,4.8).s().p("AguE8QiDgUhPhqQhOhrATiBQAUiCBqhQQBrhOCBATQCDAUBPBrQBPBrgUCBQgUCDhrBOQhVA/hlAAQgXAAgagEg");
	this.shape.setTransform(32,32);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,64.1,64.1);


(lib.gr_mapa = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("Ai+DoIAAgkIAMhGIgQgIIgRgrIAHgLIAAgMIgRAAIgIgPIgJABIgjgTIgLgOIgNAAIglgvIABgZIgNgSIgIACIgGgMIAHABIgTgUIgYgEIg7AeIAVgVIgPgLIgGgqIAZgMIB1AMIgVgQIAEgVIB3gtIAtACIgoAuIA2AsIgRASIghgFIAFgUIgMAAIgFANIAEAMIgYgCIgNARIAJAIIARAFIAQASIAGgSIgEgEIAAgSIAmAGIAgAlIgsAYIAAAOIgIgBIgHAHIACAKIgRAPIAEAQIgIAAIgIgLIgbAAIgKAQIAKAKIAFAAIAKgGIAGADIgCAOIAKABIACAPIASAAIARgHIALAEIAYABIACAPIASAAIACASIANAAIAhAWIgKALIgCAWIhMBQQAFAHgCAJIgKAKIAJALIgHAJgAHnDfIgBgMIAVgZIgJgNIAGgIIAJANIABAYIgSAWgAGgC/IghgZIgBAHIgoAIIAEgRIgJgEIAAgVIA1giIAZAQIABgOIAHgBIAfAvIgVAngABFCvIgVg5IAGgIIAAgPIgSgVIAIgFIgRgLIghgBIgTgSIgBglIAqglIAYgCIAHAHIgBAGIATAGIAKgIIAHAGIAbABIAGgFIAAgPIgMAPIgOgTIACATIgNgKIgDgOIgRgUIgDAEIAOASIgJAMIgEgOIgOgLIgJAHIgFgDIgcAaIgIgbIARABIAEgIIgHgIIAMgJIAIgCIANgMIgDgKIAHgDIAFAHIAZgCIABgHIAagKIgEgGIgRAGIgFgLIANgJIgIgIIgQAVIAGAFIgCAMIgPAFIgEgKIgRADIABgPIAcgmIAfgHIAvALIgJAMIgSgCIAMANIAkgXIAXAAIgQgTIASgTIAagLIAFAJIgZAJIgOAPIAcARIgFgJIARgPIAfAIIAFgKIA3gVIAnAIIgcAQIBYAJIAOgOIAHANIAqAEIAMAGIAjgEIAAAvIgjADIACANIgVAbIgEgZIALgPIgnAEIgYAMIgCALIAQgEIACAXIgMABIgEAMIgWAOIADAKIgOAKIgFgRIgJAFIACAiIgqAXIALAQIgSALIgIgPIgEACIAEAQIAPAJIgFAFIgKgCIACAHIAJABIAFAPIAWAJIABAHIgZgFIgkgnIAPABIgVguIAAgMIgGAAIgDALIgVAQIAAAPIgPAFIgLgcIgHgDIACgQIg8gJIAJAOIALgDIALAKIgLAOIgaAKIgbgyIgHAAIgCAKIATAjIANAKIAVgCIgmA4IAFAFIACASIgMAJIgBAOIgeAjgACig7IABAbIAKgDIgHgQIAGgJIgDgEgABeg3IADAJIAJgHIAeABIgJgOIgJgCIABAHIgIABIgFgIgAC9g8IABAKIAGgBIgBgKgAlkCTIAIgIIALAIIgIAHgACICJIAEgQIAQgMIAGADIgKAkgAl4CFIAIgLIALAOIgIAFgAGFBbIgCgSIAxAMIAFARgAFlBWIAJgTIAKADIgKARgAFJBSIABgPIAQgQIALAQIgKATgAi7ATIACgHIAjAPIgGADgAmtAOIgLAGIgbgQIACgGIAfALIAMgGIAPANIgFAJgAjWAMIABgJIAUAGIgCAHgAGbgPIAFABIALAOIgJAGgAjDAAIAAgIIAJAMgAnxgSIAVAIIgOAIgAF+gXIAZgOIAJgZIAPAJIgQAaIgaANgAAwglIAFgHIADAKgAGxhDIATgIIAHAGIgUAIgAgPhZIAHgNIAIAMIgHAIgAAChUIAGgKIgKgMIAGgJIAFAMIALAJIgBAKgAh0h6IgSgdIgIgmIgPgLIgQAFIgIgLIAbghIBvgOIAbAWIgPANIgDAfIgWAiIgjALIgJAVgAoDioIAyAUIAHAKIgmgBIgIADIAKAKIgVAFgAgviQIAYgHIALAKIgWAQg");
	this.shape.setTransform(51.7,25.4);

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,103.3,50.9);


(lib.mc_Site = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 9
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#007AC0").s().p("Ah3A/QgzgaAAglQAAgkAzgbQAxgaBGgBQBHABAyAaQAxAbAAAkQAAAlgxAaQgyAbhHAAQhGAAgxgbgAh0g9QgwAaAAAjQAAAkAwAZQAxAaBDAAQBEAAAwgaQAxgZAAgkQAAgjgxgaQgwgahEAAQhEAAgwAag");
	this.shape.setTransform(43.8,20.9);

	this.instance = new lib.gr_transp("synched",0);
	this.instance.setTransform(43.7,21,0.28,0.533,0,87.7,81.7,32,31.9);
	this.instance.alpha = 0.602;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance},{t:this.shape}]}).wait(220));

	// Layer 7
	this.instance_1 = new lib.gr_transp("synched",0);
	this.instance_1.setTransform(43.8,43.8,1,1,60,0,0,32,32);
	this.instance_1.alpha = 0.699;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).wait(220));

	// Layer 2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AjhDiQhdheAAiEQAAiCBdheQBdheCEgBQCEABBdBeQBfBeAACCQAACEhfBeQhdBdiEAAQiEAAhdhdg");
	mask.setTransform(43.8,43.8);

	// Layer 6
	this.instance_2 = new lib.gr_mapa("synched",0);
	this.instance_2.setTransform(7.9,46.3,1,1,0,0,0,51.6,25.4);

	this.instance_2.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).to({x:-39.9},89).wait(131));

	// Layer 5
	this.instance_3 = new lib.gr_mapa("synched",0);
	this.instance_3.setTransform(121.9,46.3,1,1,0,0,0,51.6,25.4);

	this.instance_3.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({x:7.9},219).wait(1));

	// Layer 1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#007AC0").s().p("AjkDlQhfhfgBiGQABiFBfhfQBfhfCFgBQCGABBgBfQBfBfgBCFQABCGhfBfQhgBfiGAAQiFAAhfhfgAjejeQhcBdAACBQAACCBcBcQBdBcCBAAQCBAABdhcQBchcAAiCQAAiBhchdQhchbiCgBQiCABhcBbg");
	this.shape_1.setTransform(43.8,43.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#1C8FD0").s().p("AjhDiQhdheAAiEQAAiCBdheQBdheCEgBQCEABBdBeQBfBeAACCQAACEhfBeQhdBdiEAAQiEAAhdhdg");
	this.shape_2.setTransform(43.8,43.8);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#EAEAEA").s().p("AlxA2QgYgZBUgdQDQhNE2gDQCCAAAdAZQAdAYhTAfQjeBPk0ABIgEABQh8AAgZgbg");
	this.shape_3.setTransform(67.4,68);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#EAEAEA").s().p("AlxA2QgYgZBUgdQDQhNE2gDQCCAAAdAZQAdAYhTAfQjeBPk0ABIgEABQh8AAgZgbg");
	this.shape_4.setTransform(67.4,68);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(220));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-43.7,0,217.3,87.5);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;