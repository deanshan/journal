<template>
    <div class="operation-main-content">

        <NavTitle :titles="['运维中心', '资源中心', '计算服务', '云硬盘']"></NavTitle>

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
    name: "disk",
    data(){
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
                    label: '硬盘名称',
                    value: ''
                },
                status: {
                    label: '硬盘状态',
                    value: '',
                    lists: this.$constant.DISK_STATUS
                }
            },
            itemData:[
                {
                    prop: "bottomDiskId",
                    label: "资源ID",
                    width: '320'
                },
                {
                    prop: "name",
                    label: "硬盘名称",
                    width: '140'
                },
                {
                    prop: "resourcePoolName",
                    label: "所属资源池",
                    width: '180'
                },
                {
                    prop: "vdcId",
                    label: "所属机构",
                    width: '160'
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
                    width: '140'
                }
            ],
            operationData:[{
                prop: "bottomDiskId",
                label: "操作",
                width: '80',
                list:[{
                    name:"详情",
                    type:'detail',
                    textClass:"text-operation"
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
        this.getDataList(this.$refs.baseTableData.currentPage)
    },
    methods:{
        getDataList(val){
            this.loading = true
            this.axios.get(sessionStorage.getItem(this.$constant.APP_KEY.console)+'/vDisk/page',{params: {
                    page: val,
                    rows: this.$refs.baseTableData.pageSize,
                    name: this.resourceInfo.name.value,
                    status: this.resourceInfo.status.value,
                    bottomDiskId: this.resourceInfo.resourceId.value
                }})
                .then((response) => {
                    this.loading = false
                    if(response.data.code === this.$constant.SUCCESS_CODE){

                        this.tableData = response.data.result.list
                        this.totalNum = response.data.result.total
                        for(let data of Object.values(this.tableData)) {
                            data['className'] = this.$getStatusStyle('DISK_STATUS',data.status)
                            data.status = this.$conversionType('disk_status', data.status)
                        }
                    }else{

                        this.$notify.error(response.data.msg)
                    }
                })
                .catch(error => {
                   this.loading = false
                   this.$message(error)
                })
        },
        onSubmit(){
            this.getDataList(this.$refs.baseTableData.currentPage)
        },
        onExport(bottomId,name,status){
            var consoleUrl = sessionStorage.getItem(this.$constant.APP_KEY.console)
            window.location.href = `${consoleUrl}/vDisk/export?bottomDisk=${bottomId}&name=${name}&status=${status}`
        },
        tableRefresh(val){
            for(let key in this.resourceInfo) {
               this.resourceInfo[key]['value'] = val
            }
            this.loading = true
            this.$refs.baseTableData.currentPage = 1
            this.getDataList(this.$refs.baseTableData.currentPage)
        },
        gotoResourceDetailPage(type, data){
            this.$router.push({
                path: `${this.$route.matched[0].path}/diskDetail`,
                query:{
                    platform: type,
                    diskId: data.diskId
                }
            })
        }
    }
}
</script>

<style scoped>

</style>