var gulp=require("gulp")
var connect=require("gulp-connect")
var watch=require("gulp-watch")
var sass=require("gulp-sass")

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
