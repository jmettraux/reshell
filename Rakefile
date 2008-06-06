
require 'rubygems'

require 'rake'
require 'rake/clean'
#require 'rake/packagetask'
#require 'rake/gempackagetask'
#require 'rake/rdoctask'
require 'rake/testtask'


#
# MINIFYING

require 'rubygems'
require 'jsmin' # sudo gem install jsmin

SOURCE = 'reshell.js'


#
# task minify
#
task :minify do

  target = File.open "reshell-min.js", "w"

  File.open "public/js/#{SOURCE}", "r" do |sourcefile|
    target.puts(JSMin.minify(sourcefile))
  end

  puts
  puts "..minified to reshell-min.js"
  puts
end

