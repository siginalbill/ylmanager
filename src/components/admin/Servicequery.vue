<template>
  <div class="app-container">
    <p></p>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="选择统计时间段">
        <el-col :span="10">
          <el-date-picker v-model="form.date1" type="date" placeholder="选择开始时间" style="width: 100%;"/>
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <el-col :span="10">
          <el-date-picker v-model="form.date2" type="date" placeholder="选择结束时间" style="width: 100%;"/>
        </el-col>
        <el-col :span="1">
          <el-button type="primary" @click="onSubmit" style="width: 100%;">查询</el-button>
        </el-col>
        <el-col :span="1">
          <el-button @click="onCancel" style="width: 100%;">取消</el-button>
        </el-col>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="工号">
        <template slot-scope="scope">
          {{ scope.row.acount }}
        </template>
      </el-table-column>
      <el-table-column label="姓名"  align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="处理挂号单数"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.registersNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传讲座数"  align="center">
        <template slot-scope="scope">
          {{ scope.row.lecturesNum }}
        </template>
      </el-table-column>
      <el-table-column label="上传体检推荐数"  align="center">
        <template slot-scope="scope">
          {{ scope.row.recommendNum }}
        </template>
      </el-table-column>
      <!--<el-table-column class-name="status-col" label="Status" width="110" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
      <!--<template slot-scope="scope">-->
      <!--<i class="el-icon-time"/>-->
      <!--<span>{{ scope.row.display_time }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>

<script>
  // import { getList } from '@/api/table'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        };
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        form:{}
      }
    },
    created() {
      // Date类型转换为String类型
      Date.prototype.format = function(fmt)
      { //author: meizz
        var o = {
          "M+" : this.getMonth()+1,                 //月份
          "d+" : this.getDate(),                    //日
          "h+" : this.getHours(),                   //小时
          "m+" : this.getMinutes(),                 //分
          "s+" : this.getSeconds(),                 //秒
          "q+" : Math.floor((this.getMonth()+3)/3), //季度
          "S"  : this.getMilliseconds()             //毫秒
        };
        if(/(y+)/.test(fmt))
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        for(var k in o)
          if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        return fmt;
      }

    },
    methods: {
      // http加载数据
      fetchData() {
        this.listLoading = true
        this.$axios.post("/admin/servicelist", {})
          .then(data => {
              this.list = data.data.data.items;
              this.listLoading = false
            }
          )
      },
      // websocket加载数据渲染列表
      setSession(data){
        data = JSON.parse(data);
        if (data.code === 2004) {
          this.listLoading = true;
          this.list = data.data.items;
          this.listLoading = false;
          // 确认收到
          this.socketApi.sendSock({"code":2004,"message":"客户端调试信息"});
        }
      },
      onSubmit() {
        // this.$refs.newupload.submit();
        console.log(this.form.date1)
        if (this.form.date1 != null && this.form.date2 != null){
          this.$axios.post("/admin/queryService", {startTime: new Date(this.form.date1).format("yyyy/MM/dd"), endTime: new Date(this.form.date2).format("yyyy/MM/dd")})
            .then(data => {
              if (data.data.code === 2005) {
                this.list = data.data.data.items;
                this.listLoading = false;
                this.$message('查询成功');
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
          message: '放弃查询',
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
    }
  }
</script>
