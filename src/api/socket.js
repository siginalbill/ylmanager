var websock = null;
var global_callback = ()=>{};
var serverPort = '8082';	//webSocket连接端口

// 获取ws地址
function getWebIP(){
  return 'localhost';
}

// 初始化weosocket
function initWebSocket(params){
  //ws地址
  var wsuri = "ws://" +getWebIP()+ ":" + serverPort + '/ws' + "?" + params;
  websock = new WebSocket(wsuri);
  websock.onmessage = function(e){
    websocketonmessage(e);
  };
  websock.onclose = function(e){
    websocketclose(e);
  };
  websock.onopen = function () {
    websocketOpen();
  };

  //连接发生错误的回调方法
  websock.onerror = function () {
    this.$message.error("WebSocket连接发生错误");
  }
}

// 实际调用的方法 发送数据,回调方法
function sendSock(agentData){
  // global_callback = callback;
  if (websock.readyState === websock.OPEN) {
    //若是ws开启状态
    websocketsend(agentData)
  }else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData);
    }, 1000);
  }else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function () {
      sendSock(agentData);
    }, 1000);
  }
}

// 设置数据接收回调函数
function setCallback(callback) {
  global_callback = callback;
}

// 数据接收
function websocketonmessage(e){
  // console.log(global_callback);
  global_callback(e.data);
}

// 数据发送
function websocketsend(agentData){
  websock.send(JSON.stringify(agentData));
}

// 关闭
function websocketclose(e){
  console.log("connection closed (" + e.code + ")");
}

function websocketOpen(e){
  console.log("连接成功");
}

// initWebSocket();

export{sendSock, initWebSocket, setCallback}
