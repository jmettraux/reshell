
= Reshell


== what's that ?

some kind of shell facility for the browser, inspired by the fine http://goosh.org


== how can I use it ?

It's a javascript

  sudo gem install jsmin
  git clone git://github.com/jmettraux/reshell.git
  cd reshell
  rake minify

Then you'll have a reshell-min.js file ready for your web app tree.

A simple example : http://github.com/jmettraux/reshell/tree/master/public/reshell.html

It boils down to :

  <script src="/js/reshell.js"></script>

  <div id="reshell_stdout"></div>
  <form onsubmit="reshell.eval(); return false;">
  $ <input id="reshell_stdin" type="text" />
  </form>

  <script>
    var reshell = new Reshell('reshell');
    reshell.def("alert", function(params) { alert("Aaaaalert !"); };
    reshell.focus();
  </script>


== base commands

clear    clears the shell
env      displays the current bindings in the shell environment


== mailing list

On the rufus-ruby list[http://groups.google.com/group/rufus-ruby] :

    http://groups.google.com/group/rufus-ruby


== issue tracker

http://rubyforge.org/tracker/?atid=18584&group_id=4812&func=browse


== source

http://github.com/jmettraux/reshell

    git clone git://github.com/jmettraux/reshell.git


== author

John Mettraux, jmettraux@gmail.com 
http://jmettraux.wordpress.com


== the rest of Rufus

http://rufus.rubyforge.org


== license

MIT

