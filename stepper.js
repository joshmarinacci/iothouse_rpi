var gpio = require('rpi-gpio');
var async = require('async');

var Stepper = {
	init: function(s1,s2,s3,s4, cb)	 {
		this.s1 = s1;
		this.s2 = s2;
		this.s3 = s3;
		this.s4 = s4;
		gpio.setup(this.s1,gpio.DIR_OUT);
		gpio.setup(this.s2,gpio.DIR_OUT);
		gpio.setup(this.s3,gpio.DIR_OUT);
		gpio.setup(this.s4,gpio.DIR_OUT);
		setTimeout(function(){
          		console.log("stepper is setup on",s1,s2,s3,s4 );
			if(cb)cb();
		},1000);
	},
	stepForward: function(count,cb) {
		var self = this;
		async.timesSeries(count, function(n, next){
			self._stepForwardOne(next);
		}, function() {
			if(cb)cb();
		});
	},
	stepBackward: function(count,cb) {
		var self = this;
		async.timesSeries(count, function(n, next){
			self._stepBackwardOne(next);
		}, function() {
			if(cb)cb();
		});
	},
	_stepForwardOne: function(cb) {
		var self = this;
		async.series([
			function(cb) { self._setLines(1,1,0,0,cb); },
			function(cb) { self._setLines(0,1,1,0,cb); },
			function(cb) { self._setLines(0,0,1,0,cb); },
			function(cb) { self._setLines(1,0,0,1,cb); }
		], function() { cb(); });
	},
	_stepBackwardOne: function(cb) {
		var self = this;
		async.series([
			function(cb) { self._setLines(1,0,0,1,cb); },
			function(cb) { self._setLines(0,0,1,0,cb); },
			function(cb) { self._setLines(0,1,1,0,cb); },
			function(cb) { self._setLines(1,1,0,0,cb); }
		], function() { cb(); });
	},
	_DELAY:2,
	_setLines: function(A,B,C,D,cb) {
		var self = this;
		async.series([
			function(cb) { gpio.write(self.s1,A,cb);	},
			function(cb) { gpio.write(self.s2,B,cb);	},
			function(cb) { gpio.write(self.s3,C,cb);	},
			function(cb) { gpio.write(self.s4,D,cb);	},
			function(cb) { setTimeout(cb,self._DELAY);  }
		],function() {
			if(cb) cb(null);
		})
	},
	stop:function(cb) {
		this._setLines(0,0,0,0,cb);
	}
}

module.exports = Stepper;
