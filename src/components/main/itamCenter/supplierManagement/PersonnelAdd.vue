<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产中心','供应商管理','人员管理','添加']" :isReply=true></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <el-row>
                <el-col :span="24">
                    <el-col :span="12" class="operation-title">
                        <h6>基本信息</h6>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-form :model="personnelData" label-width="120px" size="mini" :rules="rules" ref="personnelForm">
                        <el-col :span="12">
                            <el-form-item label="人员名称：" prop="name">
                                <el-input v-model="personnelData.name" :model="personnelData.name"></el-input>
                            </el-form-item>
                            <el-form-item label="所属厂商：" prop="manufacturerId">
                                <el-select v-model="personnelData.manufacturerId" placeholder="- -请选择- -">
                                    <el-option v-for="manufacturer in manufacturerDataList" :label="manufacturer.name" :value="manufacturer.manufacturerId" :key="manufacturer.manufacturerId"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="联系电话：" prop="phone">
                                <el-input v-model="personnelData.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="联系邮箱：">
                                <el-input v-model="personnelData.email"></el-input>
                            </el-form-item>
                            <el-form-item label="人员分类：">
                                <el-select v-model="personnelData.typeValue" placeholder="- -请选择- -">
                                    <el-option v-for="contactType in contactTypeList" :label="contactType.value" :value="contactType.key" :key="contactType.key"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="人员备注：">
                                <el-input v-model="personnelData.remark"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" class="operation-btn">
                            <el-button type="primary" @click="onCreate">添加</el-button>
                            <el-button @click="returnList">取消</el-button>
                        </el-col>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import NavTitle from '@/components/common/NavTitle'

    export default {
        name: "PersonnelAdd",
        data(){
            return {
                personnelData:{
                    name:'',                    //人员名称
                    manufacturerId:'',        //所属厂商
                    phone:'',                   //联系电话
                    email:'',                   //联系邮箱
                    typeValue:'',               //人员分类
                    remark:''                   //人员备注
                },
                rules:{
                    name:[
                        { required: true, message: '请输入人员名称', trigger: ['blur','change'] }
                    ],
                    manufacturerId:[
                        { required: true, message: '请选择所属厂商', trigger: 'change' }
                    ],
                    phone:[
                        { required: true, message: '请输入手机号码', trigger: ['blur','change'] }
                    ]
                },
                manufacturerDataList:[],
                contactTypeList:[],
                itamUrl:sessionStorage.getItem(this.$constant.APP_KEY.itam)
            }
        },
        components:{
            NavTitle
        },
        mounted(){
            this.$https.get(`${this.itamUrl}/manufacturer/list`)
                .then(response=>{
                    if(response.code == this.$constant.SUCCESS_CODE){
                        this.manufacturerDataList=response.result.list;
                    }else{
                        this.$message.error(response.msg)
                    }
                })
                .catch(()=>{
                    this.$message.error('请求异常')
                })
            this.$https.get(`${this.itamUrl}/mdConfig/getByParentConfigId`,{parentConfigId:'CD402200'})
                .then(response=>{
                    this.contactTypeList=response.children;
                })
                .catch(()=>{
                    this.$message.error('请求异常')
                })
        },
        methods:{
            onCreate(){
                this.$refs.personnelForm.validate(vaild=>{
                    if(!vaild){
                        //数据不合理
                        return false;
                    }else{
                        this.$https.post(`${this.itamUrl}/contact/create`,{
                            name:this.personnelData.name,
                            type:this.personnelData.typeValue,
                            phone:this.personnelData.phone,
                            email: this.personnelData.email,
                            remark: this.personnelData.remark,
                            manufacturerId: this.personnelData.manufacturerId
                        })
                            .then(response=>{
                                if(response.code==this.$constant.SUCCESS_CODE){
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    this.returnList();//添加成功，返回列表页
                                }else{
                                    this.$message.error(response.msg)
                                }
                            })
                            .catch(()=>{
                                this.$message.error('请求异常')
                            })
                    }
                });
            },
            returnList(){
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
    .el-form{
        padding: 0 20px;
    }
    .el-select{
        width: 100%;
    }
    .operation-btn{
        margin: 20px 0;
        padding-left: 120px;
    }
    .operation-btn button{
        padding: 10px 50px;
    }
    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 15px;
    }
    .operation-btn button{
        font-size: 12px;
    }
    .operation-title h6{
        margin: 20px 20px;
        padding-left: 10px;
        border-left: 3px solid #2090ff;
        font-size: 14px;
    }
    .el-form-item__label{
        font-size: 12px;
    }
</style>