var path  = require('path');

fis.config.set('settings.postprocessor.jswrapper.type', 'amd');

// 更多 roadmap.path 配置，请查看 http://fis.baidu.com/docs/advance/roadmap.html
fis.config.set('roadmap.path', [

    {
        reg: 'components/**/*.js',
        isMod: true
    },

    // 下划线打头的一般都是被 inline 的文件，所以不需要发布，同时也不需要优化处理。
    {
        reg: '**/_*.*',
        release: false,
        useAMD: false,
        useOptimizer: false
    },

    // 不是 isMode 不会在 map.json 里面。
    // 依靠它来读取 html 文件的依赖。
    {
        reg: '**.html',
        isMod: true
    }
].concat(fis.config.get('roadmap.path', [])));

fis.config.set('modules.postprocessor.html', 'require-async');
fis.config.set('modules.postprocessor.js', 'jswrapper, require-async');

// 开起 autuload, 好处是，依赖自动加载。
fis.config.set('modules.postpackager', 'autoload');

fis.config.set('modules.parser.scss', 'sass');
fis.config.set('modules.parser.sass', 'sass');
fis.config.set('roadmap.ext.scss', 'css');
fis.config.set('roadmap.ext.sass', 'css');

fis.config.set('settings.parser.sass.include_paths', [
    path.join(__dirname, 'components/compass-mixins'),
    path.join(__dirname, 'scss')
]);


// 使用 depscombine 是因为，在配置 pack 的时候，命中的文件其依赖也会打包进来。
fis.config.set('modules.packager', 'depscombine');
fis.config.set('pack', {
    'pkg/index.css': 'index.html',
    'pkg/index.js': 'index.html'
});
