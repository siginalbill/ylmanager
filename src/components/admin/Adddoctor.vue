<template>

  <div class="app-container">
    <p></p>
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="医生工号" >
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
        this.$axios.post("/admin/addDoctor", {account: this.form.account, name: this.form.name, pass: this.form.pass})
          .then(data => {
            if (data.data.status === 2000) {
              this.$message('创建成功');
            } else {
              this.$message({
                message: data.data.message,
                type: 'error'
              });
            }
          });
      },
      onCancel() {
        this.$message({
          message: '放弃添加',
          type: 'warning'
        });
        this.form = {};
      }
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

