<template>
    <div class="resource-detail">
        <NavTitle
            :titles="['运维中心', '资源中心', '计算服务', '云硬盘', '详情']"
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
import { conversionTimeSlotType, getDiskTypeName} from '@/utils/common.js'

export default {
    name: "diskDetail",
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
                        label:'硬盘名称',
                        prop: this.detailData.name ? this.detailData.name : '--'
                    },
                    {
                        label:'硬盘类型',
                        prop: this.detailData.type ? getDiskTypeName(this.detailData.type) : '--'
                    },
                    {
                        label:'容量(GB)',
                        prop: this.detailData.size
                    },
                    {
                        label:'状态',
                        prop: this.$conversionType('disk_status', this.detailData.status)
                    },
                    {
                        label:'挂载主机',
                        prop: this.detailData.hostName ? this.detailData.hostName : '--'
                    },
                    {
                        label:'挂载点',
                        prop: this.detailData.mountPoint ? this.detailData.mountPoint : '--'
                    },
                    {
                        label:'系统盘',
                        prop: this.detailData.isSystem ? '是' : '否'
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
            this.$https
                .get(this.$getPlatformUrl(this.$route.query.platform)+'/disk/detail',{
                    diskId: this.$route.query.diskId
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
