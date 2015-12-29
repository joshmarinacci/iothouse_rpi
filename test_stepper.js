var Stepper = require('./stepper');

Stepper.init(12,16,18,22,function() {
	console.log("the stepper is set up");
	Stepper.stepForward(100, function() {
		Stepper.stepBackward(100, function() {
			console.log("all done");
			Stepper.stop();
		});
	});
});
