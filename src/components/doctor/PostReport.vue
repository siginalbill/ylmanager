<template>

  <div class="app-container">
    <p></p>
    <el-carousel :autoplay="false" arrow="always" >
      <el-carousel-item v-for="item in userData " :key="item" >
        <!--<el-row>-->
          <!--<el-col :span="12">-->
            <!--<img :src="item">-->
          <!--</el-col>-->
          <!--<el-col :span="12">-->
            <!--<div>klsdfjlksdfjsdkljfsklfjklsdfjdklsfjlksfjskldfjsdklfjdkslfjlskfjkldsjfks</div>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <el-row>
          <el-col :span="12">
            <img :src="item.url">
          </el-col>
          <el-col :span="12">
            <div>{{item.jsonString}}</div>
          </el-col>
        </el-row>
      </el-carousel-item>


    </el-carousel>


    <!--<el-table-->
      <!--v-loading="listLoading"-->
      <!--:data="list"-->
      <!--element-loading-text="Loading"-->
      <!--border-->
      <!--fit-->
      <!--highlight-current-row>-->
      <!--<el-table-column label="用户账号"  align="center">-->
        <!--<template slot-scope="scope">-->
          <!--{{ scope.row.clientID }}-->
        <!--</template>-->
      <!--</el-table-column>-->

      <!--<el-table-column label="操作"  align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button type="primary" size="small" icon="el-icon-edit" @click="postRegist(scope.row)">编辑健康报告</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->

    <!--</el-table>-->
    <p></p>
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
        form: { clientID: this.$route.query.client },
        userData : [],
        imageList : ["http://www.w3school.com.cn/i/eg_tulip.jpg", "http://tpc.googlesyndication.com/daca_images/simgad/17480219307005942326", "https://www.html5tricks.com/wp-content/uploads/2019/01/html5-css3-3d-slider.png"]
      }
    },
    created(){
      this.fetchData()
    },
    methods: {
      onSubmit() {
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
      beforeUpload(file){
        if (file!=null && this.form.clientID!=null ){
          let fd = new FormData();
          fd.append('file',file);//传文件
          fd.append('clientID',this.form.clientID);//传其他参数
          // 上传
          this.$axios.post('/doctor/postReport',fd).then(function(res){
          }).catch(
            // (e)=>{console.log(e.toString());}
          );
        } else {
          this.openError("不能为空")
        }
        // 停止action继续执行
        return false
      },
      fetchData () {
        this.listLoading = true;
        this.$axios.post('/doctor/getSkinInfo', {clientID:this.form.clientID})
          .then(data => {
            this.userData = data.data.data.items;
          })
      },
    }
  }
</script>

<style scoped>
  .line{
    text-align: center;
  }
  .el-carousel__item img {
  }

</style>
