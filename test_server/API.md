
目录
1.1	通用---	2
1.1.1	返回操作结果json	2
1.1.2	登录	2
1.2	管理员---	3
1.2.1	账号管理	3
1.2.1.1	添加客服	3
1.2.1.2	添加医生	3
1.2.1.3	修改账号	3
1.2.1.4	医生信息修改	4
1.2.2	客服管理--websocket	4
1.2.2.1	所有客服	5
1.2.2.2	在线客服	6
1.3	客服---	8
1.3.1	信息发布	8
1.3.1.1	健康讲座上传	8
1.3.1.2	体检推荐发布	8
1.3.1.3	医生信息录入	8
1.3.2	在线挂号	9
1.3.2.1	显示挂号列表---websocket	9
1.3.2.2	挂号反馈(隐藏）	9
1.3.3	语音问诊调配 -- websocket	9
1.3.3.1	获取在线医生列表	9
1.3.3.2	获取用户列表	9
1.3.3.3	医生分配	9
1.4	医生---	10
1.4.1	健康报告	10
1.4.1.1	用户列表	10
1.4.1.2	健康报告录入	10
1.4.2	语音问诊	10


1.1	通用---
1.1.1	返回操作结果json
request：任何操作 根据token进行权限检查
Response：{"status":2000} // 成功
{"status":2001, "message":"账号不存在"} // 操作失败，message为错误原因
1.1.2	登录
url：/login
post：{ account: '工号', password: '123456' }
 response：
// 登陆成功:
{ loginFlag: 'success',  userFlag: '共三类管理员/医生/客服: admin/doctor/service',  userName: '马飞飞',  token: '服务器根据工号生成token' }
// 登录失败：
{ loginFlag: 'failed' }
1.2	管理员---
1.2.1	账号管理
1.2.1.1	添加客服
url ： /admin/addService
post：//工号、密码、姓名
数据格式：{ account: '工号', name: '254235', pass: '234525' }
response：同1.1.1
1.2.1.2	添加医生
url：/admin/addDoctor
post：工号、密码、姓名
数据格式：{ account: '工号', name: '254235', pass: '234525' }
response：同1.1.1
1.2.1.3	修改账号
url：/admin/changeAccount
post：// 工号、密码、姓名
数据格式：{ account: '被修改者的工号', type: '修改姓名或密码：changeName/changePass', value: '修改后的值' }
response：同1.1.1
1.2.1.4	医生信息修改
url：/admin/changeDoctor
post：// 照片、账号、姓名、科室、简介
// 修改界面，允许部分字段为空，数据库只修改非undefind值。
数据格式：{
  name: '姓名，可以为空',
  account: '143324，不为空',
  class: 'undefined，可以为空',
  blief: 'undefined，可以为空' }
// 上传文件参数，使用formDate
{ fieldname: 'file',
  originalname: '无标题21.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: 'uploads/',
  filename: 'bf09b6352bc463a92f943b866f5b3f04',
  path: 'uploads\\bf09b6352bc463a92f943b866f5b3f04',
  size: 93761 }
response：同1.1.1

1.2.2	客服管理--websocket
url:  ws://localhost:8082/ws?token=3424234523
说明： ws://ip地址:端口号/ws?token=服务器返回给用户的token值
	根据token获取用户账号>>>判断用户的类别和登录权限
1.2.2.1	所有客服
1.2.2.1.1	客户端主动请求数据
客户端发送数据格式：
{"type":"get", "method":"getServiceList","token":"3424234523"}
server onmessage回复数据:
成功：
{"code":2002 // 成功
,"data":{"items":[
{"acount":"", "name":"", "registersNum":5, "lecturesNum":1, "recommendNum":1}
, {"acount":"", "name":"", "registersNum":3, "lecturesNum":1, "recommendNum":1}
]}
}
// code：2002为成功，2003为失败
// data:数据字段
// items：json数组
// 数据依次为：工号、姓名、处理挂号单数、上传讲座数、上传体检推荐数
失败：
{
"code":2003, // 失败
"message":"失败原因"
}
1.2.2.1.2	服务端自动更新数据：
{"code":2004 // 主动更新
,"data":{"items":[
{"acount":"", "name":"", "registersNum":5, "lecturesNum":1, "recommendNum":1}
, {"acount":"", "name":"", "registersNum":3, "lecturesNum":1, "recommendNum":1}
]}
}
// code：数据类型
// data:数据字段
// items：json数组
// 数据依次为：工号、姓名、处理挂号单数、上传讲座数、上传体检推荐数
客户端回复:
{"code":2004 // 已收到
,"message":"调试信息"}

1.2.2.2	在线客服
说明：发送给客户端所有实时在线客服
1.2.2.2.1	客户端主动请求数据：
{"type":"get", "method":"getServiceOnLineList","token":"3424234523"}
server onmessage回复数据:
成功：
{"code":2005 // 成功
,"data":{"items":[
{"acount":"", "name":"", "registersNum":5, "lecturesNum":1, "recommendNum":1}
, {"acount":"", "name":"", "registersNum":3, "lecturesNum":1, "recommendNum":1}
]}
}
// code：2005为成功，2006为失败
// data:数据字段
// items：json数组
// 数据依次为：工号、姓名、处理挂号单数、上传讲座数、上传体检推荐数
失败：
{
"code":2006, // 失败
"message":"失败原因"
}

1.2.2.2.2	服务端自动更新数据：
{"code":2007 // 主动更新
,"data":{"items":[
{"acount":"", "name":"", "registersNum":5, "lecturesNum":1, "recommendNum":1}
, {"acount":"", "name":"", "registersNum":3, "lecturesNum":1, "recommendNum":1}
]}
}
// code：数据类型
// data:数据字段
// items：json数组
// 数据依次为：工号、姓名、处理挂号单数、上传讲座数、上传体检推荐数
客户端回复:
{"code":2007 // 已收到
,"message":"调试信息"}

1.3	客服---
1.3.1	信息发布
1.3.1.1	健康讲座上传
url：/service/uploadLecturetext
post： 标题、摘要、内容、
url：/service/uploadLecturevideo
post:标题、文件（mp4）
url：/service/uploadLectureaudio
post:标题、文件（avi）
1.3.1.2	体检推荐发布
url：/service/postRecommendation
post：图、摘要、具体内容
1.3.1.3	医生信息录入
url：/service/changeDoctor
post：// 照片、账号、姓名、科室、简介

1.3.2	在线挂号
1.3.2.1	显示挂号列表---websocket
url:  ws://localhost:8082/ws?token=3424234523
说明： ws://ip地址:端口号/ws?token=服务器返回给用户的token值
	根据token获取用户账号>>>判断用户的类别和登录权限
get：客户账号、用户姓名、科室、备注
1.3.2.2	挂号反馈(隐藏）
url: /service/postRegist
post：交易单号、挂号结果
1.3.3	语音问诊调配 -- websocket
url:  ws://localhost:8082/ws?token=3424234523
说明： ws://ip地址:端口号/ws?token=服务器返回给用户的token值
	根据token获取用户账号>>>判断用户的类别和登录权限
以下子模块均为websocket
1.3.3.1	获取在线医生列表
说明：通过websocket获取所有当前在线的医生，为客服提供支持
get：医生账号、科室、姓名
1.3.3.2	获取用户列表
说明：通过websocket获取所有等待挂号的用户
get：用户账号、用户姓名、备注
1.3.3.3	医生分配
说明：通过websocket确定医生和病人分配
post: 医生账号、客户账号、token
1.4	医生---
1.4.1	健康报告
1.4.1.1	用户列表
URL：/doctor/userList/
get：用户账号、姓名
1.4.1.2	健康报告录入
URL：/doctor/
post：用户账号、姓名、报告内容
1.4.2	语音问诊
语音问诊
¬¬¬¬¬¬¬¬¬¬¬

