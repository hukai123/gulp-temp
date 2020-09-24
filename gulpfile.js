var gulp = require('gulp');                    //依赖gulp
var sass = require('gulp-sass');               //编译sass文件to css文件
var connect = require('gulp-connect');         //开启服务自动刷新
var concat = require('gulp-concat');           //合并文件
var uglify = require('gulp-uglify');           //压缩js文件
var rename = require('gulp-rename');           //重命名插件
var minifyCSS = require('gulp-minify-css');    //压缩最小化css文件
var imagemin = require('gulp-imagemin');       //压缩最小化图片
var del = require('del');                      //node内置删除文件
// var sourcemaps = require("gulp-sourcemaps");   //调试看到源文件，demo里面没有加
// var proxyMiddleware = require('http-proxy-middleware');//用于把请求代理转发到其他服务器的中间件。
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');//添加版本号
var notify = require('gulp-notify');


gulp.task('copy-index',function(){             //控制台输入gulp copy-index 
    // return gulp.src('index.html')
    return gulp.src(['index.html','src/html/**/*.html'])
           .pipe(gulp.dest('dist'))
           .pipe(connect.reload());            //热加载
});

gulp.task('copy-js',function(){             //控制台输入gulp copy-index 
    return gulp.src(['src/js/flexible.js','src/js/vue.min.js'])
           .pipe(gulp.dest('dist/js'))
           .pipe(connect.reload());            //热加载
});

gulp.task('images',function(){   
    return gulp.src('src/images/**/*')         //images目录下所有的文件(包括多级子目录下的文件)
           .pipe(imagemin())                   //最小化压缩images
           .pipe(gulp.dest('dist/images'))
           .pipe(connect.reload());            //热加载
});

gulp.task('data',function(){   
    return gulp.src(['src/xml/*.xml','src/json/*.json','!src/json/test-*.json'])   //复制多个文件，前面加！号就是不包含
           .pipe(gulp.dest('dist/data'))
           .pipe(connect.reload());            //热加载;
});

gulp.task('sass',function(){                   
    // return gulp.src(['src/css/**/*.scss'])
    return gulp.src(['src/css/index.scss','src/css/counter.scss'])
           .pipe(sass())     				   //用gulp-sass插件编译scss到css
           //.pipe(gulp.dest('dist/css'))
           .pipe(concat('main.css'))
           .pipe(gulp.dest('dist/css'))
           .pipe(minifyCSS())                  //最小化css
           .pipe(rename('main.min.css'))       //重命名css
           .pipe(gulp.dest('dist/css'))
           //.pipe(rename({suffix:'.min'}))    //重命名css
           .pipe(rev())                        //生成版本号
           .pipe(gulp.dest('dist/css'))
           .pipe(rev.manifest())               //生成文件 hash 编码并生成 rev-manifest.json 文件
           .pipe(gulp.dest('rev/css'))
           .pipe(connect.reload());            //热加载;
});

gulp.task('scripts',function(){       
    return gulp.src(['src/js/jquery-1.11.3.js','src/js/swiper-3.3.1.min.js','src/js/index.js'])
            .pipe(concat('vendor.js'))	       //用gulp-concat合并文件
            .pipe(gulp.dest('dist/js'))         //合并文件并给合并后的文件取名
            .pipe(uglify())                     //压缩js最小化
            .pipe(rename('vendor.min.js'))      //重命名
            .pipe(gulp.dest('dist/js'))
            .pipe(rev())                        //生成版本号
            .pipe(gulp.dest('dist/js'))
            .pipe(rev.manifest())               //生成文件 hash 编码并生成 rev-manifest.json 文件
            .pipe(gulp.dest('rev/js'))
            .pipe(connect.reload());
});

gulp.task('revHtml',function(){                //动态替换版本号
    return gulp.src(['rev/**/*.json','index.html','src/**/*.html'])
            // .pipe(revCollector({
            //     replaceReved: true, // 设置replaceReved标识, 用来说明模板中已经被替换的文件是否还能再被替换,默认是false
            // }))
            .pipe(revCollector())
            .pipe(gulp.dest('dist'))
            .pipe(notify({ message: '替换版本号完成！' }))
            .pipe(connect.reload());            //热加载
});

gulp.task('clean',function(){   
    return del(['dist/**/*']);  
    // return del([
    //     'dist/index.html',
    //     'dist/js/**/*',  //删除dist/js目录下全部内容
    //     'dist/css/**/*',
    //     'dist/images/**/*',
    //     'dist/data/**/*',
    //     //'!dist/mobile/deploy.json' 我们不希望删掉这个文件，所以我们取反这个匹配模式
    //   ]);
    
});

gulp.task('build',gulp.series('clean',gulp.parallel('clean','copy-index','copy-js','images','data','sass','scripts')),function(){     //build任务依赖其他几个任务，同时执行他依赖的几个任务，等几个都完成后再执行自己的回调函数（输出编译成功）
    console.log('编译成功！');
});

gulp.task('server',function(){   
    connect.server({
    	root: 'dist',
    	livereload: true,
    	//port:80,           //默认是8080
    })
});

gulp.task('watch',function(){                  //监视任务
    gulp.watch(['index.html','src/html/**/*.html'],gulp.series('copy-index'));   //当index.html变化时执行copy-index任务
    gulp.watch('src/images/**/*',gulp.series('images'));
    gulp.watch(['src/xml/*.xml','src/json/*.json','!src/json/test-*.json'],gulp.series('data'));
    gulp.watch('src/css/**/*.scss',gulp.series('sass'));
    gulp.watch(['src/js/index.js','src/js/jquery-1.11.3.js'],gulp.parallel('scripts'));
});

// gulp.task('default',gulp.series('build','revHtml', gulp.parallel('server','watch')));      //默认任务,控制台只需要输入gulp
gulp.task('default',gulp.series('build', gulp.parallel('server','watch')));      //默认任务,控制台只需要输入gulp





//gulp.src('images/*.{png,jpg}')    //images目录下所有的png/jpg文件(不包括多级子目录下的文件)
//gulp.src('images/*.jpg')   //images目录下所有jpg的文件(不包括子目录下的文件)
//gulp.src('images/*')       //images目录下所有的文件(不包括子目录下的文件)



// 不要再用gulp 3的方式指定依赖任务，你需要使用gulp.series和gulp.parallel，因为gulp任务现在只有两个参数。　
// gulp.series：按照顺序执行
// gulp.parallel：可以并行计算

// gulp.task('my-task',gulp.series('a','b','c',() => {
//     // Do something after a,b, and c are finished.
// }));
 
// gulp.task('build',gulp.parallel('style','script','images',() => {
//     // build the website.
// }));
// gulp.task('my-task',gulp.series('a',gulp.parallel('style','script','image'),'b','c',() => {
//     // Do something after a, b, and c are finished.
// }));

// ES6 转 ES5 （gulp-babel、babel-preset-es2015、babel-core）
// 注意，避免 gulp-babel 编译时出现Cannot find module '@babel/core'， gulp-babel 的版本建议安装7.0.1 ($ npm install gulp-babel@7 --save-dev)