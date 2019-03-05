<template>
  <div class="app-container">
    <p></p>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column label="账号"  align="center">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column label="姓名"  align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="备注"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.others }}</span>
        </template>
      </el-table-column>

      <el-table-column label="分配医生"  align="center">
        <template slot-scope="scope">
          <el-select v-model="scope.row.doctorAccount" placeholder="请选择在线医生">
            <!--用:注明变量为v-for-->
            <el-option v-for="doctor in doctorList"  :label="doctor.name" :value="doctor.account" :key="doctor.name"></el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="postRegist(scope.row)">分配</el-button>
        </template>
      </el-table-column>
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
        doctorList: null,
      }
    },
    created() {
      // this.fetchData()
      this.socketApi.setCallback(this.setSession);
      // 主动请求数据
      this.socketApi.sendSock({"code":"2009", "message":" getDoctorList "});
      this.socketApi.sendSock({"code":"2010", "message":" getWaitList "});
    },
    methods: {
      // websocket加载数据渲染列表
      setSession(data){
        data = JSON.parse(data);
        if (data.code === "2009") {
          // 获取在线医生
          this.doctorList = data.data.items;
          // 确认收到
          this.socketApi.sendSock({"code":"2009","message":"客户端调试信息"});
        }else if(data.code === "2010") {
          // 获取到问诊用户
          this.listLoading = true;
          this.list = data.data.items;
          this.listLoading = false;
          // 确认收到
          this.socketApi.sendSock({"code":"2010","message":"客户端调试信息"});
        }
      },
      postRegist(row) {
        // console.log(JSON.parse(this.userApi.getUserCookie()))
        if(row.doctorAccount!=null){
          this.$axios.post("/service/setWebChat", { userAccount: row.account, doctorAccount: row.doctorAccount})
            .then(data => {
              if (data.data.status === "2000") {
                this.openWarn('调度成功');
              } else {
                this.openError(data.data.message);
              }
            }).catch(()=>{this.openError("系统错误");});
        }else {
          this.openWarn("请选择医生")
        }

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
