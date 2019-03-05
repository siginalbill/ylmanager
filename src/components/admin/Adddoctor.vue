<template>

  <div class="app-container">
    <p></p>
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="医生账号" >
        <!--栅格化控制长度-->
        <el-col :span="20">
          <el-input v-model="form.account"/>
        </el-col>
      </el-form-item>

      <el-form-item label="医生姓名">
        <el-col :span="20">
          <el-input v-model="form.name"/>
        </el-col>
      </el-form-item>

      <el-form-item label="登录密码">
        <el-col :span="20">
          <el-input v-model="form.pass"/>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
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
        if (this.form.account != null && this.form.name != null && this.form.pass != null) {
          this.$axios.post("/admin/addDoctor", {account: this.form.account, name: this.form.name, pass: this.form.pass})
            .then(data => {
              if (data.data.status === "2000") {
                this.$message('创建成功');
                this.form = {};
              } else {
                // this.$message({
                //   message: data.data.message,
                //   type: 'error'
                // });
                this.openError(data.data.message);
              }
            }).catch(()=>{this.openError("系统错误");});
        }else {
          this.openWarn('输入不能为空');
        }
      },
      onCancel() {
        this.$message({
          message: '放弃添加',
          type: 'warning'
        });
        this.form = {};
      },
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
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

