<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产中心','资源管理','应用商管理','厂商管理','添加']"
                  :isReply=true></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <el-row>
                <el-col :span="24">
                    <el-col :span="12" class="operation-title">
                        <h6>基本信息</h6>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-form :model="vendorData" label-width="120px" size="mini">
                        <el-col :span="12">
                            <el-form-item label="厂商名称：">
                                <el-input v-model="vendorData.name"></el-input>
                            </el-form-item>
                            <el-form-item label="厂商主页：">
                            <el-input v-model="vendorData.website"></el-input>
                        </el-form-item>
                            <el-form-item label="联系电话：">
                                <el-input v-model="vendorData.phone"></el-input>
                            </el-form-item>
                            <el-form-item label="联系地址：">
                                <el-input v-model="vendorData.address"></el-input>
                            </el-form-item>
                            <el-form-item label="厂商备注：">
                                <el-input v-model="vendorData.remark"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" class="operation-btn">
                            <el-button type="primary" @click="onCreate">确定</el-button>
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
        name: "vendorAdd",
        data() {
            return {
                vendorData:{
                    name:'',                //厂商名称
                    website:'',             //厂商主页
                    phone:'',               //联系电话
                    address:'',             //联系地址
                    remark:'',               //备注
                },
                itamUrl:sessionStorage.getItem(this.$constant.APP_KEY.itam)
            }
        },
        components:{
            NavTitle
        },
        methods:{
            onCreate(){
                // this.$message.warning("创建功能尚未完善！！！")
                this.$https.post(`${this.itamUrl}/manufacturer/create`,{
                    name:this.vendorData.name,
                    website:this.vendorData.website,
                    phone:this.vendorData.phone,
                    address: this.vendorData.address,
                    remark: this.vendorData.remark,
                })
                    .then((response) =>{
                        if(response.code == this.$constant.SUCCESS_CODE){
                            // this.CHANGE_LOADING_STATUS({loading: false})
                            this.$message.success(response.msg)
                            this.returnList()
                        }else{
                            this.$message.error(response.msg)
                        }
                    })
                    .catch(() => {
                        this.$message.error('请求异常')
                    })
            },
            returnList(){
                this.$router.go(-1)
            },
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
        margin-bottom: 10px;
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