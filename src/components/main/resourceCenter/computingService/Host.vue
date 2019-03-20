<template>
    <!-- 主体内容 -->
    <div class="operation-main-content">

        <NavTitle :titles="['运维中心', '资源中心', '计算服务', '云主机']"></NavTitle>

        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <QueryTable
                :resourceInfo="resourceInfo"
                @tableRefresh="tableRefresh"
                @onSubmit="onSubmit"
                @onExport="onExport"
            ></QueryTable>
            <!--表格-->
            <BaseTable
                :loading="loading"
                :url="url"
                ref="baseTableData"
                :tableData="tableData"
                :itemData="itemData"
                :operationData="operationData"
                :total="totalNum"
            ></BaseTable>
        </div>
    </div>
</template>

<script>

import NavTitle from '@/components/common/NavTitle'
import BaseTable from '@/components/common/table/BaseTable'
import QueryTable from '@/components/main/resourceCenter/common/QueryTable'

export default {
    name: "host",
    data() {
        return {
            loading: true,
            url: sessionStorage.getItem(this.$constant.APP_KEY.console)+'/rest/platform/getByResourcePoolId',
            tableData:[],
            totalNum:0,
            resourceInfo: {
                resourceId: {
                    label: '资源ID',
                    value: ''
                },
                name: {
                    label: '主机名称',
                    value: ''
                },
                status: {
                    label: '主机状态',
                    value: '',
                    lists: this.$constant['HOST_STATUS']
                }
            },
            itemData: [
                {
                    prop: "bottomHostId",
                    label: "资源ID",
                    width: '200'
                },
                {
                    prop: "name",
                    label: "主机名称",
                    width: '180'
                },
                {
                    prop: "resourcePoolName",
                    label: "所属资源池",
                    width: '200'
                },
                {
                    prop: "vdcId",
                    label: "所属机构",
                    width: '200'
                },
                {
                    prop: "status",
                    label: "状态",
                    width: '80',
                    className: 'className'
                },
                {
                    prop: "createTime",
                    label: "创建时间",
                    width: '130'
                }
            ],
            operationData:[{
                prop: "bottomHostId",
                label: "操作",
                width: '80',
                list:[{
                    name: "详情",
                    type: 'detail',
                    textClass: "text-operation"
                }]
            }]
        }
    },
    components:{
        NavTitle,
        QueryTable,
        BaseTable
    },
    mounted(){
        this.$getToken(this.getDataList(this.$refs.baseTableData.currentPage))
    },
    methods:{
        getDataList(val){
            this.loading = true
            this.$https
                .get(sessionStorage.getItem(this.$constant.APP_KEY.console)+'/vHost/page', {
                    page: val,
                    rows: this.$refs.baseTableData.pageSize,
                    name: this.resourceInfo.name.value,
                    status: this.resourceInfo.status.value,
                    bottomHostId: this.resourceInfo.resourceId.value
                })
                .then(res => {
                    this.loading = false

                    if(res.code === this.$constant['SUCCESS_CODE']){

                        this.tableData = res.result.list
                        this.totalNum = res.result.total
                        for(let data of Object.values(this.tableData)) {
                            data['className'] = this.$getStatusStyle('HOST_STATUS',data.status)
                            data.status = this.$conversionType('host_status', data.status)
                        }
                    }else{
                        this.$message(res.msg)
                    }
                })
        },
        onSubmit(){
            this.getDataList(this.$refs.baseTableData.currentPage)
        },
        onExport(bottomId,name,status){
            var consoleUrl = sessionStorage.getItem(this.$constant.APP_KEY.console)
            window.location.href = `${consoleUrl}/vHost/export?bottomHostId=${bottomId}&name=${name}&status=${status}`
        },
        tableRefresh(val){
            for(let key in this.resourceInfo) {
               this.resourceInfo[key]['value'] = val
            }
            this.loading = true
            this.$refs.baseTableData.currentPage = 1
            this.getDataList(this.$refs.baseTableData.currentPage)
        },
        gotoResourceDetailPage(type,data){
            this.$router.push({
                path: `${this.$route.matched[0].path}/hostDetail`,
                query:{
                    platform: type,
                    hostId: data.hostId
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>