var express = require('express');
var app = express();
var promMid = require('express-prometheus-middleware');
var fs = require('fs');
//limit ips (only allow prometheus)
app.use('/metrics', function (req, res, next) {
    let ip;
    if (req.headers['x-forwarded-for']) {
        ip = req.headers['x-forwarded-for'].split(",")[0];
    } else if (req.connection && req.connection.remoteAddress) {
        ip = req.connection.remoteAddress;
    } else {
        ip = req.ip;
    }
    console.log("Check Metrics IP: " + ip);
    // limit ip call service
    if (!['::ffff:192.168.10.111', '::ffff:192.168.1.106'].includes(ip)) {
        res.json({ message: 'IP Invalid!', resultCode: 0 });
        return "";
    }
    next();
});
app.use(promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5]
}))
app.get('/home', (req, res) => {
    fs.readFile('index.html', function(err, data) {
    if (!err) {
        res.writeHead(200, {
        'Content-Type': 'text/html'
        });
        res.write(data);
        res.end();
    } else {
        console.log('error');
    }
    });
});
var port = process.env.PORT || 3000
var server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
