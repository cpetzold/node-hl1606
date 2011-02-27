var HL1606 = require('../lib/hl1606');

var strip = HL1606.connect('/dev/ttyACM0', 115200);

strip.send('r');
strip.send('g');