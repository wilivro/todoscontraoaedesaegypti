/**
 jigsawpuzzle-rhill 0.4 (14-Jun-2009) (c) by Raymond Hill

 jigsawpuzzle-rhill licensed under a Creative Commons
 Attribution-Noncommercial-Share Alike 2.5 Canada License.
 Source: http://www.raymondhill.net/puzzle-rhill/jigsawpuzzle-rhill.php
**/

/*This makes JSlint happy*/
/*global self gadgets*/

// jigsaw puzzle-rhill



// helper functions
function stdout(s,clear){var consoleObj=self.document.getElementById('console');if(consoleObj){if(clear){consoleObj.innerHTML="";}consoleObj.innerHTML+=s+"<br>";}}
function stderr(s) {if (self.debug_on){stdout(s);}}

// Point object
function Point(a,b,c) {
	// a=x,b=y, c=id
	if (b!==undefined) {
		this.x=a;
		this.y=b;
		this.id=(c!==undefined)?c:0;
		}
	// a=Point or {x:?,y:?,id:?}
	else if (a && a.x!==undefined) {
		this.x=a.x;
		this.y=a.y;
		this.id=(a.id!==undefined)?a.id:0;
		}
	// empty
	else {
		this.x=this.y=this.id=0;
		}
	}
Point.prototype.toString = function() {
	return "{x:"+this.x+",y:"+this.y+",id:"+this.id+"}";
	};
Point.prototype.toHashkey = function() {
	// We could use toString(), but I am concerned with
	// the performance of Polygon.merge(). As for now
	// I have no idea if its really that much of an
	// improvement, but I figure the shorter the string
	// used as a hash key, the better. This also reduce
	// the number of concatenations from 6 to 2. Ultimately,
	// I could cache the hash key..
	return this.x+"_"+this.y;
	};
Point.prototype.clone = function() {
	return new Point(this);
	};
Point.prototype.offset = function(dx,dy) {
	this.x+=dx; this.y+=dy;
	};
Point.prototype.set = function(a) {
	this.x=a.x;
	this.y=a.y;
	this.id=(a.id!==undefined)?a.id:0;
	};
Point.prototype.compare = function(other,strict) {
	return this.x==other.x && this.y==other.y && (!strict || this.id==other.id);
	};

// Segment object
function Segment(a,b) {
	this.ptA = new Point(a);
	this.ptB = new Point(b);
	}
Segment.prototype.toString = function() {
	return "["+this.ptA+","+this.ptB+"]";
	};
Segment.prototype.compare = function(other) {
	return (this.ptA.compare(other.ptA) && this.ptB.compare(other.ptB)) || (this.ptA.compare(other.ptB) && this.ptB.compare(other.ptA));
	};

// Bounding box object
function Bbox(a,b,c,d) {
	// a=x1,b=y1,c=x2,d=y2
	if (d!==undefined) {
		this.tl=new Point({x:a,y:b});
		this.br=new Point({x:c,y:d});
		}
	// a=Point or {x:?,y:?},b=Point or {x:?,y:?}
	else if (b!==undefined) {
		var mn=Math.min;
		var mx=Math.max;
		this.tl=new Point({x:mn(a.x,b.x),y:mn(a.y,b.y)});
		this.br=new Point({x:mx(a.x,b.x),y:mx(a.y,b.y)});
		}
	// a=Bbox or {tl:{x:?,y:?},br:{x:?,y:?}}
	else if (a) {
		this.tl=new Point(a.tl);
		this.br=new Point(a.br);
		}
	// empty
	else {
		this.tl=new Point();
		this.br=new Point();
		}
	}
Bbox.prototype.toString = function() {
	return "{tl:"+this.tl+",br:"+this.br+"}";
	};
Bbox.prototype.clone = function() {
	return new Bbox(this);
	};
Bbox.prototype.getTopleft = function() {
	return new Point(this.tl);
	};
Bbox.prototype.getBottomright = function() {
	return new Point(this.br);
	};
Bbox.prototype.unionPoint = function(p) {
	var mn=Math.min;
	var mx=Math.max;
	this.tl.x=mn(this.tl.x,p.x);
	this.tl.y=mn(this.tl.y,p.y);
	this.br.x=mx(this.br.x,p.x);
	this.br.y=mx(this.br.y,p.y);
	};
Bbox.prototype.unionPoints = function(a) {
	// assume array of values
	if (a instanceof Array) {
		var mx=self.Math.max;
		var mn=self.Math.min;
		var x; var y;
		for (var i=0; i<a.length; i+=2) {
			x=a[i]; y=a[i+1];
			this.tl.x=mn(this.tl.x,x);
			this.tl.y=mn(this.tl.y,y);
			this.br.x=mx(this.br.x,x);
			this.br.y=mx(this.br.y,y);
			}
		}
	};
Bbox.prototype.width = function() {
	return this.br.x-this.tl.x;
	};
Bbox.prototype.height = function() {
	return this.br.y-this.tl.y;
	};
Bbox.prototype.offset = function(dx,dy) {
	this.tl.offset(dx,dy);
	this.br.offset(dx,dy);
	};
Bbox.prototype.set = function(a) {
	if (a) {
		if (a instanceof Array) {
			// array of Points
			if (a.length>0) {
				var mx=self.Math.max;
				var mn=self.Math.min;
				var i;
				if (a[0].x!==undefined) {
					this.tl.x=this.br.x=a[0].x;
					this.tl.y=this.br.y=a[0].y;
					var p;
					for (i=1; i<a.length; i++) {
						p=a[i];
						this.tl.x=mn(this.tl.x,p.x);
						this.tl.y=mn(this.tl.y,p.y);
						this.br.x=mx(this.br.x,p.x);
						this.br.y=mx(this.br.y,p.y);
						}
					}
				// assume array of values
				else {
					var x; var y;
					for (i=0; i<a.length; i+=2) {
						x=a[i]; y=a[i+1];
						this.tl.x=mn(this.tl.x,x);
						this.tl.y=mn(this.tl.y,y);
						this.br.x=mx(this.br.x,x);
						this.br.y=mx(this.br.y,y);
						}
					}
				}
			}
		}
	};
Bbox.prototype.pointIn = function(p) {
	return p.x>this.tl.x && p.x<this.br.x && p.y>this.tl.y && p.y<this.br.y;
	};
Bbox.prototype.doesIntersect = function(bb) {
	var mn=self.Math.min;
	var mx=self.Math.max;
	var retorno = (mn(bb.br.x,this.br.x)-mx(bb.tl.x,this.tl.x))>0 && (mn(bb.br.y,this.br.y)-mx(bb.tl.y,this.tl.y))>0
	//console.log(retorno);
	return retorno;
	};
Bbox.prototype.union = function(other) {
	// this bbox is empty
	if (this.isEmpty()) {
		this.tl=new Point(other.tl);
		this.br=new Point(other.br);
		}
	// union only if other bbox is not empty
	else if (!other.isEmpty()) {
		var mn=self.Math.min;
		var mx=self.Math.max;
		this.tl.x=mn(this.tl.x,other.tl.x);
		this.tl.y=mn(this.tl.y,other.tl.y);
		this.br.x=mx(this.br.x,other.br.x);
		this.br.y=mx(this.br.y,other.br.y);
		}
	return this;
	};
Bbox.prototype.inflate = function(a) {
	this.tl.x-=a;
	this.tl.y-=a;
	this.br.x+=a;
	this.br.y+=a;
	};
Bbox.prototype.isEmpty = function() {
	return this.width()<=0 || this.height()<=0;
	};
Bbox.prototype.toCanvasPath = function(ctx) {
	ctx.rect(this.tl.x,this.tl.y,this.width(),this.height());
	};

// Region object (collection of [todo:non-overlapping] bounding boxes
function Region() {
	this.bboxes=[];
	}
Region.prototype.add = function(tl,br) {
	this.bboxes.push(new Bbox(tl,br));
	};
Region.prototype.fill = function(ctx,fillStyle,clip) {
	ctx.fillStyle=fillStyle;
	for (var i=0; i<this.bboxes.length; i++) {
		var bbox=this.bboxes[i];
		if (clip===undefined || !clip || bbox.doesIntersect(clip)) {
			ctx.fillRect(bbox.tl.x,bbox.tl.y,bbox.width(),bbox.height());
			}
		}
	};

// Bezier object
function Bezier(a) {
	Array.call(this);
	if (a instanceof Array) {
		this[0]=a[0]; // cx1
		this[1]=a[1]; // cy1
		this[2]=a[2]; // cx2
		this[3]=a[3]; // cy2
		this[4]=a[4]; // x
		this[5]=a[5]; // y
		}
	}
Bezier.prototype=[];

// Profile object
function Profile(a) {
	this.beziers=[];
	if (a) {
		if (a.beziers!==undefined) {
			var beziers=a.beziers;
			var nBeziers=beziers.length;
			for (var iBezier=0; iBezier<nBeziers; iBezier++) {
				this.beziers.push(new Bezier(beziers[iBezier]));
				}
			}
		}
	}
Profile.prototype.getBboxConst = function() {
	if (!this.bbox) {
		var beziers=this.beziers;
		var nBeziers=beziers.length;
		if (nBeziers>0){
			this.bbox=new Bbox();
			this.bbox.set(beziers[0]);
			for (var iBezier=1; iBezier<nBeziers; iBezier++) {
				this.bbox.unionPoints(beziers[iBezier]);
				}
			}
		else {
			this.bbox=new Bbox();
			}
		}
	return this.bbox;
	};
Profile.prototype.getBbox = function() {
	return new Bbox(this.getBboxConst());
	};
Profile.prototype.complement = function() {
	var r=new Profile(this);
	// Just a matter of (normalized profiles required):
	// * vertical flip = sign inversion of Y
	// * horizontal flip = 1024 minus X
	// * for each bezier curve:
	//   * swap control point 1 with control point 2
	//   * the point is taken from the previous curve
	// * reverse order of the beziers in the array
	// This way we end up with a mirror curve which is
	// still drawn from pt A to pt B
	var beziers=r.beziers;
	var nBeziers=beziers.length;
	var bezier;
	var nx; var ny;
	var x=1024; var y=0;
	for (var iBezier=0; iBezier<nBeziers; iBezier++) {
		bezier=beziers[iBezier];
		nx=bezier[4];
		ny=bezier[5];
		bezier[4]=x;
		bezier[5]=y;
		x=1024-bezier[0];
		y=-bezier[1];
		bezier[0]=1024-bezier[2];
		bezier[1]=-bezier[3];
		bezier[2]=x;
		bezier[3]=y;
		x=1024-nx;
		y=-ny;
		}
	beziers.reverse();
	return r;
	};
Profile.prototype.transform = function(ptA,ptB) {
	var r=new Profile();
	var round=self.Math.round;
	// first we need to find the scaling factor, dependent on the length
	// of the line defined by ptA-ptB (normalized profiles are drawn in a
	// 1024x1024px world, origin at (0,0)
	var scale=self.Math.sqrt(self.Math.pow(ptB.x-ptA.x,2)+self.Math.pow(ptB.y-ptA.y,2))/1024;
	// Then we need to find the angle of the line defined by ptA-ptB
	var angle=self.Math.atan2(ptB.y-ptA.y,ptB.x-ptA.x);
	// now transform each point
	var cosang=self.Math.cos(angle);
	var sinang=self.Math.sin(angle);
	var beziers=this.beziers;
	var nBeziers=beziers.length;
	var bezier;
	var cx1; var cy1; var cx2; var cy2; var x; var y;
	for (var iBezier=0; iBezier<nBeziers; iBezier++) {
		bezier=beziers[iBezier];
		x=bezier[0]*scale;
		y=bezier[1]*scale;
		cx1=round(x*cosang-y*sinang);
		cy1=round(x*sinang+y*cosang);
		x=bezier[2]*scale;
		y=bezier[3]*scale;
		cx2=round(x*cosang-y*sinang);
		cy2=round(x*sinang+y*cosang);
		x=bezier[4]*scale;
		y=bezier[5]*scale;
		r.beziers.push([cx1,cy1,cx2,cy2,round(x*cosang-y*sinang),round(x*sinang+y*cosang)]);
		}
	return r;
	};
Profile.prototype.toCanvas = function(ctx,ptA,ptB) {
	// special case: no profile
	if (!this.beziers.length) {
		ctx.lineTo(ptB.x,ptB.y);
		}
	// else apply profile
	else {
		var x0=ptA.x;
		var y0=ptA.y;
		var beziers=this.beziers;
		var nBeziers=beziers.length;
		var bezier;
		for (var iBezier=0; iBezier<nBeziers; iBezier++) {
			bezier=this.beziers[iBezier];
			ctx.bezierCurveTo(x0+bezier[0],y0+bezier[1],x0+bezier[2],y0+bezier[3],x0+bezier[4],y0+bezier[5]);
			}
		}
	};
// Built-in profiles
// Profiles must be built horizontally, along the top edge of a 1024x1024 tile, and must
// extend to the whole edge, expressly starting at the top-left corner (the origin=0,0)
// and ending at the top-right corner (1024,0). In between, all is allowed. I use GIMP,
// create a 1024x1024 canvas, then use the path tool to create a path in between (0,0) and
// (1024,0), and then export the path as an SVG file, and manually convert to JSON as seen
// below.
// Format: each member of the array is an
// array of integer value ordered as follow:
// [cx1,cy1,cx2,cy2,x,y]
Profile.prototype.stock={
	"straight":{
		beziers:[
			[0,0,1024,0,1024,0]
			]
		},
	"classic":{
		beziers:[
			[0,0,448,-224,448,-96],
			[448,-32,384,-32,384,64],
			[384,160,448,192,512,192],
			[576,192,640,160,640,64],
			[640,-32,576,-32,576,-96],
			[576,-224,1024,0,1024,0]
			]
		},
	"wave":{
		beziers:[
			[128,128,192,-96,320,0],
			[352,32,224,96,256,128],
			[448,224,576,-224,768,-128],
			[800,-96,672,-32,704,0],
			[832,96,896,-128,1024,0]
			]
		},
	"tenon":{
		beziers:[
			[0,0,224,0,224,0],
			[224,0,224,192,224,192],
			[224,192,416,192,416,192],
			[416,192,416,0,416,0],
			[416,0,608,0,608,0],
			[608,0,608,192,608,192],
			[608,192,800,192,800,192],
			[800,192,800,0,800,0],
			[800,0,1024,0,1024,0]
			]
		}
	};

// Profile randomizer object
function ProfileRandomizer(profileNormalized,allowComplement,wobbleFactor) {
	this.normalized=new Profile(profileNormalized);
	this.allowComplement=allowComplement;
	this.wobbleFactor=wobbleFactor!==undefined?wobbleFactor:0;
	}
ProfileRandomizer.prototype.randomize = function() {
	// 50% of returning complement
	var r;
	if (this.allowComplement && self.Math.random() >= 0.5) {
		r=this.normalized.complement();
		}
	else {
		r=new Profile(this.normalized);
		}
	// here, optionally wobbling points/control points around their normalized position
	return r;
	};

// Side object
function Side(a) {
	if (a) {
		if (a.ptA!==undefined && a.ptB!==undefined) {
			this.ptA=new Point(a.ptA);
			this.ptB=new Point(a.ptB);
			}
		this.profileNormalized=(a.profileNormalized!==undefined)?a.profileNormalized:new Profile(Profile.prototype.straight);
		}
	}
Side.prototype.clone = function() {
	return new Side(this);
	};
Side.prototype.complement = function() {
	var side=new Side();
	side.ptB=new Point(this.ptA);
	side.ptA=new Point(this.ptB);
	side.profileNormalized=this.profileNormalized.complement();
	return side;
	};
Side.prototype.startPointConst = function() {
	return this.ptA;
	};
Side.prototype.endPointConst = function() {
	return this.ptB;
	};
Side.prototype.offset = function(dx,dy) {
	this.ptA.offset(dx,dy);
	this.ptB.offset(dx,dy);
	if (this.bbox) {
		this.bbox.offset(dx,dy);
		}
	};
Side.prototype.sync = function() {
	if (!this.profile) {
		this.profile=this.profileNormalized.transform(this.ptA,this.ptB);
		}
	};
Side.prototype.getBboxConst = function() {
	if (!this.bbox) {
		if (!this.profile) {this.sync();}
		this.bbox=this.profile.getBbox();
		this.bbox.offset(this.ptA.x,this.ptA.y);
		// a side is always at least one pixel wide or high due to
		// profile which in the simplest case is a single 1-pixel-thick line
		if (this.bbox.width()===0) {
			// cases: |  ^
			//        V  |
			if (this.ptA.y<this.ptB.y) {
				this.bbox.tl.x--;
				}
			else {
				this.bbox.br.x++;
				}
			}
		else if (this.bbox.height()===0) {
			// cases: -->  <--
			if (this.ptA.x<this.ptB.x) {
				this.bbox.br.y++;
				}
			else {
				this.bbox.tl.y--;
				}
			}
		}
	return this.bbox;
	};
Side.prototype.getBbox = function() {
	return new Bbox(this.getBboxConst());
	};
Side.prototype.rotate = function(angle,x0,y0,cosang,sinang) {
	if (cosang===undefined) {cosang=self.Math.cos(angle);}
	if (sinang===undefined) {sinang=self.Math.sin(angle);}
	var round=self.Math.round;
	var x=this.ptA.x-x0;
	var y=this.ptA.y-y0;
	this.ptA.x=round(x*cosang-y*sinang)+x0;
	this.ptA.y=round(x*sinang+y*cosang)+y0;
	x=this.ptB.x-x0;
	y=this.ptB.y-y0;
	this.ptB.x=round(x*cosang-y*sinang)+x0;
	this.ptB.y=round(x*sinang+y*cosang)+y0;
	// invalidate cached vars
	delete this.profile;
	delete this.bbox;
	};
Side.prototype.toCanvas = function(ctx) {
	if (!this.profile) {this.sync();}
	this.profile.toCanvas(ctx,this.ptA,this.ptB);
	};
Side.prototype.draw3dEdge = function(ctx) {
	if (!this.profile) {this.sync();}
	// Draw each bezier segment making up the profile, with a color which
	// depends of the slope of the bezier segment.
	// for a 3d effect. This is of course an approximation, as I don't
	// control the drawing of the bezier curve itself.
	// At this point, it is assumed that the caller has set line style/alpha.
	var abs=self.Math.abs;
	var rnd=self.Math.round;
	var atan=self.Math.atan2;
	var beziers=this.profile.beziers;
	var nBeziers=beziers.length;
	var ptA=this.ptA;
	var x0=ptA.x;
	var y0=ptA.y;
	var xa=0; var ya=0; var xb; var yb;
	var bezier; var dx; var dy; var g;
	for (var iBezier=0; iBezier<nBeziers; iBezier++) {
		bezier=beziers[iBezier];
		// we rotate the segment backward 45 deg, this allow the light
		// source to be located top-left otherwise it would be located
		// left
		// we precalculate as much as we can for performance
		// cos(-PI/4)=0.70710678 and sin(-PI/4)=-0.70710678
		// dx,dy represent the rotated slope parameters as per
		// m = (y2-y1)/(x2-x1)
		// sin(PI/4) = cos(PI/4) = 0.70710678118654752440084436210485
		// 255/PI = 81.169020976866621242130719319982
		xb=bezier[4];
		yb=bezier[5];
		dx=(xb-xa)*0.70710678;
		dy=(yb-ya)*0.70710678;
		g=abs(rnd(atan(dx+dy,dy-dx)*81.16902098));
		g=(g<16)?"0"+g.toString(16):g.toString(16);
		ctx.strokeStyle="#"+g+g+g;
		ctx.beginPath();
		ctx.moveTo(x0+xa,y0+ya);
		ctx.bezierCurveTo(x0+bezier[0],y0+bezier[1],x0+bezier[2],y0+bezier[3],x0+xb,y0+yb);
		ctx.stroke();
		xa=xb; ya=yb;
		}
	};

// Contour object, a collection of points forming a closed figure
// Clockwise = filled, counterclockwise = hollow
function Contour(a) {
	this.sides=[]; // no sides
	if (a) {
		var iSide; var nSides;
		if (a instanceof Contour) {
			var sides = a.sides;
			nSides = sides.length;
			for (iSide=0; iSide<nSides; iSide++) {
				this.sides.push(new Side(sides[iSide]));
				}
			if (a.bbox) {
				this.bbox=a.bbox.clone();
				}
			this.area=a.area;
			this.hole=a.hole;
			}
		else if (a instanceof Array) {
			nSides=a.length;
			for (iSide=0; iSide<nSides; iSide++) {
				this.sides.push(new Side(a[iSide]));
				}
			}
		else {
			alert("Contour ctor: Unknown arg 'a'");
			}
		}
	}
Contour.prototype.clone = function() {
	return new Contour(this);
	};
Contour.prototype.addSide = function(side) {
	this.sides.push(new Side(side));
	delete this.bbox;
	delete this.area;
	delete this.hole;
	};
Contour.prototype.getBbox = function() {
	return new Bbox(this.getBboxConst());
	};
Contour.prototype.getBboxConst = function() {
	if (!this.bbox) {
		this.bbox=new Bbox();
		var sides=this.sides;
		var nSides=sides.length;
		for (var iSide=0; iSide<nSides; iSide++) {
			this.bbox.union(sides[iSide].getBboxConst());
			}
		}
	return this.bbox;
	};
Contour.prototype.offset = function(dx,dy) {
	var sides=this.sides;
	var nSides=sides.length;
	for (var iSide=0; iSide<nSides; iSide++) {
		sides[iSide].offset(dx,dy);
		}
	if ( this.bbox ) {
		this.bbox.offset(dx,dy);
		}
	};
Contour.prototype.isHollow = function() {
	// A hole will have a negative surface area as per:
	// http://local.wasp.uwa.edu.au/~pbourke/geometry/polyarea/ by Paul Bourke
	// Since I started this project before I started to care about areas of polygons,
	// and that originally I described my contours with clockwise serie of points, filled
	// contour are currently represented with negative area, while hollow contour are
	// represented with positive area. Something to keep in mind.
	if (this.hole===undefined) {
		this.hole=(this.getArea()>0);
		}
	return this.hole;
	};
Contour.prototype.getArea = function() {
	// http://local.wasp.uwa.edu.au/~pbourke/geometry/polyarea/ by Paul Bourke
	// Quote: "for this technique to work is that the polygon must not be self intersecting"
	// Fine with us, that will never happen (unless there is a bug)
	// Quote: "the holes areas will be of opposite sign to the bounding polygon area"
	// This is great, just by calculating the area, we determine wether the contour
	// is hollow or filled. Moreover, by adding up the areas of all contours describing
	// a polygon, we find whether or not a polygon is mostly hollow or mostly filled,
	// useful to implement display performance enhancement strategies.
	if (this.area===undefined) {
		var area=0;
		var sides=this.sides;
		var nSides=sides.length;
		var side; var ptA; var ptB;
		for (var iSide=0; iSide<nSides; iSide++) {
			side=sides[iSide];
			ptA=side.ptA;
			ptB=side.ptB;
			area+=ptA.x*ptB.y;
			area-=ptA.y*ptB.x;
			}
		this.area=area/2;
		}
	return this.area;
	};
Contour.prototype.rotate = function(angle,x0,y0,cosang,sinang) {
	if (cosang===undefined) {cosang=self.Math.cos(angle);}
	if (sinang===undefined) {sinang=self.Math.sin(angle);}
	var sides=this.sides;
	var nSides=sides.length;
	for (var iSide=0; iSide<nSides; iSide++) {
		sides[iSide].rotate(angle,x0,y0,cosang,sinang);
		}
	delete this.bbox; // no longer valid
	};
Contour.prototype.toCanvas = function(ctx) {
	var sides=this.sides;
	var nSides=sides.length;
	if (nSides===0) {return;}
	// begin new canvas path
	var pt=sides[0].ptA;
	ctx.moveTo(pt.x,pt.y);
	// then connect all sides to it
	for (var iSide=0; iSide<nSides; iSide++) {
		sides[iSide].toCanvas(ctx);
		}
	ctx.closePath();
	};
Contour.prototype.draw3dEdge = function(ctx) {
	var sides=this.sides;
	var nSides=sides.length;
	for (var iSide=0; iSide<nSides; iSide++) {
		sides[iSide].draw3dEdge(ctx);
		}
	};

// Polygon object, a collection of Contour objects
function Polygon(a) {
	this.contours=[]; // no contour
	if (a) {
		if (a instanceof Polygon) {
			var contours = a.contours;
			var nContours = contours.length;
			for ( var iContour=0; iContour<nContours; iContour++ ) {
				this.contours.push(new Contour(contours[iContour]));
				}
			if ( this.bbox ) {
				this.bbox = a.bbox.clone();
				}
			this.area = a.area;
			if ( this.centroid ) {
				this.centroid = a.centroid.clone();
				}
			this.mostlyHollow = a.mostlyHollow;
			}
		else if (a instanceof Array) {
			this.contours.push(new Contour(a));
			}
		else {
			alert("Polygon ctor: Unknown arg 'a'");
			}
		}
	}
Polygon.prototype.clone = function() {
	return new Polygon(this);
	};
Polygon.prototype.getBbox = function() {
	if (!this.bbox) {
		this.bbox=new Bbox();
		var contours=this.contours;
		var nContours=contours.length;
		for (var iContour=0; iContour<nContours; iContour++) {
			this.bbox.union(contours[iContour].getBboxConst());
			}
		}
	return this.bbox.clone();
	};
Polygon.prototype.getArea = function() {
	// We addup the area of all our contours.
	// Contours representing holes will have a negative area.
	if (!this.area) {
		var area=0;
		var contours=this.contours;
		var nContours=contours.length;
		for (var iContour=0; iContour<nContours; iContour++) {
			area+=contours[iContour].getArea();
			}
		this.area=area;
		}
	return this.area;
	};
Polygon.prototype.getCentroid = function() {
	if (!this.centroid) {
		var contours=this.contours;
		var nContours=contours.length;
		var sides; var nSides;
		var x=0; var y=0;
		var iSide; var side; var ptA; var ptB; var f;
		for (var iContour=0; iContour<nContours; iContour++) {
			sides=contours[iContour].sides;
			nSides=sides.length;
			// http://local.wasp.uwa.edu.au/~pbourke/geometry/polyarea/ by Paul Bourke
			for (iSide=0; iSide<nSides; iSide++) {
				side=sides[iSide];
				ptA=side.ptA;
				ptB=side.ptB;
				f=ptA.x*ptB.y-ptB.x*ptA.y;
				x+=(ptA.x+ptB.x)*f;
				y+=(ptA.y+ptB.y)*f;
				}
			}
		f=this.getArea()*6;
		// centroid relative to self bbox
		var origin=this.getBbox().getTopleft();
		var rnd=self.Math.round;
		this.centroid=new Point({x:rnd(x/f-origin.x),y:rnd(y/f-origin.y)});
		}
	return this.centroid.clone();
	};
Polygon.prototype.pointIn = function(p) {
	alert("Polygon.prototype.pointIn: No longer supported");
	};
Polygon.prototype.offset = function(dx,dy) {
	var contours=this.contours;
	var nContours=contours.length;
	for (var iContour=0; iContour<nContours; iContour++) {
		contours[iContour].offset(dx,dy);
		}
	if (this.bbox) {
		this.bbox.offset(dx,dy);
		}
	if (this.centroid) {
		this.centroid.offset(dx,dy);
		}
	};
Polygon.prototype.moveto = function(x,y) {
	// position is centroid
	var centroid=this.getCentroid();
	var tl=this.getBbox().getTopLeft();
	this.offset(x-tl.x-centroid.x,y-tl.y-centroid.y);
	};
Polygon.prototype.rotate = function(angle,x0,y0) {
	var cosang=self.Math.cos(angle);
	var sinang=self.Math.sin(angle);
	var contours=this.contours;
	var nContours=contours.length;
	for (var iContour=0; iContour<nContours; iContour++) {
		contours[iContour].rotate(angle,x0,y0,cosang,sinang);
		}
	delete this.bbox; // no longer valid
	delete this.centroid; // no longer valid (since it's relative to self bbox
	};
Polygon.prototype.doesIntersect = function(bbox) {
	return this.getBbox().doesIntersect(bbox);
	};
Polygon.prototype.isMostlyHollow = function() {
	if (this.mostlyHollow===undefined) {
		// we add up all solid and hollow contours and
		// compare the result to determine whether this
		// polygon is mostly solid or hollow
		var areaSolid=0;
		var areaHollow=0;
		var contours=this.contours;
		var nContours=contours.length;
		var area;
		for (var iContour=0; iContour<nContours; iContour++) {
			area=contours[iContour].getArea();
			if (area < 0) {
				areaSolid+=area;
				}
			else {
				areaHollow+=area;
				}
			}
		this.mostlyHollow=(areaHollow>areaSolid);
		}
	return this.mostlyHollow;
	};
Polygon.prototype.getSides = function() {
	var r=[];
	var contours=this.contours;
	var nContours=contours.length;
	var contour; var sides; var nSides; var iSide;
	for (var iContour=0; iContour<nContours; iContour++) {
		contour=contours[iContour];
		sides=contour.sides;
		nSides=sides.length;
		for (iSide=0; iSide<nSides; iSide++) {
			r.push(new Side(sides[iSide]));
			}
		}
	return r;
	};
Polygon.prototype.getSidesConst = function() {
	var r=[];
	var contours=this.contours;
	var nContours=contours.length;
	var contour; var sides; var nSides; var iSide;
	for (var iContour=0; iContour<nContours; iContour++) {
		contour=contours[iContour];
		sides=contour.sides;
		nSides=sides.length;
		for (iSide=0; iSide<nSides; iSide++) {
			r.push(sides[iSide]);
			}
		}
	return r;
	};
Polygon.prototype.merge = function(others) {
	// Simply put, this algorithm XOR each side of
	// a polygon with each side of other polygons.
	// This means we delete any side which appear an
	// even number of time. Whatever sides are left in the
	// collection are connected together to form one or more
	// contour.
	// Of course, this works because we know we are working
	// with polygons which are perfectly adjacent and never
	// overlapping.
	// A nice side-effect of the current algorithm is that
	// we do not need to know expressly which contours are full
	// and which are holes: The contours created will automatically
	// have a clockwise/counterclockwise direction such that they
	// fits exactly the non-zero winding number rule used by the
	// <canvas> element, thus suitable to be used as is for
	// clipping and complex polygon filling.
	// TODO: write an article to illustrate exactly how this work.
	// TODO: handle special cases here (ex. empty polygon, etc)

	// A Javascript object can be used as an associative array, but
	// they are not real associative array, as there is no way
	// to query the number of entries in the object. For this
	// reason, we maintain an element counter ourself.
	var pool={};
	var contours=this.contours;
	var nContours=contours.length;
	var sides; var nSides; var iSide; var side;
	var idA; var idB;
	for (var iContour=0; iContour<nContours; iContour++) {
		sides=contours[iContour].sides;
		nSides=sides.length;
		for (iSide=0; iSide<nSides; iSide++) {
			side=sides[iSide];
			idA=side.ptA.toHashkey();
			idB=side.ptB.toHashkey();
			if (!pool[idA]) {
				pool[idA]={n:1,sides:{}};
				}
			else {
				pool[idA].n++;
				}
			pool[idA].sides[idB]=side;
			}
		}
	// enumerate sides in other's contours, eliminate duplicate
	var nPolygons=others.length;
	for (var iPolygon=0; iPolygon<nPolygons; iPolygon++) {
		contours=others[iPolygon].contours;
		nContours=contours.length;
		for (iContour=0; iContour<nContours; iContour++) {
			sides=contours[iContour].sides;
			nSides=sides.length;
			for (iSide=0; iSide<nSides; iSide++) {
				side=sides[iSide];
				idA=side.ptA.toHashkey();
				idB=side.ptB.toHashkey();
				// duplicate (we eliminate same segment in reverse direction)
				if (pool[idB] && pool[idB].sides[idA]) {
					delete pool[idB].sides[idA];
					if (!--pool[idB].n) {
						delete pool[idB];
						}
					}
				// not a duplicate
				else {
					if (!pool[idA]) {
						pool[idA]={n:1,sides:{}};
						}
					else {
						pool[idA].n++;
						}
					pool[idA].sides[idB]=side;
					}
				}
			}
		}
	// recreate and store new contours by jumping from one side to the next,
	// using the second point of the side as hash key for next side
	this.contours=[]; // regenerate new contours
	var contour;
	for (idA in pool) { // we need this to get a starting point for a new contour
		contour = new Contour();
		this.contours.push(contour);
		for (idB in pool[idA].sides) {break;}
		side=pool[idA].sides[idB];
		while (side) {
			contour.addSide(side);
			// remove from collection since it has now been used
			delete pool[idA].sides[idB];
			if (!--pool[idA].n) {
				delete pool[idA];
				}
			idA=side.ptB.toHashkey();
			if (pool[idA]) {
				for (idB in pool[idA].sides) {break;} // any end point will do
				side=pool[idA].sides[idB];
				}
			else {
				side=null;
				}
			}
		}
	// invalidate cached values
	delete this.bbox;
	delete this.area;
	delete this.centroid;
	delete this.mostlyHollow;
	};
Polygon.prototype.toCanvasPath = function(ctx) {
	var contours=this.contours;
	var nContours=contours.length;
	for (var iContour=0; iContour<nContours; iContour++) {
		contours[iContour].toCanvas(ctx);
		}
	};
Polygon.prototype.draw3dEdge = function(ctx) {
	var contours=this.contours;
	var nContours=contours.length;
	for (var iContour=0; iContour<nContours; iContour++) {
		contours[iContour].draw3dEdge(ctx);
		}
	};

/**
  Puzzle tile base class
 */
function PuzzleTile() {
	this.polygon = null;
	}
PuzzleTile.prototype.setPolygon = function(sides) {
	if (!this.polygon) {
		this.polygon = new Polygon(sides);
		}
	};
PuzzleTile.prototype.getBbox = function() {
	return this.polygon.getBbox();
	};
PuzzleTile.prototype.getCentroid = function() {
	return this.polygon.getCentroid();
	};
PuzzleTile.prototype.getPolygon = function() {
	return this.polygon.clone();
	};
PuzzleTile.prototype.getPolygonSides = function() {
	return this.polygon.getSides();
	};
PuzzleTile.prototype.getPolygonSidesConst = function() {
	return this.polygon.getSidesConst();
	};
PuzzleTile.prototype.merge = function(others) {
	// build polygons array
	var polygons=[];
	var nOthers=others.length;
	for (var iOther=0; iOther<nOthers; iOther++) {
		polygons.push(others[iOther].polygon);
		}
	this.polygon.merge(polygons);
	};


/**
  Source tile descriptor
 */
function PuzzleSourceTile(img) {
	PuzzleTile.call(this);
	this.sImage = img;
	}
PuzzleSourceTile.prototype = new PuzzleTile();
PuzzleSourceTile.prototype.getSourceImage = function() {
	return this.sImage;
	};

/**
  Transient tile descriptor
 */
function PuzzleTransientTile(sTile) {
	PuzzleTile.call(this);
	this.sTile = sTile;
	this.angleStep = 0;
	this.angleMaxSteps = 1; // default = no rotation
	this.angleRadians = 6.28318530718; // precalculated angle in radians for performance purpose
	}
PuzzleTransientTile.prototype = new PuzzleTile();
PuzzleTransientTile.prototype.getAngleStep = function() {
	return this.angleStep;
	};
PuzzleTransientTile.prototype.setAngleStep = function(step,maxSteps) {
	// quantize max steps into a factor of 360
	if (maxSteps !== undefined) {
		this.angleMaxSteps = 360/self.Math.round(360/self.Math.min(self.Math.max(maxSteps,1),90));
		}
	// ensure step is within range
	this.angleStep=step%this.angleMaxSteps;
	if (this.angleStep < 0) {
		this.angleStep+=this.angleMaxSteps;
		}
	// precalculate angle in radian: 2PI*step/maxsteps
	this.angleRadians=6.28318530718*this.angleStep/this.angleMaxSteps;
	this.tImage=null; // invalidate internal state
	};
PuzzleTransientTile.prototype.sync = function() {
	if (!this.tImage) {
		this.tImage=self.document.createElement('canvas');
		// we need to find out the bbox of the rotated source
		// in order to know the required image size
		this.polygon=this.sTile.polygon.clone();
		var sBbox=this.sTile.getBbox();
		var sTopleft=sBbox.getTopleft();
		var sCentroid=this.sTile.getCentroid();
		// rotate
		this.polygon.rotate(this.angleRadians,sTopleft.x+sCentroid.x,sTopleft.y+sCentroid.y);
		// post-rotation bbox different from pre-
		var tBbox=this.polygon.getBbox();
		var tTopleft=tBbox.getTopleft();
		// set origin to self
		this.polygon.offset(-tTopleft.x,-tTopleft.y);
		var tCentroid=this.polygon.getCentroid();
		this.tImage.width=tBbox.width();
		this.tImage.height=tBbox.height();
		// transfer/rotate source tile image
		var ctx=this.tImage.getContext('2d');
		// first, set the clipping region as per contours
		ctx.save();
		ctx.beginPath();
		this.polygon.toCanvasPath(ctx);
		ctx.clip();
		// copy/rotate source image into local buffer
		ctx.save();
		if ( this.angleStep ) {
			ctx.translate(tCentroid.x,tCentroid.y);
			ctx.rotate(this.angleRadians);
			ctx.translate(-tCentroid.x,-tCentroid.y);
			}
		ctx.drawImage(this.sTile.getSourceImage(),sTopleft.x,sTopleft.y,sBbox.width(),sBbox.height(),tCentroid.x-sCentroid.x,tCentroid.y-sCentroid.y,sBbox.width(),sBbox.height());
		ctx.restore();
		// draw '3d' edges around the piece
		ctx.globalAlpha=0.9;
		ctx.lineWidth=1;
		this.polygon.draw3dEdge(ctx);
		ctx.restore();
		}
	};
PuzzleTransientTile.prototype.getPolygon = function() {
	// we need to overload since our image is valid only when we are in sync with source tile
	if (!this.tImage) {this.sync();}
	return PuzzleTile.prototype.getPolygon.call(this);
	};
PuzzleTransientTile.prototype.getPolygonSides = function() {
	if (!this.tImage) {this.sync();}
	return PuzzleTile.prototype.getPolygonSides.call(this);
	};
PuzzleTransientTile.prototype.getPolygonSidesConst = function() {
	if (!this.tImage) {this.sync();}
	return PuzzleTile.prototype.getPolygonSidesConst.call(this);
	};
PuzzleTransientTile.prototype.getTransientImage = function() {
	// we need to overload since our image is valid only when we are in sync with source tile
	if (!this.tImage) {this.sync();}
	return this.tImage;
	};
PuzzleTransientTile.prototype.getBbox = function() {
	// we need to overload since our bbox is valid only when we are in sync with source tile
	if (!this.tImage) {this.sync();}
	return PuzzleTile.prototype.getBbox.call(this);
	};
PuzzleTransientTile.prototype.getCentroid = function() {
	// we need to overload since our poly is valid only when we are in sync with source tile
	if (!this.tImage) {this.sync();}
	return PuzzleTile.prototype.getCentroid.call(this);
	};
PuzzleTransientTile.prototype.pointIn = function(p) {
	if (!this.tImage) {this.sync();}
	// HTML canvas has a nice function to test whether a point
	// lies inside a polygon, lets use it
	var r=false;
	var ctx=this.tImage.getContext('2d');
	ctx.save();
	ctx.beginPath();
	var contours=this.polygon.contours;
	var nContours=contours.length;
	for (var iContour=0; iContour<nContours; iContour++) {
		contours[iContour].toCanvas(ctx);
		}
	r=ctx.isPointInPath(p.x,p.y);
	ctx.restore();
	return r;
	};
PuzzleTransientTile.prototype.merge = function(others) {
	// build source tiles array
	var sTiles=[];
	var nOthers=others.length;
	for (var iOther=0; iOther<nOthers; iOther++) {
		sTiles.push(others[iOther].sTile);
		}
	this.sTile.merge(sTiles);
	this.tImage = null;
	};

/**
  Display tile descriptor
 */
function PuzzleDisplayTile(tTile) {
	PuzzleTile.call(this);
	this.tTile=tTile;
	this.dPos=new Point();
	}
PuzzleDisplayTile.prototype = new PuzzleTile();
PuzzleDisplayTile.prototype.getDisplayPos = function() {
	return new Point(this.dPos);
	};
PuzzleDisplayTile.prototype.setDisplayPos = function(x,y) {
	var dx=x-this.dPos.x;
	var dy=y-this.dPos.y;
	this.dPos.set({x:x,y:y});
	if (this.polygon) {
		this.polygon.offset(dx,dy);
		}
	if (this.bbox) {
		this.bbox.offset(dx,dy);
		}
	};
PuzzleDisplayTile.prototype.getDisplayImage = function() {
	// the display image is the same as the transient image
	return this.tTile.getTransientImage();
	};
PuzzleDisplayTile.prototype.getAngleStep = function() {
	return this.tTile.getAngleStep();
	};
PuzzleDisplayTile.prototype.setAngleStep = function(step,maxSteps) {
	// pass call down to the transient tile and invalid self
	this.tTile.setAngleStep(step,maxSteps);
	delete this.polygon;
	delete this.bbox;
	};
PuzzleDisplayTile.prototype.sync = function() {
	if (!this.polygon) {
		this.polygon=this.tTile.getPolygon();
		// shift to screen position
		var tCentroid=this.tTile.getCentroid();
		this.polygon.offset(this.dPos.x-tCentroid.x,this.dPos.y-tCentroid.y);
		}
	};
PuzzleDisplayTile.prototype.getPolygonSides = function() {
	if (!this.polygon) {this.sync();}
	return PuzzleTile.prototype.getPolygonSides.call(this);
	};
PuzzleDisplayTile.prototype.getPolygonSidesConst = function() {
	if (!this.polygon) {this.sync();}
	return PuzzleTile.prototype.getPolygonSidesConst.call(this);
	};
PuzzleDisplayTile.prototype.getBbox = function() {
	return new Bbox(this.getBboxConst());
	};
PuzzleDisplayTile.prototype.getBboxConst = function() {
	// we need to overload since our bbox is valid only when we are in sync with transient tile
	if (!this.bbox) {
		if (!this.polygon) {this.sync();}
		this.bbox=PuzzleTile.prototype.getBbox.call(this);
		}
	return this.bbox;
	};
PuzzleDisplayTile.prototype.getCentroid = function() {
	// we need to overload since our poly is valid only when we are in sync with transient tile
	if (!this.polygon) {this.sync();}
	return PuzzleTile.prototype.getCentroid.call(this);
	};
PuzzleDisplayTile.prototype.pointIn = function(p) {
	// coarse test first (this improves performance significantly)
	if (this.getBboxConst().pointIn(p)) {
		// don't forget to convert point to transient tile coords
		// before propagating call
		var dPos=this.getBbox().getTopleft();
		return this.tTile.pointIn(new Point({x:p.x-dPos.x,y:p.y-dPos.y}));
		}
	return false;
	};
PuzzleDisplayTile.prototype.merge = function(others) {
	// build transient tiles array
	var tTiles=[];
	var nOthers=others.length;
	for (var iOther=0; iOther<nOthers; iOther++) {
		tTiles.push(others[iOther].tTile);
		}
	this.tTile.merge(tTiles);
	delete this.polygon;
	delete this.bbox;
	};
PuzzleDisplayTile.prototype.isMostlyHollow = function() {
	if (!this.polygon) {this.sync();}
	return this.polygon.isMostlyHollow();
	};

/**
 Puzzle part
 */
function PuzzlePart() {
	}

// Puzzle piece
function PuzzlePiece(id,sides,img) {
	this.id=id;
	this.sTile=new PuzzleSourceTile(img);
	this.sTile.setPolygon(sides);
	this.tTile=new PuzzleTransientTile(this.sTile);
	this.dTile=new PuzzleDisplayTile(this.tTile);
	this.piece=true; // this is a puzzle piece
	PuzzlePart.call(this);
	}
PuzzlePiece.prototype = new PuzzlePart();
PuzzlePiece.prototype.getAngleStep = function() {
	return this.dTile.getAngleStep();
	};
PuzzlePiece.prototype.setAngleStep = function(step,numsteps) {
	this.dTile.setAngleStep(step,numsteps);
	};
PuzzlePiece.prototype.setDisplayPos = function(x,y) {
	this.dTile.setDisplayPos(x,y);
	};
PuzzlePiece.prototype.getDisplayPos = function() {
	return this.dTile.getDisplayPos();
	};
PuzzlePiece.prototype.getDisplayBbox = function() {
	return this.dTile.getBbox();
	};
PuzzlePiece.prototype.getDisplayBboxConst = function() {
	return this.dTile.getBboxConst();
	};
PuzzlePiece.prototype.draw = function(ctx) {
	var dImage=this.dTile.getDisplayImage();
	var dTopleft=this.dTile.getBbox().getTopleft();
	ctx.drawImage(dImage,dTopleft.x,dTopleft.y);
	};
PuzzlePiece.prototype.pointIn = function(p) {
	return this.dTile.pointIn(p);
	};
PuzzlePiece.prototype.isEdge = function() {
	return this.edge;
	};
PuzzlePiece.prototype.doesIntersect = function(bbox) {
	return bbox.doesIntersect(this.getDisplayBboxConst());
	};
PuzzlePiece.prototype.merge = function(others) {
	// build display tiles array
	var dTiles=[];
	var nOthers=others.length;
	var other;
	for (var iOther=0; iOther<nOthers; iOther++) {
		other=others[iOther];
		dTiles.push(other.dTile);
		this.edge=this.edge||other.edge;
		if (!this.composite) {
			this.composite=[this.id];
			}
		if (other.composite) {
			this.composite=this.composite.concat(other.composite);
			}
		else {
			this.composite.push(other.id);
			}
		}
	this.dTile.merge(dTiles);
	};
PuzzlePiece.prototype.snapPiece = function(other) {
	// do not snap with self..
	if (other.id==this.id) {return false;}
	// display angle steps must be the same
	if (other.getAngleStep()!=this.getAngleStep()) {return false;}
	// overall display bounding box, inflated as per tolerance, must intersect
	var dBbox=other.getDisplayBbox();
	dBbox.inflate(5); // within 5 pixels
	if (!dBbox.doesIntersect(this.getDisplayBboxConst())) {return false;}
	// we test each side of this piece against each side of the other piece
	var abs=self.Math.abs;
	var thisSides=this.dTile.getPolygonSidesConst();
	var otherSides=other.dTile.getPolygonSidesConst();
	var nThisSides=thisSides.length;
	var nOtherSides=otherSides.length;
	var thisSide; var otherSide;
	for (var iThisSide=0; iThisSide<nThisSides; iThisSide++) {
		thisSide=thisSides[iThisSide];
		for (var iOtherSide=0; iOtherSide<nOtherSides; iOtherSide++) {
			otherSide=otherSides[iOtherSide];
			var coeficienteDificuldade = 25;

			if (otherSide.ptA.id==thisSide.ptB.id && otherSide.ptB.id==thisSide.ptA.id && abs(otherSide.ptA.x-thisSide.ptB.x)<coeficienteDificuldade && abs(otherSide.ptA.y-thisSide.ptB.y)<coeficienteDificuldade) {
				// merge pieces
				var oldTopleft=this.getDisplayBbox().union(other.getDisplayBbox()).getTopleft();
				this.merge([other]);
				var newTopleft=this.getDisplayBbox().getTopleft();
				var newPos=this.getDisplayPos();
				newPos.offset(oldTopleft.x-newTopleft.x,oldTopleft.y-newTopleft.y);
				this.setDisplayPos(newPos.x,newPos.y);
				return true;
				}
			}
		}
	return false;
	};
PuzzlePiece.prototype.isMostlyHollow = function() {
	return this.dTile.isMostlyHollow();
	};

// Puzzle preview box
function PuzzlePreview(img) {
	this.preview=true;
	this.source=img;
	this.shadow=8;
	this.size=160; // starting size
	this.bbox=new Bbox(0,0,0,0);
	}
PuzzlePreview.prototype = new PuzzlePart();
PuzzlePreview.prototype.draw = function(ctx) {
	if (this.hidden) {return;}
	ctx.save();
	//ctx.shadowOffsetX = ctx.shadowOffsetY = this.shadow;
	//ctx.shadowColor = 'rgba(127, 127, 127, 0.33)';
	//ctx.shadowBlur = 2;
	if (!this.image) {
		this.resize();
		}
	ctx.drawImage(this.image,this.bbox.tl.x,this.bbox.tl.y);
	ctx.restore();
	};
PuzzlePreview.prototype.setDisplayPos = function(x,y) {
	var topleft=this.bbox.getTopleft();
	this.bbox.offset(x-topleft.x,y-topleft.y);
	};
PuzzlePreview.prototype.getDisplayPos = function() {
	return this.bbox.getTopleft();
	};
PuzzlePreview.prototype.getDisplayBbox = function() {
	return new Bbox(this.bbox);
	};
PuzzlePreview.prototype.getDisplayBboxConst = function() {
	return this.bbox;
	};
PuzzlePreview.prototype.pointIn = function(p) {
	var noShadowBbox=new Bbox(this.bbox);
	noShadowBbox.br.x-=this.shadow;
	noShadowBbox.br.y-=this.shadow;
	return noShadowBbox.pointIn(p);
	};
PuzzlePreview.prototype.doesIntersect = function(bbox) {
	return this.bbox.doesIntersect(bbox);
	};
PuzzlePreview.prototype.resize = function(sz) {
	var math=self.Math;
	var w; var h;
	w=h=(!sz)?math.max(this.source.width,this.source.height):sz;
	var ratio=this.source.width/this.source.height;
	if (ratio>=1) {h/=ratio;}
	else {w*=ratio;}
	this.size=sz;
	// ensure no fraction, thus no subpixel operations on the canvas
	w=math.round(w);
	h=math.round(h);
	if (!this.image) {
		this.image=self.document.createElement('canvas');
		}
	this.image.width=w+this.shadow;
	this.image.height=h+this.shadow;
	// keep track of previous position
	var xpos=0;
	var ypos=0;
	if (this.bbox) {
		xpos=math.max(this.bbox.tl.x,0);
		ypos=math.max(this.bbox.tl.y,0);
		}
	this.bbox=new Bbox(xpos,ypos,xpos+w+this.shadow,ypos+h+this.shadow);
	// transfer source image
	var ctx=this.image.getContext('2d');
	ctx.drawImage(this.source,0,0,w,h);
	// frame to highlight preview
	ctx.save();
	ctx.beginPath();
	ctx.rect(0,0,w,h);
	ctx.clip();
	//cor da linha do preview
	ctx.strokeStyle='#ccc';
	ctx.lineWidth=2;
	ctx.globalAlpha=0.8;
	ctx.strokeRect(0,0,w,h);
	ctx.restore();
	// cor da simulação de sombra
	ctx.fillStyle='#000';
	ctx.globalAlpha=0.5;
	ctx.fillRect(w,this.shadow,this.shadow,h); // left shadow
	ctx.fillRect(this.shadow,h,w-this.shadow,this.shadow); // bottom shadow
	};
PuzzlePreview.prototype.maximize = function() {
	this.resize();
	};
PuzzlePreview.prototype.restore = function() {
	this.resize(160);
	};
PuzzlePreview.prototype.toggleVisibility= function() {
	this.hidden=!this.hidden;
	};

// Puzzle bed area


/**
 * Puzzle object
 *
 * Initialization logic:
 * There must always be a View specified: 'Full' or 'Mini'.
 * If no View specified, default to 'Full'
 * If Options
 *   If Options.puzzleKey
 *     Use Options.puzzleKey
 *   Else if Options.puzzleSrc
 *     Use Option
 *   Else
 *     Prefs(View)
 * Else If Prefs(View)
 *   Use Prefs(View)
 * Else
 *   Use Default
 */
function Puzzle(id,puzzleOptions) {
	// this is me initializing
	var me=this;
	// Methods
	this.confine = function(v,l,h,d) {
		return v!==undefined?self.Math.max(self.Math.min(v,h),l):d;
		};
	this.create = function(puzzleOptions) {
		var defaultOptions={
			view:'full',
			cut:'classic',
			screenSize:'wilivro',
			src:'https://www.google.com.br/images/srpr/logo3w.png',
			numPieces:4,
			complexity:1,
			numRotateSteps:{full:1,mini:1},
			showPreview:false,
			callBack: null,
			callBacks: null,
			callBacks_aux: 0,
			altura: 300,
			largura: 300
		};
		this.config={};
		this.config.callBack = (puzzleOptions&&puzzleOptions.callBack)?puzzleOptions.callBack:defaultOptions.callBack;
		this.config.callBacks = (puzzleOptions&&puzzleOptions.callBacks)?puzzleOptions.callBacks:defaultOptions.callBacks;
		this.config.callBacks_aux = (puzzleOptions&&puzzleOptions.callBacks_aux)?puzzleOptions.callBacks_aux:defaultOptions.callBacks_aux;

		this.config.view=(puzzleOptions&&puzzleOptions.view)?puzzleOptions.view:defaultOptions.view;
		this.config.cookieName='jigsawpuzzle_rhill_'+this.config.view;
		if (!puzzleOptions) {
			puzzleOptions=this.restoreKey(this.config.cookieName);
			}
		else if (puzzleOptions.key) {
			puzzleOptions=this.parseKey(puzzleOptions.key);
			}
		else if (!puzzleOptions.src&&!puzzleOptions.bedWidth) {
			puzzleOptions=this.restoreKey(this.config.cookieName);
			}
		this.config.cut=(puzzleOptions.cut!==undefined&&Profile.prototype.stock[puzzleOptions.cut]!==undefined)?puzzleOptions.cut:defaultOptions.cut;
		this.config.backgroundColor=puzzleOptions.backgroundColor?puzzleOptions.backgroundColor:this.canvasParent.style.backgroundColor;
		this.config.showEdges=false;
		this.config.showComposite=false;
		this.config.showPreview=(puzzleOptions.showPreview!==undefined)?puzzleOptions.showPreview:false;
		this.config.numPieces= ((puzzleOptions&&puzzleOptions.numPieces)?puzzleOptions.numPieces:defaultOptions.numPieces)-1;//this.confine(puzzleOptions.numPieces,4,999,defaultOptions.numPieces[this.config.view]);
		this.config.complexity=this.confine(puzzleOptions.complexity,0,9,defaultOptions.complexity);
		this.config.numRotateSteps=this.confine(puzzleOptions.numRotateSteps,1,90,defaultOptions.numRotateSteps[this.config.view]);
		this.config.screenSize=puzzleOptions.screenSize?puzzleOptions.screenSize:defaultOptions.screenSize;
		//largura
		this.config.bedWidth=(puzzleOptions&&puzzleOptions.largura)?(puzzleOptions.largura) * (getScale()) :defaultOptions.largura;
		//altura
		this.config.bedHeight=(puzzleOptions&&puzzleOptions.altura)?(puzzleOptions.altura) * (getScale()) :defaultOptions.altura;

		this.config.bedMargin=self.Math.round(this.config.bedHeight*0.05);
		this.config.src=puzzleOptions.src&&puzzleOptions.src.length>0?puzzleOptions.src:defaultOptions.src;
		if (puzzleOptions.clusters) {this.config.clusters=puzzleOptions.clusters;}
		this.minPieceSize=40;
		this.minImageSize=this.minPieceSize*2;
		if (!this.canvas) {throw "Puzzle.create(): No canvas";}
		this.canvas.width=this.confine(this.config.bedWidth?this.config.bedWidth:this.canvasParent.offsetWidth,100,2500,768);
		this.canvas.height=this.confine(this.config.bedHeight?this.config.bedHeight:this.canvasParent.offsetHeight,100,2000,576);
		this.canvasParent.style.width='0px';
		this.canvasParent.style.height='0px';
		this.imageSource=new Image();
		this.imageSource.onload=function(){
			me.init(me.config);
			this.onload=null;
			};
		this.imageSource.src=this.config.src;
		this.pieces={};
		this.drawingStack=[];
		this.composites={};
		};
	// mix pieces
	this.shuffle = function() {
		var round=self.Math.round;
		var random=self.Math.random;
		var cw=this.canvas.width;
		var ch=this.canvas.height;
		var hf=(cw-this.partWidth);
		var vf=(ch-this.partHeight);
		var ph2=this.partWidth>>1;
		var pv2=this.partHeight>>1;
		var part;
		for (var ipart=0; ipart<this.drawingStack.length; ipart++) {
			part=this.drawingStack[ipart];
			//console.log(JSON.stringify(part.getDisplayPos()));

			if (!part.piece) {continue;}
			if (!part.composite) {
				var partBbox=part.getDisplayBboxConst();

				var partWidth=partBbox.width();
				var partHeight=partBbox.height();

				var py = partBbox.height() >> 1;
				//adiciona a posicao x dele de acordo com o tamanho das pecas para nao ficar em cima
				var px = ((part.id - 1) * partBbox.width()) + (partBbox.width() >> 1);
				if (px > cw)
				{
					px = px % cw;
					py = partBbox.height() * ((px / cw) + 1);
				}

				//var py = ((part.id - 1) * partBbox.height()) + (partBbox.height() >> 1);
				/*if (py > ch)
				{
					py = py % ch;
				}
*/
				//fator de randomização
				var fr = 50;

				part.setDisplayPos(px+((random()*fr)-(fr/2)),py+((random()*fr)-(fr/2)));


				//metodo antigo de embaralhamento
				//part.setDisplayPos(round(random()*hf)+ph2,round(random()*vf)+pv2);
				}
			else {
				var partBbox=part.getDisplayBboxConst();
				var partWidth=partBbox.width();
				var partHeight=partBbox.height();
				part.setDisplayPos(round(random()*(cw-partWidth)+(partWidth/2)),
				                   round(random()*(ch-partHeight)+(partHeight/2)));
				}
			part.setAngleStep(part.composite?0:round(random()*this.config.numRotateSteps),this.config.numRotateSteps);
			}
		};
	this.draw = function(clip) {
		var ctx=me.canvas.getContext('2d');
		ctx.save();
		ctx.fillStyle=me.config.backgroundColor;
		if (clip) {
			ctx.beginPath();
			clip.toCanvasPath(ctx);
			ctx.clip();
			ctx.fill();
			}
		else {
			ctx.fillRect(0,0,me.canvas.width,me.canvas.height);
			}
		ctx.globalCompositeOperation = "source-over";
		var imoved=me.imoved;
		var showedges=me.config.showEdges;
		var showComposite=me.config.showComposite;
		var stack=me.drawingStack;
		var nparts=stack.length;
		var part;
		for (var ipart=0; ipart<nparts; ipart++) {
			part=stack[ipart];
			if ((!clip || part.doesIntersect(clip)) && (!part.piece || ipart==imoved || ((!showComposite || part.composite) && (!showedges || part.isEdge())))) {
				part.draw(ctx);
				}
			}
		ctx.restore();
		};
	// merge two puzzle pieces
	this.mergePieces = function(id,others) {

		var parts=[];
		var nOthers=others.length;
		var otherId;
		for (var iOther=0; iOther<nOthers; iOther++) {
			otherId=others[iOther];
			parts.push(this.pieces[otherId]);
			delete this.pieces[otherId];
			}
		this.pieces[id].merge(parts);
		this.composites[id]=this.pieces[id];
		};
	this.init = function() {
		this.canvas.style.cursor="wait";
		var round=self.Math.round;
		var ceil=self.Math.ceil;
		var sqrt=self.Math.sqrt;
		var domax=self.Math.max;
		var domin=self.Math.min;
		var opts=this.config;
		var iw=this.imageSource.width * getScale();
		var ih=this.imageSource.height * getScale();
		var cw=this.canvas.width;
		var ch=this.canvas.height;
		var imgRatio=iw/ih;
		var cnvRatio=cw/ch;
		if (iw<this.minImageSize || ih<this.minImageSize) {
			if (imgRatio>=1) {
				iw=this.minImageSize;
				ih=round(iw/imgRatio);
				}
			else {
				ih=this.minImageSize;
				iw=round(ih*imgRatio);
				}
			}
		else if (iw>(cw-opts.bedMargin*2) || ih>(ch-opts.bedMargin*2)) {
			if (iw>(cw-opts.bedMargin*2)) {
				iw=cw-opts.bedMargin*2;
				ih=round(iw/imgRatio);
				}
			if (ih>(ch-opts.bedMargin*2)) {
				ih=ch-opts.bedMargin*2;
				iw=round(ih*imgRatio);
				}
			}
		if (iw<this.minImageSize || ih<this.minImageSize || iw>(cw-opts.bedMargin*2) || ih>(ch-opts.bedMargin*2)) {
			stdout("Because of its size, this image can't be used as a puzzle");
			return;
			}
		stdout("Original image size (w &times; h): "+this.imageSource.width+"px &times; "+this.imageSource.height+"px");
		if (iw!=this.imageSource.width || ih!=this.imageSource.height) {
			stdout("Resized to "+iw+"px &times; "+ih+"px");
			}
		var numCols=domin(domax(ceil(sqrt(opts.numPieces)*sqrt(imgRatio)),2),round(iw/this.minPieceSize));
		var numRows=domin(domax(ceil(sqrt(opts.numPieces)/sqrt(imgRatio)),2),round(ih/this.minPieceSize));
		stdout("Actual number of pieces: "+numCols*numRows+" ("+numCols+" &times; "+numRows+" pieces)");
		this.partWidth=round(iw/numCols);
		this.partHeight=round(ih/numRows);
		this.imageObj=self.document.createElement('canvas');
		this.imageObj.width=iw;
		this.imageObj.height=ih;
		var ctx=this.imageObj.getContext('2d');
		ctx.drawImage(this.imageSource,0,0,this.imageSource.width,this.imageSource.height,0,0,iw,ih);
		this.drawingStack=[];
		this.pieces={};
		this.composites={};
		this.cut({width:iw,height:ih,numRows:numRows,numCols:numCols});
		var partid;
		if (this.config.clusters) {
			var clusters=this.config.clusters;
			var nClusters=clusters.length;
			var cluster;
			for (var iCluster=0; iCluster<nClusters; iCluster++) {
				cluster=clusters[iCluster];
				partid=cluster.shift();
				this.mergePieces(partid,cluster);
				}
			delete this.config.clusters;
			}
		for (partid in this.pieces) {
			if (!this.pieces.hasOwnProperty(partid)) {continue;}
			this.drawingStack.push(this.pieces[partid]);
			}
		this.previewTile=new PuzzlePreview(this.imageObj);
		this.previewTile.setDisplayPos((cw-iw)>>1,(ch-ih)>>1);
		this.previewTile.hidden=!opts.showPreview;
		this.drawingStack.push(this.previewTile);
		this.shuffle();
		this.draw();
		};
	this.cut = function(parms) {
		var rand=self.Math.random;
		var min=self.Math.min;
		var max=self.Math.max;
		var imgWidth=parms.width;
		var imgHeight=parms.height;
		var numRows=parms.numRows;
		var numCols=parms.numCols;
		var partWidth=imgWidth/numCols;
		var partHeight=imgHeight/numRows;
		var partWidthVar=partWidth*max(min(this.config.complexity,9),0)*0.48/9;
		var partHeightVar=partHeight*max(min(this.config.complexity,9),0)*0.48/9;
		var randomX=function(iPart){return self.Math.round(partWidth*(iPart+1)+partWidthVar*2*rand()-partWidthVar);};
		var randomY=function(iPart){return self.Math.round(partHeight*(iPart+1)+partHeightVar*2*rand()-partHeightVar);};
		var vid=1; // unique id identifying every vertex
		var pid=1; // unique id identifying every puzzle piece
		var sides=[];
		var top=0; var right=1; var bottom=2;
		var edgeTop; var edgeRight; var edgeBottom; var edgeLeft; var piece;
		var profileStraight=new Profile(Profile.prototype.stock.straight);
		var profileRandomizer=new ProfileRandomizer(Profile.prototype.stock[this.config.cut],true);
		for (var iRow=0; iRow<numRows; iRow++) {
			sides[iRow]=[];
			for (var iCol=0; iCol<numCols; iCol++) {
				edgeTop=new Side(iRow===0?{ptA:iCol===0?{x:0,y:0,id:vid++}:sides[iRow][iCol-1][top].endPointConst(),ptB:{x:iCol==numCols-1?imgWidth:randomX(iCol),y:0,id:vid++},profileNormalized:profileStraight}:sides[iRow-1][iCol][bottom].complement());
				edgeRight=new Side({ptA:edgeTop.endPointConst(),ptB:{x:iCol==(numCols-1)?imgWidth:randomX(iCol),y:(iRow==numRows-1)?imgHeight:randomY(iRow),id:vid++},profileNormalized:iCol==(numCols-1)?profileStraight:profileRandomizer.randomize()});
				edgeBottom=new Side({ptA:edgeRight.endPointConst(),ptB:(iCol===0)?{x:0,y:iRow==numRows-1?imgHeight:randomY(iRow),id:vid++}:sides[iRow][iCol-1][bottom].startPointConst(),profileNormalized:iRow==numRows-1?profileStraight:profileRandomizer.randomize()});
				edgeLeft=new Side(iCol===0?{ptA:edgeBottom.endPointConst(),ptB:edgeTop.startPointConst(),profileNormalized:profileStraight}:sides[iRow][iCol-1][right].complement());
				sides[iRow][iCol]=[edgeTop,edgeRight,edgeBottom,edgeLeft];
				piece=new PuzzlePiece(pid++,sides[iRow][iCol],this.imageObj);
				piece.edge=(iRow===0)||(iCol===0)||(iRow==numRows-1)||(iCol==numCols-1);
				this.pieces[piece.id]=piece;
				}
			}
		};
	this.partUnderPoint = function(p) {
		var stack=this.drawingStack;
		var iPart=stack.length;
		var part;
		while (--iPart>=0) {
			part=stack[iPart];
			if (part.pointIn(p) && !part.hidden && (!part.piece || !this.config.showEdges || part.isEdge())) {
			    break;
				}
			}
		return iPart;
		};
	this.sendBack = function(ipart) {
		if (ipart>=0) {
			var movedPart=this.drawingStack[ipart];
			this.drawingStack.splice(ipart,1);
			this.drawingStack.unshift(movedPart);
			}
		return 0;
		};
	this.sendTop = function(ipart) {
		if (ipart>=0 && ipart<this.drawingStack.length-2) {
			var movedPart=this.drawingStack[ipart];
			this.drawingStack.splice(ipart,1);
			// insert below the preview part: todo: need to revisit for more solid programming
			ipart=this.drawingStack.length-1;
			this.drawingStack.splice(ipart,0,movedPart);
			}
		return ipart;
		};
	this.normalizeEventPos = function(e) {
		if (!e) {e=self.event;}
		var pos=new Point();

		// if (e.pageX || e.pageY) {
		// 	pos.x=e.pageX;
		// 	pos.y=e.pageY;
		// }
		// else if (e.clientX || e.clientY) {
		// 	pos.x=e.clientX+self.document.body.scrollLeft+self.document.documentElement.scrollLeft;
		// 	pos.y=e.clientY+self.document.body.scrollTop+self.document.documentElement.scrollTop;
		// }
		//pos.x-=me.canvas.offsetLeft;
		pos.x = e.clientX - $(me.canvas).offset().left;
		//pos.y-=me.canvas.offsetTop;
		pos.y = e.clientY - $(me.canvas).offset().top;

		return pos;
		};

	this.normalizeEventPosXY = function(x,y) {

		var pos=new Point();

		pos.x = x - $(me.canvas).offset().left;
		pos.y = y - $(me.canvas).offset().top;

		return pos;
		};
	this.isSolved = function() {
		return me.drawingStack.length<=2;
		};
	this.partidToIndex = function(id) {
		var n=this.drawingStack.length;
		var part;
		for (var i=0; i<n; i++) {
			part=this.drawingStack[i];
			if (part.piece && part.id==id) {
				return i;
				}
			}
		return -1;
		};

	this.parseKey = function(key) {
		var r={};
		if (!key || !key.length) {return r;}
		var streamParts=key.split('++');
		if (streamParts.length>0) {
			r=gadgets.json.parse(gadgets.Base64.decodeString(streamParts[0]));
			// parse clusters
			if (streamParts.length>1) {
				r.clusters=[];
				var clusters=streamParts[1].split('+');
				for (var iCluster=0; iCluster<clusters.length; iCluster++) {
					r.clusters.push(gadgets.Base64.decode10bit(clusters[iCluster]));
					}
				}
			}
		return r;
		};
	this.restoreKey = function(keyName) {
		var prefs=new gadgets.Prefs();
		return this.parseKey(prefs.getString(keyName));
		};
	// check whether a piece snaps onto another one
	this.snapPiece = function(iTarget) {
		var stack=this.drawingStack;
		var nParts=stack.length;
		var target=stack[iTarget];
		var targetBbox=target.getDisplayBbox();
		targetBbox.inflate(5);
		for (var iPart=0; iPart<nParts; iPart++) {
			// skip self
			if (iPart==iTarget) {continue;}
			// consider only puzzle piece (leaving other puzzle parts)
			var part=stack[iPart];
			if (!part.piece) {continue;}
			// angle must be same
			if (part.getAngleStep()!=target.getAngleStep()) {continue;}
			// coarse test
			if (!targetBbox.doesIntersect(part.getDisplayBboxConst())) {continue;}

			// test if it's a match
			if (!part.snapPiece(target)) {continue;}

			// remember which pieces are clustered together, for persistence
			if (!this.composites) {this.composites={};}
			this.composites[part.id]=part;

			delete this.composites[target.id];
			// get rid of merged piece
			this.drawingStack.splice(iTarget,1);
			// is the puzzle solved?
			if (this.isSolved()) {
				//removendo o preview
				this.drawingStack.pop();

			}
			this.draw();
			// mark puzzle as modified
			//this.markAsDirty();
			//chamando os callbacks
			if (this.config.callBack && this.isSolved())
			{
				this.config.callBack();
			}
			if (this.config.callBacks && this.config.callBacks.length > 0 && this.config.callBacks.length > this.config.callBacks_aux)
			{
				this.config.callBacks[this.config.callBacks_aux]();

				this.config.callBacks_aux++;
			}
			return true;
			}
		return false;
		};
	// synchronize interface with current options
	this.syncUI = function() {
		function findOptionIndex(o,entry){
			var entries=o.options;
			for (var i=0; i<entries.length; i++) {
				if (entry==entries[i].value) {return i;}
				}
			return -1;
			}
		var opts=this.config;

		};

	this.canvasParent=self.document.getElementById(id);
	if (!this.canvasParent) {return;}
	this.canvas=self.document.getElementById("puzzleCanvas");
	if (!this.canvas) {
		this.canvas=self.document.createElement("canvas");
		if (!this.canvas) {return;}
		}
	if (!this.canvas.getContext) {return;}
	this.canvas.puzzle=me;
	//cor de fundo (nao deixe transparente)
	this.canvasParent.style.backgroundColor='#fff';

	this.canvasParent.innerHTML='';
	this.canvasParent.appendChild(this.canvas);

	this.imoved=-1;
	this.movedAnchor=new Point();
	this.drawingStack=[];
	var elems=document.querySelectorAll('[id^="puzzle"]');
	for (var iElem=0; iElem<elems.length; iElem++) {
		var e=elems[iElem];
		this[e.id]=e;
		}
	this.puzzleShowPreview=function(){
		me.config.showPreview=!me.config.showPreview;
		if (me.previewTile) {me.previewTile.hidden=!me.config.showPreview;}
		me.syncUI();
		me.draw();
	};
	this.presetClickHandler=function() {
		var parms={
			view:'full',
			src:this.src.replace('thumbnail-','full-'),
			cut:'classic',
			screenSize:me.puzzlePreferredSize.value,
			numPieces:me.puzzlePreferredNumPieces.value,
			complexity:1,
			rotate:24,
			showPreview:false
			};
		var prefs=new self.gadgets.Prefs();
		prefs.set("jigsawpuzzle_rhill_prefs",'{"size":"'+me.puzzlePreferredSize.value+'","numPieces":'+me.puzzlePreferredNumPieces.value+'}');
		me.create(parms);
		self.puzzleGadgetTabs.setSelectedTab(0);

		//me.markAsDirty();
		me.draw();
		};

	this.create(puzzleOptions);
	this.syncUI();

	this.canvas.addEventListener('touchstart', function(e) {
	e.preventDefault();
  // If there's exactly one finger inside this element
  if (e.targetTouches.length == 1) {
    var touch = e.targetTouches[0];

	var imoved=me.imoved;
		me.imoved=-1;
		if (imoved>= 0) {
			// is this a piece of puzzle?
			if (me.drawingStack[imoved].piece) {
				if (!me.snapPiece(imoved)) {
					me.config.showComposite=false; // for convenience
					}
				}
			me.draw();
			this.style.cursor="-moz-grab";
			}
		else {
			var pos=me.normalizeEventPosXY(touch.pageX,touch.pageY);
			var ipart=me.partUnderPoint(pos);
			if (ipart>=0) {
				// bring on top
				me.imoved=me.sendTop(ipart);
				var moved=me.drawingStack[me.imoved];
				var dPos=moved.getDisplayPos();
				me.movedAnchor.x=pos.x-dPos.x;
				me.movedAnchor.y=pos.y-dPos.y;
				me.draw(moved.getDisplayBbox());
				this.style.cursor="-moz-grabbing";
				}
			}
  }
}, false);

	this.canvas.onclick2 = function(e) { // desativado no click e ativado no grab ( 2 proximos handlers)
		var imoved=me.imoved;
		me.imoved=-1;
		if (imoved>= 0) {
			// is this a piece of puzzle?
			if (me.drawingStack[imoved].piece) {
				if (!me.snapPiece(imoved)) {
					me.config.showComposite=false; // for convenience
					}
				}
			me.draw();
			this.style.cursor="-moz-grab";
			}
		else {
			var pos=me.normalizeEventPos(e);
			var ipart=me.partUnderPoint(pos);
			if (ipart>=0) {
				// bring on top
				me.imoved=me.sendTop(ipart);
				var moved=me.drawingStack[me.imoved];
				var dPos=moved.getDisplayPos();
				me.movedAnchor.x=pos.x-dPos.x;
				me.movedAnchor.y=pos.y-dPos.y;
				me.draw(moved.getDisplayBbox());
				this.style.cursor="-moz-grabbing";
				}
			}
		};


	this.canvas.addEventListener('touchend', function(e) {
		e.preventDefault();
	  // If there's exactly one finger inside this element
	  if (e.targetTouches.length == 1) {
	    var touch = e.targetTouches[0];

		var imoved=me.imoved;
			me.imoved=-1;

				// is this a piece of puzzle?
				if (me.drawingStack[imoved] && me.drawingStack[imoved].piece) {
					if (!me.snapPiece(imoved)) {
						me.config.showComposite=false; // for convenience
						}
					}
				me.draw();
				this.style.cursor="-moz-grab";

	  }
	}, false);
	this.canvas.onmouseup = function(e) {
		var imoved=me.imoved;
		me.imoved=-1;

			// is this a piece of puzzle?
			if (me.drawingStack[imoved] && me.drawingStack[imoved].piece) {

				if (!me.snapPiece(imoved)) {
					me.config.showComposite=false; // for convenience
					}
				}
			me.draw();
			this.style.cursor="-moz-grab";


		};



	this.canvas.onmousedown = function(e) {

		var imoved=me.imoved;
		me.imoved=-1;

			var pos=me.normalizeEventPos(e);
			var ipart=me.partUnderPoint(pos);
			if (ipart>=0) {
				// bring on top
				me.imoved=me.sendTop(ipart);
				var moved=me.drawingStack[me.imoved];
				var dPos=moved.getDisplayPos();
				me.movedAnchor.x=pos.x-dPos.x;
				me.movedAnchor.y=pos.y-dPos.y;
				me.draw(moved.getDisplayBbox());
				this.style.cursor="-moz-grabbing";
				}

		};

		this.canvas.addEventListener('touchmove', function(e) {
		e.preventDefault();
  // If there's exactly one finger inside this element
  if (e.targetTouches.length == 1) {
    var touch = e.targetTouches[0];

	var pos=me.normalizeEventPosXY(touch.pageX,touch.pageY);
		//console.log(JSON.stringify(pos));
		if (me.imoved<0) {
			this.style.cursor=me.partUnderPoint(pos)>=0?"-moz-grab":"auto";
			}
		else {
			var moved=me.drawingStack[me.imoved];
			var drawBbox=moved.getDisplayBbox();
			moved.setDisplayPos(pos.x-me.movedAnchor.x,pos.y-me.movedAnchor.y);
			drawBbox.union(moved.getDisplayBboxConst());
			me.draw(drawBbox);
			}
  }
}, false);
	this.canvas.onmousemove = function(e) {
		var pos=me.normalizeEventPos(e);
		//console.log(JSON.stringify(pos));
		if (me.imoved<0) {
			this.style.cursor=me.partUnderPoint(pos)>=0?"-moz-grab":"auto";
			}
		else {
			var moved=me.drawingStack[me.imoved];
			var drawBbox=moved.getDisplayBbox();
			moved.setDisplayPos(pos.x-me.movedAnchor.x,pos.y-me.movedAnchor.y);
			drawBbox.union(moved.getDisplayBboxConst());
			me.draw(drawBbox);
			}
		};
	self.onkeypress = function(e) {
		if (!e) {e=self.window.event;}
		var code=e.keyCode?e.keyCode:(e.which?e.which:0);
		// prefilter according to key code
		switch (code) {
			// rotate moved piece left
			case 37: // left arrow
			case 65: // 'A'
			case 97: // 'a'
			// rotate moved piece right
			case 39: // right arrow
			case 68: // 'D'
			case 100: // 'd'
			// send moved piece to the top of drawing stack
			case 38: // up arrow
			case 87: // 'W'
			case 119: // 'w'
			// send moved piece to the bottom of drawing stack
			case 40: // down arrow
			case 83: // 'S'
			case 115: // 's'
				if (me.imoved<0) {return true;}
				var moved=me.drawingStack[me.imoved];
				if (!moved.piece) {return true;}
				break;
			// toggle show composite pieces only
			case 32: // space
			// toggle edge pieces visibility
			case 69: // 'E'
			case 101: // 'e'
			// toggle preview tile visibility
			case 81: // 'Q'
			case 113: // 'q'
				break;
			default:
				return true;
			}
		// process
		var drawBbox;
		switch (code) {
			// rotate moved piece left
			case 37: // left arrow
			case 65: // 'A'
			case 97: // 'a'
				if (me.config.numRotateSteps <= 1) {return true;}
				drawBbox=moved.getDisplayBbox();
				moved.setAngleStep(moved.getAngleStep()-1);
				break;
			// rotate moved piece right
			case 39: // right arrow
			case 68: // 'D'
			case 100: // 'd'
				if (me.config.numRotateSteps <= 1) {return true;}
				drawBbox=moved.getDisplayBbox();
				moved.setAngleStep(moved.getAngleStep()+1);
				break;
			// send moved piece to the top of drawing stack
			case 38: // up arrow
			case 87: // 'W'
			case 119: // 'w'
				drawBbox=moved.getDisplayBbox();
				me.imoved=me.sendTop(me.imoved);
				break;
			// send moved piece to the bottom of drawing stack
			case 40: // down arrow
			case 83: // 'S'
			case 115: // 's'
				drawBbox=moved.getDisplayBbox();
				me.imoved=me.sendBack(me.imoved);
				break;
			// toggle show composite pieces only
			case 32: // space
			case 81: // 'Q'
			case 113: // 'q'
				me.puzzleShowPreview();
				break;
			default:
				return true;
			}
		if (drawBbox) {
			drawBbox.union(moved.getDisplayBboxConst());
			me.draw(drawBbox);
			}
		return false;
		};
	}
