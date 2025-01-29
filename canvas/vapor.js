(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 188,
	height: 192,
	fps: 24,
	color: "#FFFFFF",
	manifest: []
};



// symbols:



(lib.Tween5 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgRAcQgDgDgCgDQgFgBgDgEQgFgFAAgGQAAgGAFgEIAFgDIAAgDQAAgEACgDQADgDADAAIADABQABgFAEgDQAFgGAFAAQAIAAAGAGQADADABAEIAAAAQAIAAAEAFQAFAFAAAHQAAAFgFAEIgEADQACADAAAFQABAGgFAEQgFAFgGAAQgGAAgDgDQgFAFgGAAQgGAAgFgGgAAGADIgBgBIAAAAIAAAAIABABIAAAAg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-3.6,-3.4,7.3,6.9);


(lib.Tween1axiygaylga = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#FFFFFF","#99CCFF"],[0.008,0.663],-0.5,-2,0,-0.5,-2,9.3).s().p("Ag7AbQgZgLABgQQgBgPAZgMQAZgMAiABQAjgBAZAMQAZAMgBAPQABAQgZALQgZAMgjAAQgiAAgZgMg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-8.5,-4,17,8);


(lib.fumaça = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 5
	this.instance = new lib.Tween5("synched",0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(15).to({_off:false},0).to({scaleX:3.62,scaleY:3.62,rotation:360,x:-24.7,y:-37.8},29).to({x:-12.1,y:-45.6,alpha:0},10).wait(1));

	// Layer 4
	this.instance_1 = new lib.Tween5("synched",0);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(11).to({_off:false},0).to({scaleX:3.62,scaleY:3.62,rotation:360,x:-21.7,y:-59.7},29).to({x:-28.9,y:-84,alpha:0},10).to({_off:true},1).wait(4));

	// Layer 3
	this.instance_2 = new lib.Tween5("synched",0);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(7).to({_off:false},0).to({scaleX:3.62,scaleY:3.62,rotation:360,x:-8.8,y:-27.6},29).to({x:-15.4,y:-63.6,alpha:0},10).to({_off:true},1).wait(8));

	// Layer 2
	this.instance_3 = new lib.Tween5("synched",0);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(3).to({_off:false},0).to({scaleX:3.62,scaleY:3.62,rotation:360,x:-3.7,y:-44.7},29).to({x:6.5,y:-42.3,alpha:0},10).to({_off:true},1).wait(12));

	// Layer 1
	this.instance_4 = new lib.Tween5("synched",0);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).to({scaleX:3.62,scaleY:3.62,rotation:360,x:-21.1,y:-34.8},29).to({x:-14.2,y:-50.4,alpha:0},10).to({_off:true},1).wait(15));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.6,-3.4,7.3,6.9);


(lib.BOLHAcopy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Tween1axiygaylga("synched",0);
	this.instance._off = true;

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99CCFF").s().p("AgeA9IABgHQgJgNgQgGIgFABIgFgBQgHACgJAHIgDADIgGgDQgogSAAgaQAAgWAggRIASAdQAPAZAUAAQAPgBAFgGIAFgGIAFADQAMgFAFgIQAGgJAAgHQgJgNgOgHIgFACIAAgTIAXgBIAPAAIAAABIADAPQAEAEAGAEQgDAEAAADIADAPQAHAHAPAFQAMgEAHgKQAFgHABgGQAGAFAJACQALgEAHgJQALAHAHAIQgGADgGAFQgIAHgBAGQgFABgGAEQgJAIAAAFIACALIgHgDQgHACgJAHQgJAHAAAGIACAKQgaAGgfAAQgRAAgRgCgAA/gxIAEgGIADABIgBADIABAHIgHgFg");
	this.shape.setTransform(-0.5,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},3).to({state:[{t:this.instance}]},6).to({state:[{t:this.shape}]},2).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(3).to({_off:false},0).to({scaleX:1.59,scaleY:1.59},6).to({_off:true},2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.BOLHA = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.Tween1axiygaylga("synched",0);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#99FFFF").s().p("AgeA9IABgHQgJgNgQgGIgFABIgFgBQgHACgJAHIgDADIgGgDQgogSAAgaQAAgWAggRIASAdQAPAZAUAAQAPgBAFgGIAFgGIAFADQAMgFAFgIQAGgJAAgHQgJgNgOgHIgFACIAAgTIAXgBIAPAAIAAABIADAPQAEAEAGAEQgDAEAAADIADAPQAHAHAPAFQAMgEAHgKQAFgHABgGQAGAFAJACQALgEAHgJQALAHAHAIQgGADgGAFQgIAHgBAGQgFABgGAEQgJAIAAAFIACALIgHgDQgHACgJAHQgJAHAAAGIACAKQgaAGgfAAQgRAAgRgCgAA/gxIAEgGIADABIgBADIABAHIgHgFg");
	this.shape.setTransform(-0.5,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},6).to({state:[{t:this.shape}]},2).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).to({scaleX:1.59,scaleY:1.59},6).to({_off:true},2).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-8.5,-4,17,8);


// stage content:



(lib.vapor = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.BOLHAcopy();
	this.instance.setTransform(87.1,134.9,0.392,0.392);

	this.instance_1 = new lib.BOLHA();
	this.instance_1.setTransform(96.6,141.4,0.392,0.392);

	this.instance_2 = new lib.BOLHA();
	this.instance_2.setTransform(101.4,134.5,0.392,0.392);

	this.instance_3 = new lib.BOLHA();
	this.instance_3.setTransform(74.5,137.8,0.392,0.392);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#333333").s().p("AgKAIIASgPIADAPg");
	this.shape.setTransform(139.3,148.8);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#666666").s().p("AgeAAIAZgXIAkgCIgpAiIgUARg");
	this.shape_1.setTransform(141.3,147.1);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("AjHBAIApAAIAwhJQCnhIB6gNQAiAWgUAPIgmACQiIAWhxA1Ig6BKIgvABg");
	this.shape_2.setTransform(125.1,150.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.lf(["#BBBBBB","#9C9C9C","#4F4F4F","#FFFFFF","#9A9A9A","#B8B8B8"],[0.051,0.243,0.392,0.576,0.831,1],-48.6,0,48.6,0).s().p("AlWENQiLgugDhBIgBgCIAAnYQABAnAzAgQAiAXA5ATQCPAxDHgBQDIABCPgxQA4gTAjgXQAugeAFgjIAAHRQAABDiOAvQiPAwjIAAQjHAAiPgwg");
	this.shape_3.setTransform(93.8,160.1);

	this.instance_4 = new lib.BOLHAcopy();
	this.instance_4.setTransform(109.9,143.2,0.392,0.392);

	this.instance_5 = new lib.fumaça();
	this.instance_5.setTransform(89.4,141.4,1.745,1.745,0,-52.4,127.6);
	this.instance_5.alpha = 0.422;

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#CDFFFF").s().p("Ak9AoQg2gSgfgWQAfgVA2gSQCDgwC6AAQC7AACDAwQA1ASAgAVQggAWg1ASQiDAwi7AAQi6AAiDgwg");
	this.shape_4.setTransform(92.5,139.5,1,1,0,0,0,-0.5,0.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.lf(["#BBBBBB","#9C9C9C","#4F4F4F","#FFFFFF","#9A9A9A","#B8B8B8"],[0.051,0.243,0.392,0.576,0.831,1],48.6,-4.4,-48.6,-4.4).s().p("AlWByQg5gTgigWQgzgggBgoIAAgBIABgCQADhBCLgvQCPgwDHAAQDIAACPAwQCHAtAHA/IAAANQgFAkguAeQgjAWg4ATQiPAxjIAAQjHAAiPgxg");
	this.shape_5.setTransform(93.8,128.1);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#333333").s().p("AgKAIIAEgPIARAPg");
	this.shape_6.setTransform(43.4,137.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#666666").s().p("AgxBAIgtglQAJhACKgqIAqAcQhgAFg1BLIAYAaIAAAZg");
	this.shape_7.setTransform(47.7,130.3);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFCC66").s().p("AqWKXQkSkTAAmEQAAmDESkTQETkSGDgBQGEABESESQETETAAGDQAAGEkTETQkSESmEAAQmDAAkTkSg");
	this.shape_8.setTransform(93.8,93.8);

	this.addChild(this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.instance_5,this.instance_4,this.shape_3,this.shape_2,this.shape_1,this.shape,this.instance_3,this.instance_2,this.instance_1,this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(94,96,187.6,191.8);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;