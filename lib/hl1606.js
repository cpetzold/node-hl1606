var sys = require('sys'),
    log = require('logging').from(__filename),
    Buffer = require('buffer').Buffer,
    SerialPort = require("serialport").SerialPort,
    parse = require('../support/binary_parser').BinaryParser;
    
var HL1606 = function(path, baud) {
  this.sp = new SerialPort(path, baud); 
}

HL1606.prototype = {
  send: function(c) {
    this.sp.write(c);
    if (arguments.length > 1) this.sp.write(new Buffer([].slice.call(arguments, 1)));
    this.sp.write('\n');
  },
  
  push: function(b) {
    log('pushing', b);
    this.send('p', b);
  },
  
  latch: function() {
    log('latch');
    this.send('l');
  },
  
  fade: function(d) {
    log('fade');
    this.send('f');
  },
  
  fades: function(n, u) {
    log(n, 'fades with', u, 'µs delays');
    this.send('g');
    this.sp.write(parse.toByte(n));
    if (u) {
      this.sp.write(parse.fromInt(u));
      this.sp.write('\n');
    }
  },
  
  delay: function(u) {
    log('delay of', u, 'µs');
    this.sp.write('d');
    this.sp.write(parse.fromInt(u));
    this.sp.write('\n');
  },
  
  close: function() {
    log('closing');
    this.sp.close();
  }
};

(function(obj){
  for(c in obj){
    exports[c] = HL1606.prototype[c] = obj[c];
  }
})({ 
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
});

exports.connect = function(path, baud) {
  log('HL1606 connected on', path, 'with a baud rate of', baud);
  return new HL1606(path, baud || 115200);
};