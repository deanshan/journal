<template>
    <div class="resource-detail">
        <NavTitle
            :titles="['运维中心', '资源中心', '计算服务', '防火墙', '详情']"
            :isReply=true
        ></NavTitle>
        <el-tabs v-model="activeName">
            <el-tab-pane label="防火墙" name="first">
                <ResourceDetails
                        :detailsList=resourceDetailsData
                ></ResourceDetails>
            </el-tab-pane>
            <el-tab-pane label="防火墙规则" name="second">
                <el-table
                        :data="ruleData"
                        style="width: 100%">
                    <el-table-column
                            prop="protocol"
                            label="协议">
                    </el-table-column>
                    <el-table-column
                            prop="port"
                            label="端口范围" :formatter="portFormatter">
                    </el-table-column>
                    <el-table-column
                            prop="sourceAddress"
                            label="源地址">
                    </el-table-column>
                    <el-table-column
                            prop="operation"
                            label="动作">
                    </el-table-column>
                    <el-table-column
                            prop="priority"
                            label="优先级">
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>

<script>

import NavTitle from '@/components/common/NavTitle'
import ResourceDetails from '@/components/main/resourceCenter/common/ResourceDetails'

export default {
    name: "firewallDetail",
    data() {
        return {
            detailData: {},
            activeName:"first",
            ruleData:[]
        }
    },
    components:{
        NavTitle,
        ResourceDetails
    },
    computed:{
        resourceDetailsData() {
            return {
                baseInfo: [
                    {
                        label:'防火墙名称',
                        prop: this.detailData.name ? this.detailData.name : '--'
                    },
                    {
                        label:'所属资源池',
                        prop: this.detailData.resourcePoolName ? this.detailData.resourcePoolName : '--'
                    },
                    {
                        label:'所属机构',
                        prop: this.detailData.organizationName ? this.detailData.organizationName : '--'
                    },
                    {
                        label:'创建时间',
                        prop: this.detailData.createTime ? this.detailData.createTime : '--'
                    },
                    {
                        label:'备注',
                        prop: this.detailData.remark ? this.detailData.remark : '--'
                    }
                ]
            }
        }
    },
    mounted(){
        this.$nextTick(() => {
            this.getResourceDetail()
        })
        this.getRuleList();
    },
    methods:{
        getResourceDetail(){
            this.$https
                .get(this.$getPlatformUrl(this.$route.query.platform)+'/firewall/detail',{
                    firewallId: this.$route.query.firewallId
                })
                .then(res => {
                    if(res.code === this.$constant['SUCCESS_CODE']) {
                        this.detailData = res.result
                    } else {
                        this.$message(res.msg)
                    }
                })

        },
        getRuleList(){
            this.$https
                .get(this.$getPlatformUrl(this.$route.query.platform)+'/firewall/rule/list',{
                    firewallId: this.$route.query.firewallId
                })
                .then(res => {
                    if(res.code === this.$constant['SUCCESS_CODE']) {
                        this.ruleData = res.result
                    } else {
                        this.$message(res.msg)
                    }
                })
        },
        portFormatter(row, column){
            if (row.port == '' || row.port == null) {
                return '--'
            }
            return row.port
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
