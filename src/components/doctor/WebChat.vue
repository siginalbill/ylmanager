<template>

  <div class="app-container">
    <p></p>
    <div id="agora_remote"></div>
    <div id="agora_local"></div>
    <el-button @click="setDown">结束问诊</el-button>
  </div>
</template>

<script>
  // 集成客户端
  import AgoraRTC from 'agora-rtc-sdk'
  // 用 AgoraRTC.createClient 方法创建 Client 对象，设置 mode 和 codec

  var client = AgoraRTC.createClient({mode: 'live', codec: "h264"});
  let room_id = null;

  export default {
    data() {
      return {
        form: {},

      }
    },
    created(){

      room_id = this.$route.query.id;
      if (room_id == null){
        this.$message({
          message: "无连接请求",
          type: 'error'
        });
        this.$router.push('/doctor');
      }

      // 创建 Client 对象后，将项目的 App ID 填入 client.init 方法，即可初始化 Client。

      client.init('df82778c111c4c57aa3f13fbca9f40cc', function () {
        console.log("AgoraRTC client initialized");
      }, function (err) {
        console.log("AgoraRTC client init failed", err);
      });
      // 初始化 Client 对象完成后， 在成功的回调中调用 client.join 方法。
      //
      // 在 client.join 方法中填入以下参数值：
      //
      // tokenOrKey：如果安全要求不高，将参数值设为 null；如果安全要求高，传入从你的服务端获得的 token 或 Channel Key 值。详情参考 校验用户权限。
      // channel：频道名称。
      // uid：用户的 ID， 整数，需保证唯一性。 如果不指定，即用户 ID 设置为 null，回调会返回一个服务器分配的 uid

      let uid = null;
      client.join(null, room_id, null, function(id) {
        uid = id;
        console.log("User " + uid + " join channel successfully");
        localStreamStart();
      }, function(err) {
        console.log("Join channel failed", err);
      });
      // 获取uid成功后执行
      function localStreamStart() {
        var localStream = AgoraRTC.createStream({
          streamID: uid,
          audio: true,
          video: false,
          screen: false}
        );
        // 接下来调用 stream.init 方法初始化创建的音频流。
        localStream.init(function() {
          console.log("getUserMedia successfully");
          localStream.play('agora_local');

          // 初始化完成后，在成功的回调中通过 client.publish 方法发布音频流。

          client.publish(localStream, function (err) {
            console.log("Publish local stream error: " + err);
          });

        }, function (err) {
          console.log("getUserMedia failed", err);
        });

        client.on('stream-published', function (evt) {
          console.log("Publish local stream successfully");
        });

        // 订阅远端音频流步骤如下：
        //
        // 监听 client.on('stream-added') 事件, 当有人发布音频流到频道里时，会收到该事件。
        // 收到事件后，在回调中调用 client.subscribe 方法订阅远端音频流。

        client.on('stream-added', function (evt) {
          var stream = evt.stream;
          console.log("New stream added: " + stream.getId());

          client.subscribe(stream, function (err) {
            console.log("Subscribe stream failed", err);
          });
        });
        client.on('stream-subscribed', function (evt) {
          var remoteStream = evt.stream;
          console.log("Subscribe remote stream successfully: " + remoteStream.getId());
          // remoteStream.play('agora_remote' + remoteStream.getId());
          remoteStream.play('agora_remote');
        })
      }
    },
    methods: {
      openWarn(message) {
        this.$alert(message, '警告', {
          confirmButtonText: '确定',
          callback: action => {
            // 确认操作回调函数
          }
        });
      },
      openError(message) {
        this.$alert(message, '错误', {
          confirmButtonText: '确定',
          callback: action => {
            // 确认操作回调函数
          }
        });
      },
      setDown(){
        client.leave(function () {
          console.log("Leave channel successfully");
        }, function (err) {
          console.log("Leave channel failed");
        });
        this.socketApi.sendSock({code:2012, message:"客户端主动挂断"});
        this.$message({
          type: 'success',
          message: '已挂断!'
        });
        this.$router.push('/doctor')
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

