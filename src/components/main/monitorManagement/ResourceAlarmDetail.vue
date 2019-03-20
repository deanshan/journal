<template>
    <div class="operation-main-content">
        <NavTitle
                :titles="['运维中心','监控中心','资源报警','详情']"
                :isReply=true
        ></NavTitle>

        <ResourceDetails
                :detailsList=itemData
        ></ResourceDetails>

        <!-- 表格 -->
        <el-row class="title">
            <el-col :span="12">
                <h6>通知记录</h6>
            </el-col>
        </el-row>
        <div class="table-content">
            <base-table :tableData="tableData"
                        :itemData="itemDataTable"
                        :total="totalNum"
                        :url="url"
                        ref="baseTableData"
                        :loading="loading"
            ></base-table>
        </div>
    </div>
</template>

<script>

    import NavTitle from '@/components/common/NavTitle'
    import ResourceDetails from '@/components/common/resource/ResourceDetails'
    import BaseTable from '@/components/common/table/BaseTable'
    export default {
        name: "resourceAlarmDetail",
        data() {
            return {
                loading:true,
                url:sessionStorage.getItem(this.$constant.APP_KEY.monitor)+`/alarm/detail`,
                detailData: {},
                tableData:[],
                totalNum:1,
                itemDataTable:[{
                    prop:"notifyResult",
                    label:"通知结果",
                    width:'200'
                },{
                    prop:"userName",
                    label:"通知人",
                    width:'200'
                },{
                    prop:"notifyType",
                    label:"通知类型",
                    width:'200'
                },{
                    prop:"notifyTime",
                    label:"通知时间",
                    width:'200'
                },
                ]
            }
        },
        components: {
            NavTitle,
            ResourceDetails,
            BaseTable
        },
        computed: {

            itemData() {
                return {
                    baseInfo:[
                    {
                        label: '资源名称',
                        prop: this.detailData.resourceName ? this.detailData.resourceName : '--'
                    }, {
                        label: '报警时间',
                        prop: this.detailData.alarmTime ? this.detailData.alarmTime : '--'
                    }, {
                        label: '资源类型',
                        prop: this.$conversionType('resource_type', this.detailData.resourceType)
                    }, {
                        label: '确认状态',
                        prop: this.$conversionType(this.$constant['MONITOR_ALARM_STATUS'], this.detailData.isConfirmed)
                    }, {
                        label: 'IP地址',
                        prop: this.detailData.address ? this.detailData.address : '--'
                    }, {
                        label: '确认人',
                        prop: this.detailData.confirmUserName ? this.detailData.confirmUserName : '--'
                    }, {
                        label: '所属资源池',
                        prop: this.detailData.resourcePoolName ? this.detailData.resourcePoolName : '--'
                    }, {
                        label: '确认时间',
                        prop: this.detailData.confirmTime ? this.detailData.confirmTime : '--'
                    }, {
                        label: '报警内容',
                        prop: this.detailData.alarmDetail ? this.detailData.alarmDetail : '--'
                    }]
                }
            },
            monitorUrl(){
                return sessionStorage.getItem(this.$constant.APP_KEY.monitor)
            },
        },

        mounted() {
            this.getAlarmResourceDetail()
            this.getNotifyUser()
        },
        methods: {
            getAlarmResourceDetail() {
                this.axios.get(this.url, {
                    params: {
                        alarmRecordId: this.$route.params.alarmRecordId
                    }
                }).then((response) => {
                    console.log(response)
                    if (response.data.code == this.$constant.SUCCESS_CODE) {
                        this.detailData = response.data.result
                    } else {
                        this.$message.error(response.data.msg)
                    }
                })
            },
            getNotifyUser(){
                this.$https.get(`${this.monitorUrl}/notify/result/page`,{
                        alarmRecordId: this.$route.params.alarmRecordId
                    })
                    .then((res) => {
                        this.loading=false
                        if(res.code === this.$constant.SUCCESS_CODE){
                            this.tableData = res.result.pageInfo.list
                            this.totalNum = res.result.pageInfo.total
                            for(let data of Object.values(this.tableData)){
                                data.notifyType = this.$conversionType(this.$constant['DIC_ALARM_NOTIFY_TYPE'], data.notifyType)
                            }
                        }else{
                            this.$message.error(response.data.msg)
                        }
                    }).catch(error => {
                    this.loading=false
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
    .title {
        flex: 1;
        background: #fff;
        padding: 20px 20px 10px 20px;
    h6 {
        font-size: 14px;
        border-left: 4px solid #2090ff;
        padding-left: 10px;
        margin-top: 7px;
        margin-bottom: 8px;
    }
    }

</style>