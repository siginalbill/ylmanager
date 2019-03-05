<template>

  <div class="app-container">
    <p></p>
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="标题" >
        <!--栅格化控制长度-->
        <el-col :span="20">
          <el-input v-model="form.title"/>
        </el-col>
      </el-form-item>

      <el-form-item label="上传图片(不能为空)">
        <el-col :span="20">
      <!--上传医生图片-->
          <el-upload
      class="upload-file"
      drag
      accept="image/png,image/gif.image/jpg,image/jpeg"
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

      <el-form-item label="摘要">
        <el-col :span="20">
          <el-input v-model="form.blief"/>
        </el-col>
      </el-form-item>

      <el-form-item label="内容">
        <el-col :span="20">
          <!--通过设置 autosize 属性可以使得文本域的高度能够根据文本内容自动进行调整，并且 autosize 还可以设定为一个对象，指定最小行数和最大行数-->
          <el-input v-model="form.text"
                    :autosize="{ minRows: 5, maxRows: 20}"
                    type="textarea"/>
        </el-col>
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
        form: {}
      }
    },
    methods: {
      onSubmit() {
        //确定上传
        this.$refs.newupload.submit();
        // if(this.form.title!=null && this.form.blief != null && this.form.text != null){
        //   this.$axios.post("/service/postRecommendation", {title: this.form.title, blief: this.form.blief, text: this.form.text})
        //     .then(data => {
        //       if (data.data.status === "2000") {
        //         this.$message('创建成功');
        //         this.form = { }
        //       } else {
        //         this.$message({
        //           message: data.data.message,
        //           type: 'error'
        //         });
        //       }
        //     }).catch(()=>{this.openError("系统错误");});
        // }else {
        //   this.openWarn("不能为空");
        // }

      },
      onCancel() {
        this.$message({
          message: '放弃添加',
          type: 'warning'
        });
        this.form = {};
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
      doUpload(){
        // 传一个无用url
        return "/useless";
      },
      beforeUpload(file){
        if (file!=null && this.form.title!=null && this.form.blief!=null && this.form.text!=null ){
          let fd = new FormData();
          fd.append('file',file);//传文件
          fd.append('title',this.form.title);//传其他参数
          fd.append('blief',this.form.blief);//传其他参数
          fd.append('text',this.form.text);//传其他参数
            // 上传
            this.$axios.post('/service/uploadLecturevideo',fd).then(function(res){
              this.openWarn("上传成功");
            }).catch(
              // (e)=>{this.openError(e.toString());}
            );

        } else {
          this.openWarn("不能为空");
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
</style>

