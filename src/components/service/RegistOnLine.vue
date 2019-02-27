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
      <el-table-column align="center" label="客户账号">
        <template slot-scope="scope">
          {{ scope.row.account }}
        </template>
      </el-table-column>
      <el-table-column label="客户姓名"  align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="挂号科室"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.class }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注"  align="center">
        <template slot-scope="scope">
          {{ scope.row.others }}
        </template>
      </el-table-column>
      <el-table-column label="操作"  align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="postRegist(scope.row)">接单</el-button>
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

  import {getUserCookie} from "../../api/localstorage";

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
      this.socketApi.sendSock(JSON.stringify({type:"get", method:"getRegistList",token:this.cookieApi.getTokenCookie()}))
    },
    methods: {
      postRegist(row) {
        // console.log(JSON.parse(this.userApi.getUserCookie()))
        this.$axios.post("/service/ownRegist", {id: row.id, user_account: row.account, service_account: JSON.parse(this.userApi.getUserCookie()).userAccount})
          .then(data => {
            if (data.data.status === 2000) {
              this.openWarn('接单成功');
            } else {
              this.openError(data.data.message)
            }
          });
      },
      // websocket加载数据渲染列表
      setSession(data){
        data = JSON.parse(data);
        if (data.code === 2008) {
          this.listLoading = true;
          this.list = data.data.items;
          this.listLoading = false;
          // 确认收到
          this.socketApi.sendSock(JSON.stringify({"code":2008,"message":"客户端调试信息"}));
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
