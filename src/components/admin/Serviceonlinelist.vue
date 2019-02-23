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
      this.socketApi.sendSock(JSON.stringify({type:"get", method:"getServiceOnLineList",token:this.cookieApi.getTokenCookie()}))
    },
    methods: {
      // websocket加载数据渲染列表
      setSession(data){
        data = JSON.parse(data);
        if (data.code === 2007) {
          this.listLoading = true;
          this.list = data.data.items;
          this.listLoading = false;
          // 确认收到
          this.socketApi.sendSock(JSON.stringify({"code":2007,"message":"客户端调试信息"}));
        }else if (data.code === 2005) {
          // 接收主动请求数据
          this.listLoading = true;
          this.list = data.data.items;
          this.listLoading = false;
          // 确认收到
          this.socketApi.sendSock(JSON.stringify({"code":2005,"message":"客户端调试信息"}));
        }

      }
    }
  }
</script>
