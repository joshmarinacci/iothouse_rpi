var gpio = require('rpi-gpio');
var pin = parseInt(process.argv[2]);
console.log("pin is ",pin);
gpio.setup(pin, gpio.DIR_OUT, function() {
	console.log("pin is set");
	gpio.write(pin,true, function(err) {
		console.log('error was',err);
		setTimeout(function() {
                 gpio.write(pin,false, function(err) {
                    console.log("done");
                 });
                },1000);
	});
});


