    <template>
        <div class="operation-main-content">
            <!-- 导向 -->
            <NavTitle :titles="['运维中心','资产中心','位置管理','机柜','添加']"
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
                        <el-form :model="cabinetData" label-width="120px" size="mini">
                            <el-col :span="12">
                                <el-form-item label="机柜名称：">
                                    <el-input :model="cabinetData.name"></el-input>
                                </el-form-item>
                                <el-form-item label="数据中心：">
                                    <el-select v-model="cabinetData.dataCenterName">
                                        <el-option v-for="dataCenter in dataCenterNameList" :label="dataCenter.name" :value="dataCenter.name" :key="dataCenter.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属机房：">
                                    <el-select v-model="cabinetData.computerRoomName">
                                        <el-option v-for="computerRoom in computerRoomNameList" :label="computerRoom.name" :value="computerRoom.name" :key="computerRoom.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="所属厂商：">
                                    <el-select v-model="cabinetData.manufacturerName" placeholder="厂商">
                                        <el-option v-for="manufacturer in manufacturerNameList" :label="manufacturer.name" :value="manufacturer.name" :key="manufacturer.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="机柜型号：">
                                    <el-select v-model="cabinetData.modelName" placeholder="型号">
                                        <el-option v-for="modelName in modelNameList" :label="modelName.name" :value="modelName.name" :key="modelName.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="总U位数：">
                                    <el-input :model="cabinetData.remark"></el-input>
                                </el-form-item>
                                <el-form-item label="机柜备注：">
                                    <el-input :model="cabinetData.remark"></el-input>
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
    import OperationTitle from '@/components/main/itamCenter/common/OperationTitle'

    export default {
        name: "cabinetAdd",
        data() {
            return {
                dataCenterNameList:[],
                computerRoomNameList:[],
                manufacturerNameList:[],
                modelNameList:[],
                cabinetData:{
                    name: '',          //机柜名称
                    manufacturerName:'',         //厂商
                    modelName:''     ,          //型号
                    dataCenterName:'',          //数据中心
                    computerRoomName:'',        //机房
                    remark:''               //备注
                },

                itamUrl:sessionStorage.getItem(this.$constant.APP_KEY.itam),

            }
        },
        components:{
            NavTitle,
            OperationTitle
        },
        mounted(){
            this.$https.get(`${this.itamUrl}/datacenter/list`)
                .then((response) => {
                    if(response.code == this.$constant.SUCCESS_CODE){
                        this.dataCenterNameList = response.result.list;
                    }else{
                        this.$message.error(response.msg)
                    }
                })
            this.$https.get(`${this.itamUrl}/computer-room/list`)
                .then((response) => {
                    if(response.code == this.$constant.SUCCESS_CODE){
                        this.computerRoomNameList = response.result.list;
                    }else{
                        this.$message.error(response.msg)
                    }
                })
            this.$https.get(`${this.itamUrl}/manufacturer/list`)
                .then((response) => {
                    if(response.code == this.$constant.SUCCESS_CODE){
                        this.manufacturerNameList = response.result.list;
                    }else{
                        this.$message.error(response.msg)
                    }
                })
            this.$https.get(`${this.itamUrl}/model/list`)
                .then((response) => {
                    if(response.code == this.$constant.SUCCESS_CODE){
                        this.modelNameList = response.result.list;
                    }else{
                        this.$message.error(response.msg)
                    }
                })
                .catch(() => {
                    this.$message.error('请求异常')
                })
        },
        methods:{
            onCreate(){
           /*         this.$refs.cabinetForm.validate(vaild=>{
                        if(!vaild){
                            //数据不合理
                            return false;
                        }else{
                            this.$https.post(`${this.itamUrl}/cabinet/create`,{
                                name:this.cabinetData.name,
                                manufacturerId
                                modelId
                                computerRoomId
                                remark: this.cabinetData.remark,

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
                    });*/
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