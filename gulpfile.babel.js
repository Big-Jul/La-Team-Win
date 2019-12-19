import gulp from 'gulp';
import yargs from 'yargs';
import sass from 'gulp-sass';
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'autoprefixer';
import imagemin from 'gulp-imagemin';
import del from 'del';
import webpack from 'webpack-stream';
import uglify from 'gulp-uglify';
import named from 'vinyl-named';
import browserSync from 'browser-sync';

const server = browserSync.create();
const PRODUCTION = yargs.argv.prod;

const paths = {
	styles: {
		src: ['src/scss/main.scss'],
		dest: 'dist/css'
	},
	images: {
		src: 'src/images/**/*.{jpg,jpeg,png,svg,gif,ico}',
		dest: 'dist/images'
	},
	scripts: {
		src: ['src/js/main.js'],
		dest: 'dist/js'
	},
	misc: {
		src: ['src/**/*','!src/{images,js,scss}', '!src/{images,js,scss}/**/*'],
		dest: 'dist'
	},
}

export const serve = (done) => {
	server.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
	done();
}

export const reload = (done) => {
	server.reload();
	done();
}

export const clean = () => {
	return del(['dist']);
}

export const styles = (done) => {
	return gulp.src(paths.styles.src)
		.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
		.pipe(sass().on('error',sass.logError))
    .pipe(gulpif(PRODUCTION, postcss([ autoprefixer ])))
		.pipe(gulpif(PRODUCTION, cleanCss({compatibility:'ie8'})))
		.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(gulp.dest(paths.styles.dest))
		.pipe(server.stream());
}

export const images = () => {
	return gulp.src(paths.images.src)
		.pipe(gulpif(PRODUCTION, imagemin()))
		.pipe(gulp.dest(paths.images.dest));
}

export const watch = () => {
	gulp.watch('src/scss/**/*.scss', styles);
	gulp.watch('src/js/**/*.js', gulp.series(scripts, reload));
	gulp.watch('**/*.html', reload);
	gulp.watch(paths.images.src, gulp.series(images, reload));
	gulp.watch(paths.misc.src, gulp.series(copy, reload));
} 


export const copy = () => {
	return gulp.src(paths.misc.src)
		.pipe(gulp.dest(paths.misc.dest));
}

export const scripts = () => {
	return gulp.src(paths.scripts.src)
	.pipe(named())
	.pipe(webpack({
		module: {
			rules: [
				{
					test: /\.js$/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}
			]
		},
		output: {
			filename: '[name].js'
		},
		externals: {
			jquery: 'jQuery'
    },
    mode: PRODUCTION ? 'production' : 'development',
		devtool: !PRODUCTION ? 'inline-source-map' : false
	}))
	.pipe(gulpif(PRODUCTION, uglify()))
	.pipe(gulp.dest(paths.scripts.dest));
}

export const dev = gulp.series(clean, gulp.parallel(styles, scripts, images, copy), serve, watch);
export const build = gulp.series(clean, gulp.parallel(styles, scripts, images, copy));

export default dev;