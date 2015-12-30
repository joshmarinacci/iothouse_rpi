/*

we need to send out

homer arrives home
start party
stop party
maggie sleep
close garage door

  { type:'action', action:'arrive' }
*/
var async = require('async');
var gpio = require('rpi-gpio');
var Stepper = require('./stepper');
var RGBLED = require('./rgbled');
var PN = require('pubnub')({
  publish_key: "pub-c-de8f6ece-75ec-49ec-bdd9-b0e9d287a45b",
  subscribe_key: "sub-c-85f8eba0-ad8d-11e5-ae71-02ee2ddab7fe"
});


var message = {"some":"data"};
PN.publish({
  channel:'ch1',
  message: message,
  callback: function(e) {
    console.log("success",e);
  },
  error: function(e) {
    console.log("failed.",e);
  }
})

var GARAGE_DISTANCE = 130;

var actions = {
	
	arriveHome: function() {
        Stepper.stepForward(GARAGE_DISTANCE);
        RGBLED.setAll(true);
        console.log("lights are on");
	},
	party: function() {
        console.log("start blinking the party lights");
        var on = true;
        var count = 0;
        RGBLED.setAll(false);
        var id = setInterval(function() {
	        if(on===false) {
		        on = true;
		        RGBLED.setRed(true);
	        } else {
		        on = false;
		        RGBLED.setRed(false);
	        }
	        count++;
	        if(count >= 20) {
		        RGBLED.setAll(true);
		        clearInterval(id);
	        }
        },250);
	},
	sleep: function() {
		console.log("turning lights to blue");
		RGBLED.setAll(false);
		RGBLED.setBlue(true);
        console.log("maggie wants to sleep. dim lights");
	},
	close: function() {
        console.log("closing the garage door");
        Stepper.stepBackward(GARAGE_DISTANCE);
	},
	shutdown: function() {
        console.log("shut everything off");
        Stepper.stepBackward(GARAGE_DISTANCE,function() {
            Stepper.stop(function() {
                RGBLED.setAll(false);
            });
        });
	},
	startup: function() {
        console.log("starting up. blinking lights. toggling stepper motor");		
        RGBLED.setAll(true);
        setTimeout(function() { RGBLED.setAll(false); },500);
	},
	stepDoorClose: function() {
    	console.log("doing backward 10");
        Stepper.stepBackward(10, function() {
            console.log("did back");
        });
	},
	stepDoorOpen: function() {
    	console.log("doing forward 10");
        Stepper.stepForward(10, function() {
            console.log("did forward");
        });
	},
}


function startPubNub(cb) {
    PN.subscribe({
        channel:'ch1',
        callback: function(message) {
            if(message.type=='action') {
                if(message.action == 'arrive') { actions.arriveHome(); }
                if(message.action == 'party') { actions.party(); }
                if(message.action == 'sleep') { actions.sleep(); }
                if(message.action == 'close') { actions.close(); }
                if(message.action == 'shutdown') { actions.shutdown(); }
                if(message.action == 'startup') { actions.startup(); }
                if(message.action == 'stepDoorClose') { actions.stepDoorClose(); }
                if(message.action == 'stepDoorOpen') { actions.stepDoorOpen(); }
            }
            console.log(">",message);
    }
	});
	if(cb) cb();
}

function d_wait(len) {
	return function(cb) {
		setTimeout(cb,len);
	}
}

var RED = 11;
var BLUE = 13;
var GREEN = 15;
async.series([
	function(cb) { Stepper.init(12,16,18,22,cb)},
	function(cb) { console.log("stepper is rolling"); cb(); },
	
	function(cb) { RGBLED.init(RED, GREEN, BLUE,cb); },
	function(cb) { RGBLED.setAll(true,cb)},
	d_wait(500),
	function(cb) { RGBLED.setAll(false,cb)},
	function(cb) { RGBLED.setRed(true,cb)},
	d_wait(500),
	function(cb) { RGBLED.setRed(false,cb)},
	function(cb) { RGBLED.setGreen(true,cb)},
	d_wait(500),
	function(cb) { RGBLED.setGreen(false,cb)},
	function(cb) { RGBLED.setBlue(true,cb)},
	d_wait(500),
	function(cb) { RGBLED.setBlue(false,cb)},
	function(cb) { RGBLED.setAll(true,cb)},
	d_wait(500),
	function(cb) { RGBLED.setAll(false,cb)},
	function(cb) { console.log("rgb is rolling"); cb(); },
	startPubNub
], function() {
	console.log("the series is done");
});



