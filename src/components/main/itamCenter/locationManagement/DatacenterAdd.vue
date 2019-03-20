<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产中心','位置管理','数据中心','添加']"
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
                    <el-form :model="datacenterData" label-width="120px" size="mini">
                        <el-col :span="12">
                            <el-form-item label="数据中心名称：">
                                <el-input v-model="datacenterData.name"></el-input>
                            </el-form-item>
                            <el-form-item label="所属国家：">
                                <el-select v-model="datacenterData.country">
                                    <el-option label="中国" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="所在城市：">
                                <el-select v-model="datacenterData.city">
                                    <el-option label="上海" value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="数据中心地址：">
                                <el-input v-model="datacenterData.address"></el-input>
                            </el-form-item>
                            <el-form-item label="数据中心备注：">
                                <el-input v-model="datacenterData.remark"></el-input>
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
        name: "datacenterAdd",
        data(){
            return {
                datacenterData:{
                    name:'',
                    countryValue:'',
                    cityValue:'',
                    address:'',
                    remark:''
                }
            }
        },
        methods:{
            onCreate(){
                this.$message.warning("创建功能尚未完善！！！")
            },
            returnList(){
                this.$router.go(-1)
            }
        },
        components:{
            NavTitle
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