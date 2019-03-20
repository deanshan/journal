<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产中心','资源管理','计算设备','添加']"
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
                    <el-form :model="computeData" label-width="120px" size="mini">
                        <el-col :span="12">
                            <el-form-item label="设备编码：">
                                <el-input v-model="computeData.assetCode"></el-input>
                            </el-form-item>
                            <el-form-item label="资产类型：">
                                <el-select v-model="computeData.assetType" placeholder="资产类型">
                                    <el-option label="区域一" value="1"></el-option>
                                    <el-option label="区域二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="厂商：">
                                <el-select v-model="computeData.manufacture" placeholder="厂商">
                                    <el-option label="厂商一" value="1"></el-option>
                                    <el-option label="厂商二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="型号：">
                                <el-select v-model="computeData.model" placeholder="型号">
                                    <el-option label="型号一" value="1"></el-option>
                                    <el-option label="型号二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="占用U位：">
                                <el-col :span="11">
                                    <el-input :model="computeData.startUint" placeholder="开始U位"></el-input>
                                </el-col>
                                <el-col :span="2" class="text-center">
                                    -
                                </el-col>
                                <el-col :span="11">
                                    <el-input :model="computeData.endUint" placeholder="结束U位"></el-input>
                                </el-col>
                            </el-form-item>
                            <el-form-item label="数据中心：">
                                <el-select v-model="computeData.dataCenter">
                                    <el-option label="数据中心一" value="1"></el-option>
                                    <el-option label="数据中心二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="机房：">
                                <el-select v-model="computeData.computerRoom">
                                    <el-option label="机房一" value="1"></el-option>
                                    <el-option label="机房二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="机柜：">
                                <el-select v-model="computeData.cabinet">
                                    <el-option label="机柜一" value="1"></el-option>
                                    <el-option label="机柜二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="采购价格：">
                                <el-input :model="computeData.price"></el-input>
                            </el-form-item>
                            <el-form-item label="采购日期：">
                                <el-col :span="11">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="computeData.date1" style="width: 100%;"></el-date-picker>
                                </el-col>
                                <el-col class="line text-center" :span="2">
                                    -
                                </el-col>
                                <el-col :span="11">
                                    <el-time-picker type="fixed-time" placeholder="选择时间" v-model="computeData.date2" style="width: 100%;"></el-time-picker>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="服务状态：">
                                <el-select v-model="computeData.status">
                                    <el-option label="状态一" value="1"></el-option>
                                    <el-option label="状态二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="标签：">
                                <el-select v-model="computeData.label">
                                    <el-option label="标签一" value="1"></el-option>
                                    <el-option label="标签二" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="IPV4：">
                                <el-input :model="computeData.IPV4"></el-input>
                            </el-form-item>
                            <el-form-item label="备注：">
                                <el-input :model="computeData.remark"></el-input>
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
        name: "computeAdd",
        data() {
            return {
                computeData:{
                    assetCode: '',          //设备编码
                    assetType:'',           //资产类型
                    manufacture:'',         //厂商
                    model:''     ,          //型号
                    startUint:'',           //开始U位
                    endUnit:'',             //结束U位
                    dataCenter:'',          //数据中心
                    computerRoom:'',        //机房
                    cabinet:'',             //机柜
                    date1:'',               //采购日期
                    date2:'',               //采购时间
                    status:'',              //服务状态
                    label:'',               //标签
                    IPV4:'',                //IPV4
                    remark:''               //备注
                }
            }
        },
        components:{
            NavTitle
        },
        methods:{
            onCreate(){
                this.$message.warning("创建功能尚未完善！！！")
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