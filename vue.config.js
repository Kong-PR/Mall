module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                // 默认@对应src
                'assets': '@/assets',
                'common': '@/common',
                'network': '@/network',
                'components': '@/components',
                'views': '@/views',
            }
        }
    },
    lintOnSave: false
}