<template>

  <div class="app-container">
    <p></p>
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="要修改的账号" >
        <!--栅格化控制长度-->
        <el-col :span="20">
          <el-input v-model="form.account" placeholder="医生为账号、客服为工号"/>
        </el-col>
      </el-form-item>

      <el-form-item label="修改内容">
        <el-select v-model="form.type" placeholder="请选择修改类型">
          <el-option label="修改姓名" value="changeName"/>
          <el-option label="修改密码" value="changPass"/>
        </el-select>
      </el-form-item>

      <el-form-item label="修改为">
        <el-col :span="20">
          <el-input v-model="form.value"/>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
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
        if (this.form.account != null && this.form.type != null && this.form.value != null) {
          this.$axios.post("/admin/changeAccount", {account: this.form.account, type: this.form.type, value: this.form.value})
            .then(data => {
              if (data.data.status === 2000) {
                this.$message('修改成功');
                this.form = {};
              } else {
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

