<template>

  <div class="app-container">
    <p></p>
    <el-carousel :interval="5000" arrow="always" >
      <el-carousel-item v-for="item in imageList" :key="item" >
        <!--<h3>{{ item }}</h3>-->
        <img :src="item" alt="ddd">
      </el-carousel-item>
    </el-carousel>
    <p></p>
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="用户账号" >
        <!--栅格化控制长度-->
        <el-col :span="20">
          {{form.clientID}}
        </el-col>
      </el-form-item>

      <!--<el-form-item label="用户姓名">-->
        <!--<el-col :span="20">-->
          <!--<el-input v-model="form.name"/>-->
        <!--</el-col>-->
      <!--</el-form-item>-->

      <!--<el-form-item label="内容">-->
        <!--<el-col :span="20">-->
          <!--&lt;!&ndash;通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数&ndash;&gt;-->
          <!--<el-input v-model="form.text"-->
                    <!--:autosize="{ minRows: 5, maxRows: 20}"-->
                    <!--type="textarea"/>-->
        <!--</el-col>-->
      <!--</el-form-item>-->
      <el-form-item label="上传报告">
        <el-col :span="20">
          <el-upload
            class="upload-file"
            drag
            accept=".doc, .docx"
            :limit=1
            list-type="text"
            :action="doUpload()"
            :before-upload="beforeUpload"
            ref="newupload"
            multiple
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将doc/docx文件拖到此处，或<em>点击上传</em>，不能为空</div>
          </el-upload>
        </el-col>
      </el-form-item>
      <p></p>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">上传</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: { clientID: this.$route.query.client },
        imageList : ["http://www.w3school.com.cn/i/eg_tulip.jpg", "http://tpc.googlesyndication.com/daca_images/simgad/17480219307005942326", "https://www.html5tricks.com/wp-content/uploads/2019/01/html5-css3-3d-slider.png"]
      }
    },
    created(){
    },
    methods: {
      onSubmit() {

        this.$refs.newupload.submit();
      },
      onCancel() {
        this.$message({
          message: '放弃添加',
          type: 'warning'
        });
        this.form = {};
      },
      doUpload(){
        // 传一个无用url
        return "/useless";
      },
      openWarn(message) {
        this.$alert(message, '消息', {
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
      beforeUpload(file){
        if (file!=null && this.form.clientID!=null ){
          let fd = new FormData();
          fd.append('file',file);//传文件
          fd.append('clientID',this.form.clientID);//传其他参数
          // 上传
          this.$axios.post('/doctor/postReport',fd).then(function(res){

          }).catch(
            // (e)=>{console.log(e.toString());}
          );

        } else {
          this.openError("不能为空")
        }
        // 停止action继续执行
        return false
      },

    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
  .el-carousel__item img {

  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

