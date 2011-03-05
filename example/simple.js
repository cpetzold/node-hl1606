var HL1606 = require('../lib/hl1606');

var strip = HL1606.connect('/dev/ttyACM0', 115200);

setInterval(function(){
  strip.push(strip.Command | strip.GreenOn);
  //strip.delay(250);
}, 1000);
