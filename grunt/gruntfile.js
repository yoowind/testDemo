/*
参考代码网址：
http://www.gruntjs.net/getting-started
 */
// 执行压缩、合并代码、优化图片 操作
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //清除目录
    clean: {
      all: ['dist/*'],
      unImg: ["dist/*", "!dist/images"]
    },
    // 复制文件
    copy: {
      main: {
        files: [
          {expand: true, src: ['index.html', 'favicon.ico'], dest: 'dist'}
        ]
      }
    },
    //压缩图片
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 7,
          pngquant: true
        },
        files: [{expand: true, 
            cwd: 'images/', 
            src: ['**/*.{png,jpg,jpeg,gif,webp,svg}'], 
            dest: 'dist/images'
        }]
      }
    }
  });
  // 加载任务的插件，告诉grunt我们将使用下面这些插件
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
 
	grunt.loadNpmTasks('grunt-contrib-watch');//检测文件添加修改 等
	grunt.loadNpmTasks('grunt-nodemon');//监听app.js，有改动会自动重启
	grunt.loadNpmTasks('grunt-concurrent');//针对慢任务，sass less
	grunt.option('force', true);//不因为语法问题中断服务
  //告诉grunt我们在终端输入grunt时需要做些什么【有先后顺序】
	grunt.registerTask('default',['concurrent']);//注册任务
  // 压缩图片任务
  grunt.registerTask('images', ['clean', 'imagemin']);


};
