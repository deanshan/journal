<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产管理','位置管理','标签','添加']"
                  :isReply=true></NavTitle>
        <!-- 主体 -->
        <div class="operation-info-content">
            <el-row>
                <OperationTitle :isEdit=true
                                ref="baseInfo"
                                v-on:updateStatus="updateStatus"></OperationTitle>
                <el-col :span="12">
                    <el-form :model="labelDetail"
                             :rules="rules"
                             ref="form"
                             label-width="120px"
                             class="form-content">
                        <el-form-item label="标签名称:" prop="name">
                            <span class="resource-prop" v-if="!isUpdate">{{ labelDetail.name }}</span>
                            <el-input v-model="labelDetail.name" v-else></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间:">
                            <span class="resource-prop">{{ labelDetail.createTime }}</span>
                            <!--<el-input v-model="labelDetail.createTime"></el-input>-->
                        </el-form-item>
                        <el-form-item label="备注:">
                            <span class="resource-prop" v-if="!isUpdate">{{ labelDetail.remark }}</span>
                            <el-input v-model="labelDetail.remark" v-else></el-input>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import NavTitle from '@/components/common/NavTitle'
    import OperationTitle from '@/components/main/itamCenter/common/OperationTitle'
    import { SUCCESS_CODE,APP_KEY } from "@/utils/constant";
    import { validatorName } from "@/utils/common";

    export default {
        name: "labelDetail",
        data() {
            return {
                labelId:this.$route.params.labelId,
                itamUrl:sessionStorage.getItem(APP_KEY.itam),
                labelDetail:{},
                isUpdate:false,
                rules:{
                    name:[
                        { required: true, message: '请输入标签名称', trigger: 'change' },
                        { validator:validatorName,trigger: 'change'}
                    ]
                }
            }
        },
        components: {
            NavTitle,
            OperationTitle
        },
        mounted(){
            this.getLabelDetail()
        },
        methods:{
            getLabelDetail(){
                this.itamUrl = sessionStorage.getItem(APP_KEY.itam)
                this.$https.get(`${this.itamUrl}/label/detail`,{
                    labelId:this.labelId
                })
                    .then(res => {
                        if(res.code == SUCCESS_CODE){
                            this.labelDetail = res.result
                        }else{
                            this.$notify.error(res.msg)
                        }
                    })
            },
            updateStatus(status,type){
                this.isUpdate = !status
                switch (type) {
                    case 'cancel':
                        this.$refs['form'].resetFields();
                        this.getLabelDetail()
                        break;
                    case 'save':
                        this.$refs['form'].validate((valid) => {
                            if(valid){
                                this.$https.put(`${this.itamUrl}/label/update`,{
                                    labelId:this.labelId,
                                    name:this.labelDetail.name,
                                    remark:this.labelDetail.remark
                                })
                                    .then(res => {
                                        if(res.code == SUCCESS_CODE){
                                            this.$notify.success(res.msg)
                                            this.$refs.baseInfo.cancel()
                                        }else{
                                            this.$notify.error(res.msg)
                                        }
                                    })
                            }else{
                                return false
                            }
                        })

                        break;
                }
            }
        }
    }
</script>

<style scoped>
    .operation-info-content{
        min-height: 500px;
        background-color: #FFFFFF;
        padding: 20px;
    }
    .form-content{
        margin: 20px 0;
    }
    .resource-prop{
        padding-left: 20px;
    }
</style>