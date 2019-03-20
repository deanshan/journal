<template>
    <div class="operation-main-content">

        <NavTitle :titles="['运维中心', '资源中心', '计算服务', '主机镜像']"></NavTitle>

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
    name: "hostImage",
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
                    label: '镜像名称',
                    value: ''
                },
                status: {
                    label: '镜像状态',
                    value: '',
                    lists: this.$constant.HOST_IMAGE_STATUS
                }
            },
            itemData:[
                {
                    prop: "bottomImageId",
                    label: "资源ID",
                    width: '260'
                },
                {
                    prop: "name",
                    label: "镜像名称",
                    width: '180'
                },
                {
                    prop: "resourcePoolName",
                    label: "所属资源池",
                    width: '180'
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
                    width: '180'
                }
            ],
            operationData:[{
                prop: "bottomDiskId",
                label: "操作",
                width: '100',
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
            this.axios.get(sessionStorage.getItem(this.$constant.APP_KEY.console)+'/vImage/page',{params:{
                    page: val,
                    rows: this.$refs.baseTableData.pageSize,
                    name: this.resourceInfo.name.value,
                    status: this.resourceInfo.status.value,
                    bottomImageId: this.resourceInfo.resourceId.value
                }})
                .then(response => {
                    this.loading = false

                    if(response.data.code === this.$constant.SUCCESS_CODE){
                        this.tableData = response.data.result.list
                        this.totalNum = response.data.result.total
                        for(let data of Object.values(this.tableData)) {

                            data['className'] = this.$getStatusStyle('HOST_IMAGE_STATUS',data.status)
                            data.status = this.$conversionType('host_image_status', data.status)
                        }
                    }else{
                        this.loading = false
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
            window.location.href = `${consoleUrl}/vImage/export?bottomImageId=${bottomId}&name=${name}&status=${status}`
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
                path: `${this.$route.matched[0].path}/hostImageDetail`,
                query:{
                    platform: type,
                    imageId: data.imageId
                }
            })
        }
    }
}
</script>

<style scoped>

</style>