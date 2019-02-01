var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

// app.get('/index.htm', function (req, res) {
//     res.sendFile( __dirname + "/" + "index.htm" );
// })

// 解决跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post('/login', bodyParser.json(), function (req, res) {
    console.log(req.body)
    if (req.body.account == "admin" && req.body.password=="123456"){

        var response = {
            "loginFlag":"success",
            "userFlag":"admin",
            "userName":"马飞飞"
        };
        console.log(response);
        res.end(JSON.stringify(response));
    }else  if (req.body.account == "service" && req.body.password=="123456"){
        var response = {
            "loginFlag":"success",
            "userFlag":"service"
        };
        console.log(response);
        res.end(JSON.stringify(response));
    } else  if (req.body.account == "doctor" && req.body.password=="123456"){
        var response = {
            "loginFlag":"success",
            "userFlag":"doctor"
        };
        console.log(response);
        res.end(JSON.stringify(response));
    }
    else {
        var response = {
            "loginFlag":"failed"
        };
        console.log(response);
        res.header()
        res.end(JSON.stringify(response));
    }
    // 输出 JSON 格式

})

var server = app.listen(8082, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
