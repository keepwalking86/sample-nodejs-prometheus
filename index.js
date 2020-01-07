var express = require('express')
var app = express()
var promMid = require('express-prometheus-middleware');
var fs = require('fs');
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
