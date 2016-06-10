var Stepper = require('./stepper');

var len = 140;
//BCM: Stepper.init(12,13,16,19,function() {
//RPI: 12=>32, 13=>33, 16=>36, 19=>35
Stepper.init(32,33,36,35,function() {
	console.log("the stepper is set up");
	Stepper.stepForward(len, function() {
		Stepper.stepBackward(len, function() {
			console.log("all done");
			Stepper.stop();
		});
	});
});
