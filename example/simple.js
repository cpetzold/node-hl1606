var HL1606 = require('../lib/hl1606');

var strip = HL1606.connect('/dev/ttyACM0', 115200);

function nextColor(c) {
  switch (c) {
    case strip.Command | strip.RedOn: return strip.Command | strip.GreenOn;
    case strip.Command | strip.GreenOn: return strip.Command | strip.GreenOn;
    case strip.Command | strip.BlueOn: return strip.Command | strip.GreenOn;
    default: return strip.Command | strip.RedOn;
  }
}

var n = 0;
var c = nextColor();
while(true) {
  strip.push(c);
  if (n == 120) {
    n = 0;
    c = nextColor(c);
  }
  n++;
  strip.delay(250);
}