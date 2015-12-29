var gpio = require('rpi-gpio');

var RGBLED = {
	init: function(R,G,B,cb) {
		this.red = R;
		this.green = G;
		this.blue = B;
		gpio.setup(this.red, gpio.DIR_OUT, function() {
 			console.log("the red is set up");
                });
		gpio.setup(this.green, gpio.DIR_OUT);
		gpio.setup(this.blue, gpio.DIR_OUT, function(){
   			console.log("LED is set up on",R,G,B)
			if(cb) cb();
		});
	},
	setRed: function(val,cb) {
		var self = this;
		gpio.write(this.red, val, function(err) {
			if(err) throw err;
			if(cb) cb();
// 			console.log("set red to ", self.red,val);
		})
	},
	setGreen: function(val,cb) {
		var self = this;
		gpio.write(this.green, val, function(err) {
			if(err) throw err;
			if(cb) cb();
// 			console.log("set green to ", self.green,val);
		})
	},
	setBlue: function(val,cb) {
		var self = this;
		gpio.write(this.blue, val, function(err) {
			if(err) throw err;
			if(cb) cb();
// 			console.log("set blue to ", self.blue,val);
		})
	},
	setAll: function(val,cb) {
		this.setRed(val);
		this.setGreen(val);
		this.setBlue(val);
		setTimeout(function() {if(cb)cb();}, 100);
	}
}

module.exports = RGBLED;
