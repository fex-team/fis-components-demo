var path  = require('path');

// 采用 amd 方案
fis.config.set('modules.postprocessor.html', 'amd');
fis.config.set('modules.postprocessor.js', 'amd');

// 更多 roadmap.path 配置，请查看 http://fis.baidu.com/docs/advance/roadmap.html
fis.config.set('roadmap.path', [

    // 下划线打头的一般都是被 inline 的文件，所以不需要发布，同时也不需要优化处理。
    {
        reg: '**/_*.*',
        release: false,
        useAMD: false,
        useOptimizer: false
    },

    // 设置  libs 目录下面的文件为 `isMod`，这样 js 文件会自动包装成 amd 模块。
    {
        reg: /^\/libs\/(.*)$/i,
        isMod: true
    }
].concat(fis.config.get('roadmap.path', [])));

fis.config.set('settings.parser.sass.include_paths', [
    path.join(__dirname, 'components/compass-mixins'),
    path.join(__dirname, 'scss')
]);

// 开起 autuload, 好处是，依赖自动加载。
fis.config.set('modules.postpackager', 'autoload');
fis.config.set('settings.postpackager.autoload.type', 'requirejs');
