<template>
    <div class="resource-detail">
        <NavTitle
            :titles="['运维中心', '资源中心', '计算服务', '主机镜像', '详情']"
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
    name: "hostImageDetail",
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
                        label:'所属资源池',
                        prop: this.detailData.resourcePoolName ? this.detailData.resourcePoolName : '--'
                    },
                    {
                        label:'镜像名称',
                        prop: this.detailData.name ? this.detailData.name : '--'
                    },
                    {
                        label:'最低内存(GB) ',
                        prop: this.detailData.minMemory != null ? this.detailData.minMemory : '--'
                    },
                    {
                        label:'最小磁盘(GB)',
                        prop: this.detailData.minDisk != null ? this.detailData.minDisk : '--'
                    },
                    {
                        label:'镜像大小(GB)',
                        prop: this.detailData.size ? this.detailData.size : '--'
                    },
                    {
                        label:'是否公有',
                        prop: this.detailData.public == 1 || this.detailData.public == null ? '是' : '否'
                    },
                    {
                        label:'创建时间',
                        prop: this.detailData.createTime ? this.detailData.createTime : '--'
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
                .get(this.$getPlatformUrl(this.$route.query.platform)+'/image/detail',{
                    imageId: this.$route.query.imageId
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
