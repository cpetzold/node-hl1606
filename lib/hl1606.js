var sys = require('sys'),
    Buffer = require('buffer').Buffer,
    SerialPort = require("serialport").SerialPort;
    
var HL1606 = function(path, baud) {
  this.sp = new SerialPort(path, baud); 
}

HL1606.prototype = {
  send: function(c) {
    this.sp.write(c);
    arguments.forEach(function(a){
      this.sp.write(a, 'binary');
    });
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
}


exports.connect = function(path, baud) {
  return new HL1606(path, baud || 115200);
};