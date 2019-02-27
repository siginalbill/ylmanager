<template>

  <div class="app-container">
    <p></p>
    <el-form ref="form" :model="form" label-width="120px">

      <el-form-item label="用户账号" >
        <!--栅格化控制长度-->
        <el-col :span="20">
          <el-input v-model="form.account"/>
        </el-col>
      </el-form-item>

      <el-form-item label="用户姓名">
        <el-col :span="20">
          <el-input v-model="form.name"/>
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
        if (this.form.account != null && this.form.name != null && this.form.text != null){
          this.$axios.post("/doctor/postReport", {account: this.form.account, name: this.form.name, result: this.form.text})
            .then(data => {
              if (data.data.status === 2000) {
                this.$message('创建成功');
                this.form = { }
              } else {
                this.openError(data.data.message);
              }
            }).catch(()=>{this.openError("系统错误");});
        } else {
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

