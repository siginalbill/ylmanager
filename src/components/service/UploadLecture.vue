<template>

  <div class="app-container">
    <p></p>
    <el-form ref="form" :model="form" label-width="180px">

      <el-form-item label="标题(不能为空)">
        <!--栅格化控制长度-->
        <el-col :span="20">
          <el-input v-model="form.title"  placeholder="不能为空" />
        </el-col>
      </el-form-item>

      <el-form-item label="讲座类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">视频</el-radio>
          <el-radio :label="2">音频</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="上传文件(不能为空)">
        <el-col :span="20">
          <!--上传医生图片-->
          <el-upload
            class="upload-file"
            drag
            accept=".mp4, .mp3, .wav"
            :limit=1
            list-type="picture-card"
            :action="doUpload()"
            :before-upload="beforeUpload"
            ref="newupload"
            multiple
            :auto-upload="false">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>，不能为空</div>
          </el-upload>
        </el-col>
      </el-form-item>

      <el-form-item label="">
        <el-progress v-if="videoFlag == true"
                     type="circle"
                     :percentage="videoUploadPercent"
                     style="margin-top:30px;">
        </el-progress>
      </el-form-item>




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
        form: {type: 1},

        videoFlag:false
      }
    },
    methods: {
      onSubmit() {
        this.$refs.newupload.submit();
        // this.$axios.post("/admin/addDoctor", {account: this.form.account, name: this.form.name, pass: this.form.pass})
        //   .then(data => {
        //     if (data.data.status === 2000) {
        //       this.$message('创建成功');
        //     } else {
        //       this.$message({
        //         message: data.data.message,
        //         type: 'error'
        //       });
        //     }
        //   });
      },
      onCancel() {
        this.$message({
          message: '放弃添加',
          type: 'warning'
        });
        this.form = {};
      },
      beforeUpload(file){
        let fd = new FormData();
        fd.append('file',file);//传文件
        fd.append('title',this.form.title);//传其他参数
        if (this.form.type === 1){
          // 视频
          this.$axios.post('/service/uploadLecturevideo',fd).then(function(res){

          })
        }else if (this.form.type === 2) {
          this.$axios.post('/service/uploadLectureaudio',fd).then(function(res){

          })
        }


      },
      newSubmitForm(){
        //确定上传
        this.$refs.newupload.submit();
      },
      doUpload(){
        // 传一个无用url
        return "/useless";
      },
      //进度条
      uploadVideoProcess (event, file, fileList) {
        this.videoFlag = true;
        this.videoUploadPercent = file.percentage.toFixed(0) * 1;
      },
    },

  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

