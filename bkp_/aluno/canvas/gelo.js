(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 188,
	height: 205,
	fps: 24,
	color: "#FFFFFF",
	manifest: []
};



// symbols:



(lib.Interpolar1 = function() {
	this.initialize();

	// Camada 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A2llzIAfg+MAoGATmIgeA/gA0YoiIBdi9MAphAUSIhdC9gAzJs0IAfg/MAoGATnIgfA/g");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-144.6,-88.4,289.3,176.9);


(lib.Símbolo1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Camada 3 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("ApYDuIOwvwIATAOIDuX3g");
	mask.setTransform(60.2,77.2);

	// Camada 2
	this.instance = new lib.Interpolar1("synched",0);
	this.instance.setTransform(119.2,-35.7);

	this.instance.mask = mask;

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:59.2,y:214.3},19).wait(1));

	// Camada 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E7E7E7").s().p("ApYDuIOwvwIATAOIDuX3g");
	this.shape.setTransform(60.2,77.2);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(20));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,120.3,154.4);


// stage content:
(lib.gelo = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#F3F3F3").s().p("AjdD5IBNoIIFyHnInDA4g");
	this.shape.setTransform(130.7,159.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E7E7E7").s().p("AjOgeIGXjpIAGAHIhOIIg");
	this.shape_1.setTransform(95.4,158);

	this.instance = new lib.Símbolo1();
	this.instance.setTransform(49.7,84.7,0.649,0.649,0,0,0,60.1,77.4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#B3C3C4").s().p("Anbn2IO3KnIscFGg");
	this.shape_2.setTransform(89.7,86.8,1,1,0,0,0,-31.3,1.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#E7E7E7").s().p("AizE+IkJpfIN5glIpjKNg");
	this.shape_3.setTransform(124.4,136.9);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#9AA8BB").s().p("AnblSIG5ASID1A0IEJJfg");
	this.shape_4.setTransform(58.7,134.8);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FFFFFF").ss(3,1,1).p("AB7h1IAcgeAC6iPIgsgKIgNgrIAeghIAsAKIANArgAB7h1IAmAkABOieIAtApABWhMIAlgpAgWhsIBpAYIADAIIAeBgIhZgQAAAgkIATAEIAIAbIgTAUIgagHIgCgGIgHgTIAUgVIAHACIgWhIIgMgmIAxgQAAAggIAAgEAgUACIADgCACqgaIgKA1IgsgHIABAGIhJBPIgGAGIhvgaIgGgTIA7hAAAhgUIA1g4ADFAiIgDAAIgFgOIAdggIAsAIIAPAoIgdAjIgsgJIgKgcIgigHIgLA4AgxjDIgIAJIgsgKIgOgrIAfghIArAKIAOArgAkFgVIgPgqIAdgiIAsAIIAPAqIgdAjgAhciBIA6gRIgPgxAiUgWIgIAmAiUgWIgvgJAhpgOIgDgKIBPhWIAHACAgaAAIhPgOIgrgIAiHhdIgNBHAhyBmIA9A4AhyBmIAjgkIgahQAiFDSIgsgJIgNgrIAeghIAsAKIANArgAiHB9IAVgXAiIBSIAWAUAgNChIBEgWIgLgiIgYhPABHC+IAdAHIANArIgeAhIgsgKIgNgrIAeghIAPADIgQgzIAmgM");
	this.shape_5.setTransform(124.2,44.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#E7E7E7").s().p("AjOEBIBNoIIFQElImYDqg");
	this.shape_6.setTransform(131.7,178.4);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#F3F3F3").s().p("AjhjXIHDg5IgEAZIhNIIg");
	this.shape_7.setTransform(96.3,176.8);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFCC66").s().p("AqWKXQkSkTgBmEQABmDESkTQETkSGDgBQGEABESESQETETABGDQgBGEkTETQkSESmEAAQmDAAkTkSg");
	this.shape_8.setTransform(94,93.8);

	this.addChild(this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.instance,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(88.2,56.3,193.6,251);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;