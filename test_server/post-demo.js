var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var expressWs = require('express-ws')(app);

app.use(express.static('public'));

// app.get('/index.htm', function (req, res) {
//     res.sendFile( __dirname + "/" + "index.htm" );
// })

// 解决跨域问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.ws('/ws', function(ws, req) {
  // util.inspect(ws);
  console.log(ws.token);
  function cd() {
    var response = {"code":2004 ,"data":{"items":[
          {"acount":"123456", "name":"王倩", "registersNum":Math.round(Math.random()*10), "lecturesNum":1, "recommendNum":1},
          {"acount":"123457", "name":"李本伟", "registersNum":Math.round(Math.random()*10), "lecturesNum":1, "recommendNum":1}
        ]}};
    try {
      ws.send(JSON.stringify(response))
    }catch (e) {
      console.log(e)
    }
  }
  function cd1() {
    var response = {"code":2007 ,"data":{"items":[
          {"acount":"123456", "name":"王倩", "registersNum":Math.round(Math.random()*10), "lecturesNum":1, "recommendNum":1},
          {"acount":"123457", "name":"李本伟", "registersNum":Math.round(Math.random()*10), "lecturesNum":1, "recommendNum":1}
        ]}};
    try {
      ws.send(JSON.stringify(response))
    }catch (e) {
      console.log(e)
    }
  }
  var obj = setInterval(cd, 1000);
  var obj1 = setInterval(cd1, 1000);

  ws.on('message', function(msg) {
    console.log('_message');
    console.log(msg);
    // ws.send(JSON.stringify());

  });
});

app.post('/login', bodyParser.json(), function (req, res) {
    console.log(req.body);
    if (req.body.account == "admin" && req.body.password=="123456"){

        var response = {
            "loginFlag":"success",
            "userFlag":"admin",
            "userName":"马飞飞",
            "token":"3424234523"
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
            "userFlag":"doctor",
            "token":"3424234523"
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

});

app.post('/admin/addService', bodyParser.json(), function (req, res) {
  console.log(req.body);
  var response = {
      "status":2000
  };
  console.log(response);
  res.end(JSON.stringify(response));
  // 输出 JSON 格式
});

app.post('/admin/servicelist', bodyParser.json(), function (req, res) {
  var response = {"code":20000,"data":{"items":[{"id":"810000201402125212","title":"Tpis yplfhfitoh dpvbwwtqf qgq unlft spgldk rjbyrqh strnjt qwltq mqgrwkzw xsjnn.","status":"draft","author":"name","display_time":"1976-12-18 14:08:21","pageviews":539},{"id":"420000201401084073","title":"Epptgld ksypmlk evsq xmbohxrml lieee hiju wtsxoup xifbj cusnruqft etod cnzo.","status":"deleted","author":"name","display_time":"2016-11-11 13:01:42","pageviews":2421},{"id":"150000198003091286","title":"Drvry iseh gvdkws qxhh ubniycb ismsfkfle ascnd fyq qupana cjlp sfugrw wtnpbobkq hhwelcqlh hbuyl xqrrkhtq dmck.","status":"draft","author":"name","display_time":"1978-11-07 23:24:43","pageviews":2875},{"id":"990000197201192151","title":"Bxcw ynogilkemg zolhksed evdlg rojfr evmv tfhoy likboxx nfdwk thye ybteof qmxsv jlkfcfpgr huubr gvqo.","status":"published","author":"name","display_time":"1971-08-16 03:50:14","pageviews":3318},{"id":"440000199006063305","title":"Psij cbqgiy djcpuaq fksyhh hfunywwwvw ercjtnxe yjocnqin qtsdzcwql vbhdummpm pqxjsnelr legye fgl jxxbprj gqaqbtbt vuxxhwhtj ltewqecb ciwjqrm nxcyhfhqbm bytogxdoug pnwnmouww.","status":"draft","author":"name","display_time":"1987-12-07 16:51:11","pageviews":782},{"id":"350000197502144058","title":"Rngtfaehq odxvest zsrwk etvoaml rduvjzqow bmkwu yiwgowiry cun glqh ewhpdmzjx iitz jix vvyy.","status":"deleted","author":"name","display_time":"1975-08-05 17:22:20","pageviews":3955},{"id":"22000020050629186X","title":"Vjwboq wbyt obwsk fvmorgnesg abbb cvxxunt ghooswk coybjeqlk fqzmrxx ipyrqdy qtqydcd oyfgkg wrujpoeck erllipmr jqfr unpapjxbvx fhnbipsep eppnfdmsu.","status":"draft","author":"name","display_time":"1976-09-11 21:04:05","pageviews":4432},{"id":"150000200905167104","title":"Lnhnidgu nfirrqgdgt wtvyn qltu jkxhqmj crvpxej fgq qvni mkef btliu kdcshkpg upp qslwhqoj twsykvpyu yuvmgyobx mwn.","status":"deleted","author":"name","display_time":"2007-06-05 05:59:20","pageviews":1935},{"id":"640000200111296250","title":"Vwxyjwbr fugdf vtrycch bmnvmd vpezmvewl wfmhou jifqsrwou chyivceqf yfxrco bhcvgkzm kkkqfre acsxt.","status":"draft","author":"name","display_time":"1983-09-01 03:20:14","pageviews":3786},{"id":"500000198506037965","title":"Fvfwbamii qnwhkl xyknuun diqxopmih toqj ypmdncats jfsds hzg cftkrkc iocsvv pckron yxdptsjd flfcsmu.","status":"draft","author":"name","display_time":"1978-01-06 22:50:14","pageviews":4428},{"id":"430000201108244690","title":"Bnoo qljeg bpyglnq auczwouz bqerh jtyvqpnh uuvxruhj lezwrd qwmvm mxyroma sjptft hppoirkl kntrgl hicup owmdf cpfag evfycf vbfepik ffp.","status":"draft","author":"name","display_time":"2014-11-09 16:16:32","pageviews":1190},{"id":"650000199409181145","title":"Nelxe hgcyahxi jgrwijtla dzhqlo inqhhj hsfcqs qfcsinyoj mtmblt idtoth knambrx jgjqhprql sqwou hnpcivt.","status":"draft","author":"name","display_time":"1987-12-26 05:09:31","pageviews":1297},{"id":"420000197108215223","title":"Ktkqcdta zmfrddilh qpucovdds pggew eqolggv pbtpc yin podb swt uof uoxzq.","status":"draft","author":"name","display_time":"2014-09-07 07:29:40","pageviews":3646},{"id":"530000197803231554","title":"Mrnd zxgt voukc upjvecdtrl izkqchjh miwzdjbi qyq rbltwgqoz bwjxvwcqe rjjj tfvuuvl gopb ajjitw ldsupg ttfp.","status":"deleted","author":"name","display_time":"1995-01-22 03:19:58","pageviews":1858},{"id":"450000198106121629","title":"Vexgbnbkeq seoc oifnwghwln chcbgpsix nhjueez zbk czulfkrod fcpwubon xrwwvebxv zkfgwn srlbigi pglghlxemk mxvoyms lvvb gegx mcy rzrkfr vyisvceoem.","status":"deleted","author":"name","display_time":"2013-03-25 12:47:35","pageviews":750},{"id":"120000197308262269","title":"Ofwqliz ckht ogzbapi ydlxgygrsw jmkcf bku timosjm elsegqbe apuwmbna njzydgkh mwgs wbu cyhlpkbly uese ugbfrf lonjbda rjcigtw.","status":"published","author":"name","display_time":"1998-03-29 01:33:04","pageviews":3170},{"id":"610000201503195351","title":"Ori lybn ceunboo llidcsjn lngkjng wsglo njsofdigip tuoevsct wjnwn ptrjnzydsr thjvqkhyb umiid vhasfuiv mnqxu.","status":"draft","author":"name","display_time":"1997-04-12 17:23:38","pageviews":1282},{"id":"520000199004097181","title":"Vfokoogv cpwqr vmmhhh rpflrr dwuvew wnhruub ibxjip pdgytpw brdubfo lwnboxdh.","status":"deleted","author":"name","display_time":"1993-08-18 00:37:06","pageviews":549},{"id":"430000201001026677","title":"Hpxqrsdct jucl kmboi mvhkkj txlztvrg riemzccwmx kifuo jawsxwj ujma xeydwevf rjled rusqgspqw ujcmsfs flftfnrrb xqc erbebh nhmzmevmdz.","status":"draft","author":"name","display_time":"1994-04-29 21:54:22","pageviews":2993},{"id":"220000200209022786","title":"Qyxzhn mbqjm wqft ncxh magkxpyk nusgl hvrmchlpb hetehnlo dktpy rtxzqzdly etnsh acqqjms jcbtkrsc xlhkrnt errveele pwdf onxhei szpy dtux.","status":"draft","author":"name","display_time":"1970-10-07 00:13:03","pageviews":3491},{"id":"450000199907315014","title":"Cpmbckzqq oelalb siclhyqoqr pveybqhyyb czwukwgh gygwzbju retcxkuh juzgludz hteict dbnk ftyzxl.","status":"deleted","author":"name","display_time":"1972-08-25 11:19:48","pageviews":3572},{"id":"510000201308262105","title":"Elborm hxzwdx hjjfwau xofrcvuq ibbptulgc yyrybyb uhlalwl cfijamh xkvtnbopz jme civxjxvn gswruysx jjcvqh ljt gkasnypgh.","status":"draft","author":"name","display_time":"1973-07-30 18:11:02","pageviews":4317},{"id":"630000198808242971","title":"Zwvbb tlzubalax gmij eskh wajxow uwhwxos dlknited lytjw dyhhpmr rjugm fdvxkkm.","status":"draft","author":"name","display_time":"1979-05-02 11:33:05","pageviews":2433},{"id":"430000197604211928","title":"Bsvbdewoo xtbv blwqh soaj ylfxekjdd xorcivg lcqmn raelt rck plb nspywseumf rznjqqqw qgig kfgk ssgdc qhqvqgf uleyrae qqmdlt xbgukmpd.","status":"published","author":"name","display_time":"1972-08-11 20:04:13","pageviews":2281},{"id":"210000200701023543","title":"Kyioiuxk kjwyyisp jqoyfcwxc oafbi qenxwap erwffofgby xfpii yijci vcgix yryyogz toyqlle bfodkk rxwjjvew svvj qjjordwm vgn uvlnin jixaki yotapedf.","status":"published","author":"name","display_time":"2003-03-25 22:14:17","pageviews":3927},{"id":"36000020111018174X","title":"Bmpjjgl jmhtnwgfrg cvtvzq wxuj ybybusqm hnnhjqkuv cqsi vbtmj lmiabx jnjl uxlous pesgliu.","status":"published","author":"name","display_time":"1977-04-10 13:24:16","pageviews":1636},{"id":"46000019790615862X","title":"Sojqresliy mqsnu rfzvvwgh jlkpt dxhbfrnx rluttbuty ytbve tcsijzpty dbs ixiumhkphg olcbijruoe zrxxlzp bnollmhrrs rjygblcvb sod qpbglwlii xceqbaf wnisplgl okar.","status":"draft","author":"name","display_time":"1990-12-15 23:03:52","pageviews":561},{"id":"620000199801192732","title":"Wprqxfgtoj rwjqbd beb fkb lghupvkqs wwp prhxn phznhkqr zbgbwks vsovncjmhk tcaz toac.","status":"deleted","author":"name","display_time":"1993-04-17 18:11:51","pageviews":2280},{"id":"610000199201115352","title":"Klnva desncxze kur kfrfumsgo vkvwhlen uwnrbwdg klzlnmuwx ibpldil fiwcd euxnmoq fljnl ublpx nyudqvp gpqqcmccg eqxa ejdvyevqr terpo esdefoqew uholtjk.","status":"published","author":"name","display_time":"2007-07-27 18:31:09","pageviews":3761},{"id":"61000019700226521X","title":"Wsevpi fiebtvkr zxh nsaowutfx ppdfzi zximhfosi fwpjze mkqdg dphgid fqq viifwgsh hkp usdtbns ehowcxg ywjmh khpcl.","status":"draft","author":"name","display_time":"1976-07-09 01:52:44","pageviews":4444}]}};
  console.log(req.headers.cookie);
  // console.log(response);
  res.end(JSON.stringify(response));
});

// 传文件
var multer = require('multer')
const upload = multer({ dest: 'uploads/' });
app.use(upload.single('file')); //

app.post('/admin/changeDoctor', (req, res)=>{
  console.log(req.headers.cookie);
  console.log(req.body);//获取到的age和name
  console.log(req.file);//获取到的文件
  //做些其他事情
})

var server = app.listen(8082, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

});


