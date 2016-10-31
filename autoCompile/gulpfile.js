var gulp=require("gulp")
var connect=require("gulp-connect")		//重刷新页面
var watch=require("gulp-watch")			//页面检测
var sass=require("gulp-sass")			//sass编译
var rev=require("gulp-rev")			//打版本号
var revReplace=require("gulp-rev-replace")	//版本号重引用
var useref=require("gulp-useref")		//抓取页面要合并的文件
var filter=require("gulp-filter")		//过滤器
var uglify=require("gulp-uglify")		//js打包
var csso=require("gulp-csso")			//css打包
var imageMin=require("gulp-imagemin")		//图片压缩

gulp.task("connect",function(){
	connect.server({
		root:"../HUAWEIapp",
		livereload: true
	})
})

//----------html页面重刷新------------
gulp.task("index",function(){
	gulp.src("src/homePage/*.html")
	.pipe(connect.reload())
})
//-----------html部分结束------------

//----------这里是sass编译部分---------
gulp.task("sass",function(){
	return gulp.src("src/homePage/css/*.scss")
		.pipe(sass.sync().on("error",sass.logError))
		.pipe(gulp.dest("src/homePage/css"))
})
gulp.task("sass:watch",function(){
	gulp.watch(["src/homePage/css/*.scss"],["sass","index"])
})
//-------编译部分结束----------

//---------监听------------
gulp.task("watch",function(){
	gulp.watch(["src/homePage/*.html","src/homePage/css/*.css","src/homePage/js/*.js"],["index"])
})
//------监听部分结束----------
gulp.task("default",["connect","watch","sass:watch"])

// --------------打包部分------------------
gulp.task("package",function(){
	var jsFilter=filter(["**/*.js"],{"restore":"true"})
	var cssFilter=filter(["**/*.css"],{"restore":"true"})
	var indexHtmlFliter=filter(["**/*","!src/homePage/homePage.html"],{"restore":"true"})
	return gulp.src("src/homePage/homePage.html")
		.pipe(useref())
		.pipe(jsFilter)
		.pipe(uglify())
		.pipe(jsFilter.restore)
		.pipe(cssFilter)
		.pipe(csso())
		.pipe(cssFilter.restore)
		.pipe(indexHtmlFliter)
		.pipe(rev())
		.pipe(indexHtmlFliter.restore)
		.pipe(revReplace())
		.pipe(gulp.dest("./combined"))
})

gulp.task("imageMin",function(){
	return gulp.src("src/homePage/img/*")
		.pipe(imageMin())
		.pipe(gulp.dest("./combined/img"))
})

gulp.task("fontMove",function(){
	return gulp.src(["src/homePage/font/iconfont.*","!src/homePage/font/iconfont.css"])
			.pipe(gulp.dest("./combined/css"))
})

gulp.task("packageBag",["package","imageMin","fontMove"])

// ------------打包部分结束-------------------------
