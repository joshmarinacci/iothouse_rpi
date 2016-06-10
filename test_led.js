//4, 17, 18 BCM
//7, 11, 12 RPI
var gpio = require('rpi-gpio');
var pin = parseInt(process.argv[2]);
console.log("pin is ",pin);
if(!pin) return console.log("error. must set a pin");
gpio.setMode(gpio.MODE_RPI);
gpio.setup(pin, gpio.DIR_OUT, gpio.EDGE_NONE, function(err) {
	if(err) return console.log("error " + err);
	console.log("setting pin",pin);
	gpio.write(pin,1, function(err) {
		console.log('error was',err);
		setTimeout(function() {
                 gpio.write(pin,0, function(err) {
                    console.log("done");
                 });
                },1000);
	});
});


