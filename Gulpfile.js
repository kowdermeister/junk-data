var gulp = require('gulp');
var request = require('request');
var fs = require('fs');
var modify = require('gulp-modify');

var domainDir = 'data/list-of-domain-names';

gulp.task('tld-builder', function () {
	var writer = fs.createWriteStream(domainDir+'/tld.list');
	var stream = request('http://data.iana.org/TLD/tlds-alpha-by-domain.txt')
	.pipe(writer);

	stream.on('finish',function(argument) {		
		gulp.src(domainDir+'/tld.list').
		pipe(modify({
			fileModifier: function(file, contents) {
				return contents.split('\n').splice(1,contents.length-1).join('\n');
			}
		}))
		.pipe(gulp.dest(domainDir))
	})
});

gulp.task('default', ['tld-builder'], function () {
	console.log('yolo');
});