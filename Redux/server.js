/**
 * Created by Odin on 20.12.2016.
 */
var webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config');

var app = new(require('express'))();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath}));
app.use(webpackHotMiddleware(compiler));

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(error){
    if(error){
        console.log(error);
    } else {
        console.info('==> Listening on port %s. Open up http://localhost:%s in your browser.', port, port);
    }
});