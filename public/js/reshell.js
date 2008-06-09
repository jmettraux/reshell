
/* 
 * Copyright (c) 2008, John Mettraux, jmettraux@gmail.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

//
// Reshell
//
// Made in Japan
//

var Reshell = function (prefix) {

  this.prefix = prefix;
  //this.count = 0;
  this.env = {};

  this.stdin = document.getElementById(this.prefix+"_stdin");
  this.stdout = document.getElementById(this.prefix+"_stdin");

  this.history_offset = -1;
  this.history = [];

  this.puts = function (text, type) {

    type = type || "out";
    
    var tp = document.createElement('pre');

    //tp.setAttribute('id', this.prefix+"_"+type+"_"+this.count);
    tp.setAttribute('class', this.prefix+"_"+type);

    var tt = document.createTextNode(text);

    tp.appendChild(tt);

    document.getElementById(this.prefix+"_stdout").appendChild(tp);

    return tp;
  }

  this.eval = function () {

    this.history_offset = -1;

    var code = this.stdin.value;
    this.stdin.value = "";
    this.stdin.focus();

    this.puts("$ "+code, "in");

    if (code == '') return;

    var cmd = code.split(" ");
      // TODO : use regex for quote oriented splits

    var f = this.env[cmd[0]];

    if (f) {

      this.history.unshift(code);
      while(this.history.length > 63) this.history.pop;

      f(this, cmd);
    }
    else {
      this.puts("unknow command '"+cmd[0]+"'");
    }
  }

  //
  // history inc
  //
  this.hinc = function (count) {

    var code = this.history[this.history_offset + count];
    if ( ! code) return;
    this.stdin.value = code;
    this.history_offset += count;
  }

  this.onkey = function (evt) {

    var e = evt || window.event;
    var c = e.charCode || e.keyCode;

    if (c == 38) {

      this.hinc(1);
    }
    else if (c == 40) {

      this.hinc(-1);
    }
    return false;
  }

  this.focus = function () {

    this.stdin.focus();
  }

  this.clear = function () {

    while(this.stdout.removeChild(this.stdout.lastChild)) {}
      // not very snappy :(
  }

  this.def = function (name, func) {

    this.env[name] = func;
  }

  //
  // some basic commands

  this.def('clear', this.clear);

  this.def('env', function (shell, args) {

    var out = "";
    for (var key in shell.env) {
      var val = shell.env[key];
      if ((typeof val) == 'function') val = "command";
      out += (""+key+"="+val+"\n");
    }
    shell.puts(out);
  });

  this.def('echo', function (shell, args) {

    shell.puts(args.slice(1).join(" "));
  });

  this.def('history', function (shell, args) {

    shell.puts(shell.history.join("\n"));
  });

  // TODO : implement 'alias'
  // TODO : implement 'set' or 'export'

}

