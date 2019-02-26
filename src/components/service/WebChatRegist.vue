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
            <el-option v-for="doctor in doctorList"  :label="doctor.name" :value="doctor.account" :key="doctor.account"></el-option>
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
      this.socketApi.sendSock(JSON.stringify({type:"get", method:"getServiceOnLineList",token:this.cookieApi.getTokenCookie()}))
    },
    methods: {
      // websocket加载数据渲染列表
      setSession(data){
        data = JSON.parse(data);
        if (data.code === 2009) {
          // 获取在线医生
          this.doctorList = data.data.items;
          // 确认收到
          this.socketApi.sendSock(JSON.stringify({"code":2009,"message":"客户端调试信息"}));
        }else if(data.code === 2010) {
          // 获取到问诊用户
          this.listLoading = true;
          this.list = data.data.items;
          this.listLoading = false;
          // 确认收到
          this.socketApi.sendSock(JSON.stringify({"code":2010,"message":"客户端调试信息"}));
        }
      },
      postRegist(row) {
        // console.log(JSON.parse(this.userApi.getUserCookie()))
        this.$axios.post("/service/setWebChat", { userAccount: row.account, doctorAccount: row.doctorAccount})
          .then(data => {
            if (data.data.status === 2000) {
              this.$message('上传成功');
            } else {
              this.$message({
                message: data.data.message,
                type: 'error'
              });
            }
          });
      },
    }
  }
</script>
