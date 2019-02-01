<template>

    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>

    export default {
        data() {
            return {
                logining: false,
                ruleForm2: {
                  account: '',
                  checkPass: '',
                  checked: false
                },
                rules2: {
                    account: [
                        { required: true, message: '请输入工号', trigger: 'blur' },
                        //{ validator: validaePass }
                    ],
                    checkPass: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        //{ validator: validaePass2 }
                    ]
                },
                checked: true
            };
        },
        created () {
          let user = this.cookieApi.getCookie();
          if(user != null){
            this.ruleForm2.account = user.userAccount;
            this.ruleForm2.checkPass = user.userPass;
            this.ruleForm2.checked = user.remeberFlag;
          }

        },
        methods: {
            handleReset2() {
                this.$refs.ruleForm2.resetFields();
            },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                  if (valid){
                    this.$axios.post("/login", {account:this.ruleForm2.account,password:this.ruleForm2.checkPass})
                      .then(data => {
                        // 登录失败,先不讨论
                        if (data.status != 200) {
                          this.$message.error('服务出错'+data.status);
                          // this.$message({
                          //   message:'服务错误',
                          //   type:'warn'
                          // });
                        } else {
                          if (data.data.loginFlag == 'success'){
                            // 设置Vuex登录标志为true，默认userLogin为false
                            //this.$store.dispatch("userLogin", true);
                            // Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
                            // 我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
                            //localStorage.setItem("loginFlag", "isLogin");
                            sessionStorage.setItem("auth", data.data.userFlag);

                            sessionStorage.setItem("user", JSON.stringify({name:data.data.userName}));
                            // 登录成功提示
                            this.$message.success('登录成功');
                            // 登录成功后跳转到指定页面
                            // 是否使用cookie保存
                            if (this.checked === true){
                              // 调用配置cookie方法,传入账号名，密码，和保存天数3个参数
                              // cookieApi在main.js中引入
                              this.cookieApi.setCookie(this.ruleForm2.account, this.ruleForm2.checkPass, 7, true);
                            }else {
                              // 删除cookie
                              this.cookieApi.setCookie("", "", -1, ""); //修改2值都为空，天数为负1天
                            }
                            this.$router.push("/" + data.data.userFlag);
                          } else {
                            this.$message.error('账号或密码错误');
                          }

                        }
                      });
                  }

                });
            },

        }
    }

</script>
<style >
    .login-container {
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
</style>

