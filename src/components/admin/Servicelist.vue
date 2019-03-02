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
        listLoading: true
      }
    },
    created() {
      // this.fetchData()
      this.socketApi.setCallback(this.setSession);
      // 主动请求数据
      this.socketApi.sendSock({code:"2004", message:"getServiceList" });
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
      }
    }
  }
</script>
