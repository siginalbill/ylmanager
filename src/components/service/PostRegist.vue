<template>

  <div class="app-container">
    <p></p>
    <el-form ref="form" :model="form" label-width="180px">

      <el-form-item label="交易单号：">
        <el-col :span="20">
          {{regist.id}}
        </el-col>
      </el-form-item>

      <el-form-item label="客户账号：">
        <el-col :span="20">
          {{regist.userAccount}}
        </el-col>
      </el-form-item>

      <el-form-item label="用户姓名：">
        <el-col :span="20">
          {{regist.userName}}
        </el-col>
      </el-form-item>

      <el-form-item label="科室：">
        <el-col :span="20">
          {{regist.class}}
        </el-col>
      </el-form-item>

      <el-form-item label="备注：">
        <el-col :span="20">
          {{regist.others}}
        </el-col>
      </el-form-item>

      <el-form-item label="挂号结果">
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
        regist: {},
        form: {}
      }
    },
    created(){
      this.$axios.post("/service/getRegist", {})
        .then(data => {
          if (data.data.status === "2000") {
            this.$message('获取成功');
            this.regist = data.data;
            // console.log(this.regist);
          } else {
            this.$message({
              message: "无可用挂号单",
              type: 'error'
            });
            this.$router.push('/service/regist_online');
            // 错误跳转
          }
          }
        ).catch(err=>{
        this.$message({
          message: "系统错误",
          type: 'error'
        });
          this.$router.push('/service/regist_online');
          // 错误跳转
      });
    },
    methods: {
      onSubmit() {
        // this.$refs.newupload.submit();
        if(this.regist.id!=null && this.form.text!=null){
          this.$axios.post("/service/postRegist", {id: this.regist.id, result: this.form.text})
            .then(data => {
              if (data.data.status === "2000") {
                this.$message('上传成功');
              } else {
                this.$message({
                  message: data.data.message,
                  type: 'error'
                });
              }
            });
        }else{
          this.openWarn("不能为空")
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
    },

  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
</style>

