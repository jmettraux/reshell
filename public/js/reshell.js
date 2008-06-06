
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
  this.count = 0;
  this.env = {};
  this.stdin = document.getElementById(this.prefix+"_stdin");
  this.stdout = document.getElementById(this.prefix+"_stdin");

  this.puts = function (text, type) {

    type = type || "out";
    
    var t = document.createElement('div');
    t.setAttribute('id', this.prefix+"_"+type+"_"+this.count);
    t.setAttribute('class', this.prefix+"_"+type);

    var tt = document.createTextNode(text);

    t.appendChild(tt);

    document.getElementById(this.prefix+"_stdout").appendChild(t);
  }

  this.eval = function () {

    var code = this.stdin.value;
    this.stdin.value = "";
    this.stdin.focus();

    this.puts("$ "+code, "in");

    if (code == '') return;

    var code = code.split(" ");
      // TODO : use regex for quote oriented splits

    var f = this.env[code[0]];

    if (f) f(code);
    else this.puts("unknow command '"+code[0]+"'");

    this.count++;
  }

  this.focus = function () {

      this.stdin.focus();
  }

  this.clear = function (args) {

      while(this.stdout.removeChild(this.stdout.lastChild)) {}
  }

  this.def = function (name, func) {

      this.env[name] = func;
  }

  //
  // some basic commands

  this.def('clear', this.clear);

  this.def('env', function (args) {

      var out = "";
      out += "nada0\n"
      out += "nada1"
      this.puts(out);
  });

}

