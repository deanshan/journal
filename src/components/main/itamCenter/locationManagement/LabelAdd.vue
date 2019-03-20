<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产中心','位置管理','标签','添加']"
                  :isReply=true></NavTitle>
        <!-- 主体 -->
        <div class="operation-info-content">
            <el-row>
                <OperationTitle :isEdit=false></OperationTitle>
                <el-col :span="12">
                    <el-form :model="labelInfo"
                             :rules="rules"
                             ref="form"
                             label-width="120px" class="form-content">
                        <el-form-item label="标签名称：" prop="name">
                            <el-input v-model="labelInfo.name" placeholder="标签名称"></el-input>
                        </el-form-item>
                        <el-form-item label="标签备注：">
                            <el-input v-model="labelInfo.remark" placeholder="标签备注"></el-input>
                        </el-form-item>
                        <div class="operation-btn">
                            <el-button type="primary" :loading="loading"
                                       @click="onSubmit('form')" size="small">确定</el-button>
                            <el-button @click="$router.go(-1)" size="small">取消</el-button>
                        </div>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import NavTitle from '@/components/common/NavTitle'
    //校验名称
    import { validatorName } from '@/utils/common.js'
    //基本信息文本
    import OperationTitle from '@/components/main/itamCenter/common/OperationTitle'

    export default {
        name: "labelAdd",
        data() {
            return {
                labelInfo:{
                    name:'',
                    remark:''
                },
                loading:false,
                rules:{
                    name: [
                        { required: true, message: '请输入标签名称', trigger: 'change' },
                        { validator:validatorName,trigger: 'change'}
                    ],
                }
            }
        },
        components: {
            NavTitle,
            OperationTitle
        },
        methods:{
            onSubmit(formName){
                this.$refs[formName].validate((valid) => {
                    this.loading = true
                    if (valid) {
                        let itamUrl = sessionStorage.getItem(this.$constant.APP_KEY.itam)
                        this.loading = true
                        this.$https.post(`${itamUrl}/label/create`,{
                            name:this.labelInfo.name,
                            remark: this.labelInfo.remark
                        })
                            .then(res => {
                                this.loading = false
                                if(res.code == this.$constant.SUCCESS_CODE){
                                    this.$notify.success(res.msg)
                                    this.$router.go(-1)
                                }else{
                                    this.$notify.error(res.msg)
                                }
                            })
                    } else {
                        return false;
                    }
                });
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
    .operation-btn{
        margin: 20px 0;
        padding-left: 120px;
    }
    .operation-btn button{
        padding: 10px 50px;
    }
    .form-content{
        margin: 20px 0;
    }
    .el-form-item{
        margin-bottom: 18px;
    }
</style>