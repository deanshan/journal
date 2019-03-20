<template>
    <div class="resource-detail">
        <NavTitle
            :titles="['运维中心', '资源中心', '计算服务', 'VPC', '详情']"
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
    name: "vpcDetail",
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
                        label:'所属VDC',
                        prop: this.detailData.vdcName ? this.detailData.vdcName : '--'
                    },
                    {
                        label:'所属项目',
                        prop: this.detailData.projectName ? this.detailData.projectName : '--'
                    },
                    {
                        label:'VPC名称',
                        prop: this.detailData.name ? this.detailData.name : '--'
                    },
                    {
                        label:'VPC状态',
                        prop: this.$conversionType('vpc_status', this.detailData.status)
                    },
                    {
                        label:'VPC网段',
                        prop: this.detailData.name ? this.getSegments(this.detailData.networkSegments) : '--'
                    },
                    {
                        label:'创建时间',
                        prop: this.detailData.createTime ? this.detailData.createTime : '--'
                    },
                    {
                        label:'VPC备注',
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
                .get(this.$getPlatformUrl(this.$route.query.platform)+'/vpc/detail',{
                    vpcId: this.$route.query.vpcId
                })
                .then(res => {
                    if(res.code === this.$constant['SUCCESS_CODE']) {
                        this.detailData = res.result
                    } else {
                        this.$message(res.msg)
                    }
                })
        },
        getSegments(list){
            let content = "";
            for(let item of Object.values(list)) {
                content += ","+item['networkSegment']
            }
            return content.substring(1);
        }
    }
}

</script>

<style lang="scss" scoped>
</style>
