var sys = require('sys'),
    Buffer = require('buffer').Buffer,
    SerialPort = require("serialport").SerialPort;
    
var HL1606 = function(path, baud) {
  this.sp = new SerialPort(path, baud); 
}

HL1606.prototype = {
  send: function(c) {
    var b;
    console.log('['+c+']');
    this.sp.write(c);
    for (var i = 1; i < arguments.length; i++) {
      b = new Buffer(arguments[i], 'binary')
      this.sp.write(b);
      console.log(b.toString('utf8'));
    }
    this.sp.write('\n');
  },
  
  push: function(b) {
    this.send('p', b);
  },
  
  latch: function() {
    this.send('l');
  },
  
  fade: function(d) {
    this.send('f');
    if (d) {
      this.send('d', d);
    }
  },
  
  fades: function(n, d) {
    while (n--) {
      this.fade(d);
    }
  },
  
  delay: function(n) {
    this.send('d', n);
  }
};

var constants = { 
  Noop: 0x00,
  Command: 0x80,
  Commandx2: 0xC0,
  RedOn: 0x04,
  RedUp: 0x08,
  RedDown: 0x0C,
  GreenOn: 0x10,
  GreenUp: 0x20,
  GreenDown: 0x30,
  BlueOn: 0x01,
  BlueUp: 0x02,
  BlueDown: 0x03
};

for (var c in constants) {
  exports[c] = HL1606.prototype[c] = constants[c];
}

exports.connect = function(path, baud) {
  return new HL1606(path, baud || 115200);
};