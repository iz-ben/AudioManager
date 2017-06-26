const elixir = require('laravel-elixir');

var Task = Elixir.Task;
var closureCompiler = require('gulp-closure-compiler');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var pkg = require('./package.json');
var dateFormat = require('dateformat');
var now = new Date();

// Set the banner content
var banner = ['/*!\n',
    ' * AudioPlayer <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright ' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license %>\n',
    ' * Compiled '+ dateFormat() +'\n',
    ' */\n',
    ''
].join('');


Elixir.extend('minifyCss', function(opt_source, opt_destination) {

    var paths = {
        'src':opt_source || 'dist/css/audioplayer.css',
        'output':opt_destination || 'dist/css'
    };

    new Task('minifyCss', function()
    {
        return gulp.src(this.src)
            .pipe(cleanCSS({ compatibility: 'ie8' }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(header(banner, { pkg: pkg }))
            .pipe(gulp.dest(this.output));
    }, paths);

});

Elixir.extend('compile', function( opt_namespace, opt_sources, opt_output_file ) {

    var sources = opt_sources || [];

    var namespace = opt_namespace || 'AudioManager';

    var output_file = opt_output_file  || 'audiomanager.min.js';

    sources.push('src/js/**/*.js');

    sources.push('D:/Tools/Google/closure-library/closure/goog/**/*.js');

    new Task('compile', function()
    {
        return gulp.src(sources)
            .pipe(closureCompiler({
                /**
                 * Replace this with the path to where you
                 */
                compilerPath: 'D:/Tools/Google/Compiler/closure-compiler-v20170409.jar',
                fileName: output_file,
                compilerFlags: {
                    closure_entry_point: namespace,
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    define: [
                        "goog.DEBUG=false"
                    ],
                    externs: [
                        //'D:/Tools/Google/Externs/wordpress.js'
                    ],
                    extra_annotation_name: 'jsx',
                    only_closure_dependencies: true,
                    // .call is super important, otherwise Closure Library will not work in strict mode.
                    output_wrapper: '(function(){%output%}).call(window);',
                    warning_level: 'VERBOSE'
                }
            }))
            .pipe(header(banner, { pkg: pkg }))
            .pipe(gulp.dest('dist/js'));
    });

});



elixir(function(mix) {
    mix.sass('./src/sass/audioplayer.scss','./dist/css/audioplayer.css');
    mix.minifyCss();
    mix.compile();
});