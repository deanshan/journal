<template>
    <div class="operation-main-content">
        <NavTitle
                :titles="['运维中心','监控中心','监控模板','详情']"
                :isReply=true
        ></NavTitle>

        <ResourceDetails
                :detailsList=itemData
        ></ResourceDetails>

        <!-- 表格 -->
        <el-row class="title">
            <el-col :span="12">
                <h6>监控规则</h6>
            </el-col>
        </el-row>
        <div class="table-content">

            <base-table :tableData="tableData"
                        :itemData="itemDataTable"
                        :total="totalNum"
                        :url="url"
                        ref="baseTableData"></base-table>
        </div>
    </div>
</template>

<script>

    import NavTitle from '@/components/common/NavTitle'
    import ResourceDetails from '@/components/common/resource/ResourceDetails'
    import BaseTable from '@/components/common/table/BaseTable'
    export default {
        name: "monitorTemplateDetail",
        data() {
            return {
                url:"/cmp-monitor/monitor/template/detail",
                detailData: {},
                tableData:[],
                totalNum:1,
                itemDataTable:[{
                    prop:"itemKey",
                    label:"监控项",
                    width:'200'
                },{
                    prop:"comparator",
                    label:"对比方式",
                    width:'200'
                },{
                    prop:"expression",
                    label:"告警阈值",
                    width:'200'
                },{
                    prop:"triggerTimes",
                    label:"出发周期",
                    width:'200'
                },{
                    prop:"triggerStrategy",
                    label:"收敛政策",
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
                            label: '模板名称',
                            prop: this.detailData.name ? this.detailData.name : '--'
                        }, {
                            label: '资源类型',
                            prop: this.$conversionType('resource_type', this.detailData.resourceType)
                        }, {
                            label: '备注',
                            prop: this.detailData.remark ? this.detailData.remark : '--'
                        }]
                }
            },
            monitorUrl(){
                return sessionStorage.getItem(this.$constant.APP_KEY.monitor)
            },
        },

        mounted() {
            this.getAlarmResourceDetail()
        },
        methods: {
            getAlarmResourceDetail() {
                this.$https.get(`${this.monitorUrl}/monitor/template/detail`, {
                        templateId: this.$route.params.templateId
                }).then((res) => {
                    if (res.code == this.$constant.SUCCESS_CODE) {
                        this.detailData = res.result.template
                        this.tableData = res.result.triggers
                    } else {
                        this.$message.error(res.msg)
                    }
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