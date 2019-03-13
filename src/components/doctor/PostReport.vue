<template>

  <div class="app-container">
    <p></p>
    <el-carousel :autoplay="false" arrow="always" height="1000px" >
      <el-carousel-item v-for="item in userData " :key="item.jsonString" >
        <el-row>
          <el-col :span="12">
            <img :src="item.url">
          </el-col>
          <el-col :span="12">
            <!--<div>{{item.jsonString}}</div>-->
            <el-table
              :data="parseUrlString(item.jsonString)"
              border
              fit
              highlight-current-row>
              <el-table-column label="项目"  align="center">
                <template slot-scope="scope">
                  {{ scope.row[0] }}
                </template>
              </el-table-column>
              <el-table-column label="结果"  align="center">
                <template slot-scope="scope">
                  {{ scope.row[1] }}
                </template>
              </el-table-column>

            </el-table>
          </el-col>
        </el-row>
      </el-carousel-item>


    </el-carousel>



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
        form: {clientID: this.$route.query.client},
        userData: [],
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
              for (var i = 0; i < this.userData.length; i++){
                this.userData[i].url = "data:image/jpeg;base64," + this.userData[i].url
              }
            }
          )
      },
      parseUrlString(result){
        result = JSON.parse(result)
        let message = [];
        message[0] = ["整体得分", result["score"]]
        message[1] = ["有黑头概率", result["heitou"][0]]
        message[2] = ["有痘痘概率", result["dou"][0]]
        message[3] = ["有斑概率", result["ban"][0]]
        message[4] = ["肤色分析", "偏白"+result["fuse"][0] + "自然"+result["fuse"][1] + "偏黄"+result["fuse"][2]]
        message[5] = ["体质描述", result["body"]]
        message[6] = ["饮食建议", result["diet"]]
        message[7] = ["美容方剂", result["medicine"]]
        message[8] = ["生药",result["drug"] ]
        return message
      }
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
