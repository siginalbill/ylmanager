<template>

  <div class="app-container">
    <p></p>
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
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
        form: { clientID: this.$route.query.client }
      }
    },
    created(){
    },
    methods: {
      onSubmit() {
        // if (this.form.account != null && this.form.name != null && this.form.text != null){
        //   this.$axios.post("/doctor/postReport", {account: this.form.account, name: this.form.name, result: this.form.text})
        //     .then(data => {
        //       if (data.data.status === "2000") {
        //         this.$message('创建成功');
        //         this.form = { }
        //       } else {
        //         this.openError(data.data.message);
        //       }
        //     }).catch(()=>{this.openError("系统错误");});
        // } else {
        //   this.openWarn('输入不能为空');
        // }
        //确定上传
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
      beforeUpload(file){
        if (file!=null && this.form.clientID!=null ){
          let fd = new FormData();
          fd.append('file',file);//传文件
          fd.append('clientID',this.form.clientID);//传其他参数
          // 上传
          console.log(this.form.clientID)
          this.$axios.post('/doctor/postReport',fd).then(function(res){

          }).catch(
            (e)=>{console.log(e.toString());}
          );

        } else {
          this.$alert("不能为空", '错误', {
            confirmButtonText: '确定',
            callback: action => {
              // 确认操作回调函数
            }
          });
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
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>

