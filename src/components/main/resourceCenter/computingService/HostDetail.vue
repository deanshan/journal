<template>
    <div class="resource-detail">
        <NavTitle
            :titles="['运维中心', '资源中心', '计算服务', '云主机', '详情']"
            :isReply=true
        ></NavTitle>
        <ResourceDetails
            :detailsList=resourceDetailsData
            :isConfig=true
        ></ResourceDetails>
    </div>
</template>

<script>

import NavTitle from '@/components/common/NavTitle'
import ResourceDetails from '@/components/main/resourceCenter/common/ResourceDetails'
import { conversionTimeSlotType} from '@/utils/common.js'

export default {
    name: "hostDetail",
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
                        label:'主机名称',
                        prop: this.detailData.name ? this.detailData.name : '--'
                    },
                    {
                        label:'主机状态',
                        prop: this.$conversionType('host_status', this.detailData.status)
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
                        label:'主机备注',
                        prop: this.detailData.remark ? this.detailData.remark : '--'
                    }
                ],
                config: [
                    {
                        label:'镜像',
                        prop: this.detailData.imageName ? this.detailData.imageName : '--'
                    },
                    {
                        label:'CPU',
                        prop: this.detailData.cpu ? `${this.detailData.cpu}核` : '--'
                    },
                    {
                        label:'内存',
                        prop: this.detailData.memory ? `${this.detailData.memory}GB` : '--'
                    },
                    {
                        label:'系统盘类型',
                        prop: this.detailData.diskType ? this.$conversionType('disk_type', this.detailData.diskType) : '--'
                    },
                    {
                        label:'系统盘大小',
                        prop:  this.detailData.disk ? `${this.detailData.disk}GB` : '--'
                    },
                ],
                network: [
                    {
                        label:'VPC',
                        prop: this.detailData.vpcName ? this.detailData.vpcName : '--'
                    },
                    {
                        label:'子网',
                        prop: this.detailData.subnetName ? this.detailData.subnetName : '--'
                    },
                    {
                        label:'内网IP',
                        prop: this.detailData.internalIp ? this.detailData.internalIp : '--'
                    },
                    {
                        label:'公网IP',
                        prop: this.detailData.floatingIp ? this.detailData.floatingIp : '--'
                    },
                    {
                        label:'安全组',
                        prop: this.detailData.securityGroupName ? this.detailData.securityGroupName : '--'
                    }
                ],
                disks: this.detailData.disks
            }
        }
    },
    created(){
        this.getResourceDetail()
    },
    methods:{
        getResourceDetail(){
            let url = this.$getPlatformUrl(this.$route.query.platform)
            this.$https
                .get(`${url}/host/detail`,{
                    hostId: this.$route.query.hostId
                })
                .then(res => {
                    if(res.code === this.$constant['SUCCESS_CODE']) {
                        this.detailData = res.result
                    } else {
                        this.$message(res.msg)
                    }
                })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
