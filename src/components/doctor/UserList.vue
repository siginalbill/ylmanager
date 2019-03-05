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
      <el-table-column label="用户账号"  align="center">
        <template slot-scope="scope">
          {{ scope.row.clientID }}
        </template>
      </el-table-column>

      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="postRegist(scope.row)">编辑健康报告</el-button>
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

  export default {
    filters: {
      statusFilter (status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data () {
      return {
        list: null,
        listLoading: true
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.listLoading = true;
        this.$axios.post('/doctor/userList', {})
          .then(data => {
              this.list = data.data.data.items;
              this.listLoading = false
            }
          )
      },
      postRegist (row) {
        // console.log(JSON.parse(this.userApi.getUserCookie()))
        this.$router.push({path: '/doctor/post_report', query: {client: row.clientID}});
      },
      openWarn (message) {
        this.$alert(message, '消息', {
          confirmButtonText: '确定',
          callback: action => {
            // 确认操作回调函数
          }
        })
      },
      openError (message) {
        this.$alert(message, '错误', {
          confirmButtonText: '确定',
          callback: action => {
            // 确认操作回调函数
          }
        })
      },
    }
  }
</script>
