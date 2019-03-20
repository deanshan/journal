<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle
                :titles="['运维中心','监控中心','监控模板','添加']"
                :isReply=true
        ></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <el-row>
                <el-col :span="24">
                    <el-col :span="12" class="operation-title">
                        <h6>基本信息</h6>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-form :model="templateData" label-width="120px">
                        <el-col :span="12">
                            <el-form-item label="模板名称 :">
                                <el-input v-model="templateData.name" placeholder="模版名称"></el-input>
                            </el-form-item>
                            <el-form-item label="资源类型 :">
                                <el-select v-model="templateData.resourceType" placeholder="资源类型" @change="currentSel">
                                    <el-option label="云主机" value="10"></el-option>
                                    <el-option label="宿主机" value="9"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="备注 :">
                                <el-input v-model="templateData.remark"></el-input>
                            </el-form-item>
                            <el-form-item label="模版规则 :">
                                <div class="table-content">
                                    <el-table :data="tableData">
                                        <el-table-column width="0" prop="itemKey" v-if='show'></el-table-column>
                                        <el-table-column width="0" prop="itemDicId" v-if='show'></el-table-column>
                                        <el-table-column width="60" prop="name" label="监控项"></el-table-column>
                                        <el-table-column width="70" prop="comparator" label="对比方式"></el-table-column>
                                        <el-table-column width="70" prop="triggerExpression" label="告警阈值"></el-table-column>
                                        <el-table-column width="70" prop="triggerTimes" label="触发周期"></el-table-column>
                                        <el-table-column width="70" prop="triggerStrategy" label="收敛策略"></el-table-column>
                                        <el-table-column width="60" prop="templateId" label="操作">
                                            <template scope="scope">
                                                <a @click="deleteThisrow(scope.$index)">删除</a>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </div>
                                    <el-dialog title="添加监控模版" :visible.sync="dialog">
                                        <el-form>
                                            <el-table :data="itemruleData" @selection-change="handleSelectionChange">
                                                <el-table-column width="270" type="selection"></el-table-column>
                                                <el-table-column width="270" prop="name" label="监控项"></el-table-column>
                                                <el-table-column width="0" v-if='show' prop="monitorItemId" ></el-table-column>
                                                <el-table-column width="0" v-if='show' prop="itemKey" ></el-table-column>
                                                <el-table-column width="0" v-if='show' prop="valueType" ></el-table-column>
                                            </el-table>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button type="primary" @click="addItemToTable">确 定</el-button>
                                            <el-button @click="dialog = false">取 消</el-button>
                                        </div>
                                    </el-dialog>
                                    <el-button type="primary" @click="showAddRuleWindow" class="btn-add" size="small">添加</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="24" class="operation-btn">
                            <el-button type="primary" @click="saveTemplate">确定</el-button>
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
    import ResourceDetails from '@/components/common/resource/ResourceDetails'
    import BaseTable from '@/components/common/table/BaseTable'
    export default {
        name: "monitorTemplateAdd",
        data() {
            return {
                show:false,
                templateData:{
                    name: '',               //模版名称
                    resourceType:'',        //资源类型
                    remark:'',              //备注
                },
                resource:[],
                bbb:[],
                resource1:[10,10],
                itemruleDatatemp:{
                    itemKey:"",
                    itemDicId:"",
                    name:"",
                    comparator:"",
                    triggerExpression:"",
                    triggerTimes:"",
                    triggerStrategy:"",
                },
                itemruleData:[],
                multipleSelection:[],
                tableData:[],
                dialog: false,
                itemKeyUsed:[]

            }
        },
        components: {
            NavTitle,
            ResourceDetails,
            BaseTable
        },
        computed:{
            monitorUrl(){
                return sessionStorage.getItem(this.$constant.APP_KEY.monitor)
            },
        },
        mounted() {

        },
        methods: {
            currentSel(){
               this.tableData=[];
               this.itemruleData=[];
               this.multipleSelection=[];
            },
            saveTemplate(){
                let reg = /^[\u4E00-\u9FA5A-Za-z0-9_-]+$/;
                if(this.templateData.name == null || this.templateData.name == ""){
                    this.$message.warning("模板名称不能为空")
                }else if(this.templateData.name.length<2 || this.templateData.name.length >40){
                    this.$message.warning("请在模板名称中输入2~40个字符");
                }else if(!reg.test(this.templateData.name)){
                    this.$message.warning("模板名称不能含有特殊字符");
                }else{
                    let triggers=[];
                    let MTriggerVO={}
                    this.tableData.forEach(item => {
                        MTriggerVO={
                            triggerId:"",
                            itemKey:item.name,
                            expression:"70",
                            alarmLevel:"1",
                            comparator:">=",
                            triggerTimes:"3",
                            triggerStrategy:"连续告警",
                            templateId:""
                        }
                        triggers.push(MTriggerVO);
                        })
                    let templateParam={
                        name:this.templateData.name,
                        remark:this.templateData.remark,
                        resourceType:this.templateData.resourceType,
                        //projectId:"0cc37b6dac684f4eae5be595e7bfa992",
                        triggers:triggers,
                    };
                    console.log(JSON.stringify(templateParam))
                    if(triggers.length > 0){
                        this.resource = this.$route.params.resource;
                        if(this.resource.indexOf(this.templateData.resourceType)< 0){
                            this.axios.post(`${this.monitorUrl}/monitor/template/create`,JSON.stringify(templateParam),{
                                headers:{
                                    'Content-Type':'application/json',
                                    'token':sessionStorage.getItem('token')
                                }
                            }).then((res) => {
                                if(res.data.code === this.$constant.SUCCESS_CODE){
                                    this.$message.success("创建成功");
                                    this.$router.go(-1)
                                }else{
                                    this.$message.error(res.data.msg)
                                }
                            })
                        }else {
                            this.$message.warning("该资源类型监控模版已存在");
                        }
                    }else {
                        this.$message.warning("至少添加一条监控项");
                    }
                }
            },

            returnList(){
                this.$router.go(-1)
            },
            deleteThisrow(index){
                this.tableData.splice(index,1)
                this.itemKeyUsed.splice(index,1)
            },
            getitemList(){
                this.$https.get(`${this.monitorUrl}/item/list`,{
                    resourceType: this.templateData.resourceType
                    }).then((res) => {
                        if(res.code === this.$constant.SUCCESS_CODE){
                            this.itemruleDatatemp = res.result.list;
                            if(this.tableData.length == 0){
                                this.itemruleData = this.itemruleDatatemp;
                            }else{
                                this.itemruleData = []
                                this.itemruleDatatemp.forEach((item) => {
                                    if(this.itemKeyUsed.indexOf(item.itemKey) < 0){
                                        this.itemruleData.push(item);
                                    }

                                })
                            }
                        }else{
                            this.$message.error(res.data.msg)
                        }

                    });

            },
            showAddRuleWindow(){
                this.getitemList();
                this.dialog = true;

            },
            handleSelectionChange(val) {

                this.multipleSelection = val;
            },
            addItemToTable(){
                this.dialog = false;
                let ptmArray = []
                // this.itemKeyUsed = []
                this.multipleSelection.forEach((item) => {
                    item.name = item.name+"("+item.unit+")"
                    ptmArray.push(item)
                    this.tableData.push({
                        'itemKey':item.itemKey,
                        'name': item.name,
                        'comparator': ">=",
                        'triggerExpression': 70,
                        'triggerTimes' :"3",
                        'triggerStrategy' :"连续告警"
                    })
                    this.itemKeyUsed.push(item.itemKey)
                })
            },

        },
    }
</script>

<style scoped>
    .operation-btn{
        margin: 20px 0;
        padding-left: 120px;
    }
    .operation-btn button{
        padding: 10px 50px;
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
    .el-select{
        width: 100%;
    }
</style>