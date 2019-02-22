<template>

  <div class="app-container">
    <p></p>
    <el-form ref="form" :model="form" label-width="180px">

      <el-form-item label="医生账号(不能为空)">
        <!--栅格化控制长度-->
        <el-col :span="20">
          <el-input v-model="form.account"  placeholder="不能为空" />
        </el-col>
      </el-form-item>

      <el-form-item label="医生姓名">
        <el-col :span="20">
          <el-input v-model="form.name"/>
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
            <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>，不能为空</div>-->
          </el-upload>
        </el-col>
      </el-form-item>


      <el-form-item label="医生科室">
        <el-col :span="20">
          <el-input v-model="form.class"/>
        </el-col>
      </el-form-item>

      <el-form-item label="医生简介">
        <el-col :span="20">
          <el-input v-model="form.blief"/>
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
        fd.append('name',this.form.name);//传其他参数
        fd.append('account',this.form.account);
        fd.append('class',this.form.class);
        fd.append('blief',this.form.blief);
        this.$axios.post('/admin/changeDoctor',fd).then(function(res){
          alert('成功');
        })
      },
      newSubmitForm(){
        //确定上传
        this.$refs.newupload.submit();
      },
      doUpload(){
        // 传一个无用url
        return "/useless";
      }
    },

  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

