<template>
    <div class="resource-detail">
        <NavTitle
            :titles="['运维中心', '资源中心', '网络服务', '公网IP', '详情']"
            :isReply=true
        ></NavTitle>

        <ResourceDetails
            :detailsList=resourceDetailsData
        ></ResourceDetails>
    </div>
</template>

<script>

import NavTitle from '@/components/common/NavTitle'
import ResourceDetails from '@/components/main/resourceCenter/common/ResourceDetails'
import { conversionTimeSlotType} from '@/utils/common.js'
export default {
    name: "floatingIpDetail",
    data() {
        return {
            detailData: {}
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
                        label:'公网IP名称',
                        prop: this.detailData.floatingIpName ? this.detailData.floatingIpName : '--',
                        className: 'floatingIpName'
                    },
                    {
                        label:'IP地址',
                        prop: this.detailData.ip ? this.detailData.ip : '--',
                        className:'ip'
                    },
                    {
                        label:'带宽(MB)',
                        prop: this.detailData.bandwidth ? this.detailData.bandwidth : '--'
                    },
                    {
                        label:'状态',
                        prop: this.$conversionType('floatingIp_status', this.detailData.status)
                    },
                    {
                        label:'创建时间',
                        prop: this.detailData.createTime ? this.detailData.createTime : '--'
                    },
                    {
                        label:'到期时间',
                        prop: this.detailData.expireTime ? this.detailData.expireTime : '--'
                    },
                    {
                        label:'付费方式',
                        prop: this.detailData.timeSlotType ? conversionTimeSlotType(this.detailData.timeSlotType) : '--'
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
    },
    methods:{
        getResourceDetail(){
            if(this.$route.query.platform ==this.$constant.PLATFORM_TYPE.UCLOUD){
                this.$https
                    .get(this.$getPlatformUrl(this.$route.query.platform)+'/floatingIp/detail',{
                        elasticIpId: this.$route.query.floatingIpId
                    })
                    .then(res => {
                        if(res.code === this.$constant['SUCCESS_CODE']) {
                            debugger
                            this.detailData = res.result
                            this.detailData['floatingIpName'] = this.detailData.name
                            this.detailData['ip'] = this.detailData.ipAddress
                        } else {
                            this.$message(res.msg)
                        }
                    })
            }else{
                this.$https
                    .get(this.$getPlatformUrl(this.$route.query.platform)+'/floatingIp/detail',{
                        floatingIpId: this.$route.query.floatingIpId
                    })
                    .then(res => {
                        if(res.code === this.$constant['SUCCESS_CODE']) {
                            this.detailData = res.result
                            this.detailData['floatingIpName'] = this.detailData.floatingIpName
                            this.detailData['ip'] = this.detailData.externalIp
                        } else {
                            this.$message(res.msg)
                        }
                    })
                }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
