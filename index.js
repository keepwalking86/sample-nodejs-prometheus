var express = require('express')
var app = express()
//Declare prometheus
var promMid = require('express-prometheus-middleware');
app.use(promMid({
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5]
}))
var port = process.env.PORT || 3000
var server = app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
