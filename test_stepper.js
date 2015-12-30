var Stepper = require('./stepper');

var len = 140;
Stepper.init(12,16,18,22,function() {
	console.log("the stepper is set up");
	Stepper.stepForward(len, function() {
		Stepper.stepBackward(len, function() {
			console.log("all done");
			Stepper.stop();
		});
	});
});
