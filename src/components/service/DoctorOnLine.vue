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

      <el-table-column label="姓名"  align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="科室"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.class }}</span>
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
        listLoading: true
      }
    },
    created() {
      // this.fetchData()
      this.socketApi.setCallback(this.setSession);
      // 主动请求数据
      this.socketApi.sendSock({"code":"2009", "message":" getDoctorList "})
    },
    methods: {
      // websocket加载数据渲染列表
      setSession(data){
        data = JSON.parse(data);
        if (data.code === "2009") {
          this.listLoading = true;
          this.list = data.data.items;
          sessionStorage.setItem("doctorOnline", JSON.stringify(this.list));
          this.listLoading = false;
          // 确认收到
          this.socketApi.sendSock({"code":"2009","message":"客户端调试信息"});
        }
      }
    }
  }
</script>
