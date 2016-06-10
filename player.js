var path = require('path');
var fs = require('fs');
var Speaker = require('speaker');

module.exports = {
   play: function(file) {
     var song = path.join(__dirname,file);
     console.log("playing the file", song);
     var fin = fs.createReadStream(song);

     var speaker = new Speaker({
       channels: 2,          // 2 channels
       bitDepth: 16,         // 16-bit samples
       sampleRate: 44100     // 44,100 Hz sample rate
     });
     fin.pipe(speaker);
   }
}
