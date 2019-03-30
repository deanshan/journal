<template>
    <div class="resource-detail">
        <NavTitle
            :titles="['运维中心', '资源中心', '计算服务', '安全组', '详情']"
            :isReply=true
        ></NavTitle>

        <el-tabs v-model="activeName">
            <el-tab-pane label="安全组" name="first">
                <ResourceDetails
                        :detailsList=resourceDetailsData
                ></ResourceDetails>
            </el-tab-pane>
            <el-tab-pane label="安全组规则" name="second">
                <el-tabs v-model="activeName1">
                    <el-tab-pane label="入站规则" name="first1">
                        <el-table
                                :data="ingressRuleData"
                                style="width: 100%">
                            <el-table-column
                                    prop="protocol"
                                    label="协议">
                            </el-table-column>
                            <el-table-column
                                    prop="portRange"
                                    label="端口范围">
                            </el-table-column>
                            <el-table-column
                                    prop="icmpAndCode"
                                    label="类型/编码">
                            </el-table-column>
                            <el-table-column
                                    prop="etherType"
                                    label="以太网类型">
                            </el-table-column>
                            <el-table-column
                                    prop="remoteIpPrefix"
                                    label="远端IP前缀">
                            </el-table-column>
                            <el-table-column
                                    prop="remoteSecurityGroupName"
                                    label="远端安全组">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="出站规则" name="second1">
                        <el-table
                                :data="egressRuleData"
                                style="width: 100%">
                            <el-table-column
                                    prop="protocol"
                                    label="协议">
                            </el-table-column>
                            <el-table-column
                                    prop="portRange"
                                    label="端口范围">
                            </el-table-column>
                            <el-table-column
                                    prop="icmpAndCode"
                                    label="类型/编码">
                            </el-table-column>
                            <el-table-column
                                    prop="etherType"
                                    label="以太网类型">
                            </el-table-column>
                            <el-table-column
                                    prop="remoteIpPrefix"
                                    label="远端IP前缀">
                            </el-table-column>
                            <el-table-column
                                    prop="remoteSecurityGroupName"
                                    label="远端安全组">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

import NavTitle from '@/components/common/NavTitle'
import ResourceDetails from '@/components/main/resourceCenter/common/ResourceDetails'
import { https } from '@/utils/https.js'

export default {
    name: "securityGroupDetail",
    data() {
        return {
            detailData: {},
            activeName:"first",
            activeName1:"first1",
            ingressRuleData:[],
            egressRuleData:[],
            icmpTypeList: []

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
                        label:'安全组名称',
                        prop: this.detailData.name ? this.detailData.name : '--'
                    },
                    {
                        label:'状态',
                        prop: this.$conversionType(this.$constant.FIREWALL_STATUS, this.detailData.status)
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
    // created(){
    //     this.getResourceDetail()
    // },
    methods:{
        getResourceDetail(){
            this.$https
                .get(this.$getPlatformUrl(this.$route.query.platform)+'/securityGroup/detail',{
                    securityGroupId: this.$route.query.securityGroupId
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
            this.getIcmpTypeList()
            this.$https
                .get(this.$getPlatformUrl(this.$route.query.platform)+'/securityGroup/rule/list',{
                    securityGroupId: this.$route.query.securityGroupId
                })
                .then(res => {
                    if(res.code === this.$constant['SUCCESS_CODE']) {
                        let ruleData = res.result.list
                        ruleData.forEach(rule=>{
                            if(rule['protocol'] == "ICMP"){
                                rule['portRange'] = '--'
                                rule['icmpAndCode'] = this.getIcmpAndCode(this.icmpTypeList, rule['portRangeMax'])
                            }else{
                                if(rule['portRangeMin'] == rule['portRangeMax']){
                                    rule['portRange'] = rule['portRangeMax'];
                                }else {
                                    rule['portRange'] = rule['portRangeMin'] +'-'+rule['portRangeMax']
                                }
                                rule['icmpAndCode'] = '--'
                            }
                            rule['remoteIpPrefix'] = rule['remoteIpPrefix'] != '' && rule['remoteIpPrefix'] != null ? rule['remoteIpPrefix'] : '--'
                            rule['remoteSecurityGroupName'] = rule['remoteSecurityGroupName'] != '' && rule['remoteSecurityGroupName'] != null ? rule['remoteSecurityGroupName'] : '--'
                            if(rule['direction'] == 'ingress'){
                                this.ingressRuleData.push(rule);
                            }else{
                                this.egressRuleData.push(rule);
                            }
                        })
                    } else {
                        this.$message(res.msg)
                    }
                })
        },
        getIcmpTypeList(){
            this.$https.get(`/mdConfig/getByParentConfigId?parentConfigId=${MD_CONFIG['icmp_type']}`)
                .then(res => {
                    this.icmpTypeList = res.children
                })
        },
        getIcmpAndCode(list,key){
            let content = "";
            for(let item of Object.values(list)) {
                if(item['key'] == key) {
                    content = item['value']
                }
            }
            return content;
        }
    }
}


</script>

<style lang="scss" scoped>
</style>
