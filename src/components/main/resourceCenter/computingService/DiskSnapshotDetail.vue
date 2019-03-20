<template>
    <div class="resource-detail">
        <NavTitle
            :titles="['运维中心', '资源中心', '计算服务', '硬盘快照', '详情']"
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

export default {
    name: "diskSnapshotDetail",
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
                        label:'快照名称',
                        prop: this.detailData.name ? this.detailData.name : '--'
                    },
                    {
                        label:'硬盘名称',
                        prop: this.detailData.diskName ? this.detailData.diskName : '--'
                    },
                    {
                        label:'容量（GB）',
                        prop: this.detailData.size
                    },
                    {
                        label:'状态',
                        prop: this.$conversionType('disk_snapshot_status', this.detailData.status)
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
    },
    methods:{
        getResourceDetail(){
            this.$https
                .get(this.$getPlatformUrl(this.$route.query.platform)+'/diskSnapshot/detail',{
                    diskSnapshotId: this.$route.query.diskSnapshotId
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
