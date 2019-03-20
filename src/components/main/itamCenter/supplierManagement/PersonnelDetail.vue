<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心','资产中心','供应商管理','人员管理','详情']" :isReply=true></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <el-row>
                <el-col :span="24">
                    <el-col :span="12" class="operation-title">
                        <h6>基本信息</h6>
                    </el-col>
                    <el-col :span="12" class="operation-edit">
                        <el-button type="primary" size="small" v-if="isEdit" class="save-btn" @click="save">保存
                        </el-button>
                        <el-button type="default" size="small" v-if="isEdit" class="cancel-btn" @click="cancel">
                            取消
                        </el-button>
                        <el-button type="primary" size="small" v-if="!isEdit" @click="isEdit=true">编辑</el-button>
                    </el-col>
                </el-col>
                <el-col :span="24">
                    <el-form :model="tempData" label-width="120px" size="mini" :rules="rules" ref="personnelForm">
                        <el-col :span="12">
                            <el-form-item label="人员名称：">
                                <label>{{personnelData.name}}</label>
                            </el-form-item>
                            <el-form-item v-if="!isEdit" label="所属厂商：">
                                <label>{{personnelData.manufacturerName}}</label>
                            </el-form-item>
                            <el-form-item v-show="isEdit" label="所属厂商：" prop="manufacturerId">
                                <el-select v-model="tempData.manufacturerId" placeholder="- -请选择- -" ref="manufacturerId">
                                    <el-option v-for="manufacturer in manufacturerDataList" :label="manufacturer.name"
                                               :value="manufacturer.manufacturerId" :key="manufacturer.manufacturerId"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item v-if="!isEdit" label="联系电话：">
                                <label>{{personnelData.phone}}</label>
                            </el-form-item>
                            <el-form-item v-show="isEdit" label="联系电话：" prop="phone">
                                <el-input v-model="tempData.phone" ref="personnelPhone"></el-input>
                            </el-form-item>
                            <el-form-item label="联系邮箱：">
                                <label v-if="!isEdit">{{personnelData.email}}</label>
                                <el-input v-if="isEdit" v-model="tempData.email" ref="personnelEmail"></el-input>
                            </el-form-item>
                            <el-form-item label="人员分类：">
                                <label v-if="!isEdit">{{personnelData.typeValue}}</label>
                                <el-select v-if="isEdit" v-model="tempData.type" placeholder="- -请选择- -" ref="typeValue">
                                    <el-option v-for="contactType in contactTypeList" :label="contactType.value"
                                               :value="contactType.key" :key="contactType.key"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="人员备注：">
                                <label v-if="!isEdit">{{personnelData.remark}}</label>
                                <el-input v-if="isEdit" v-model="tempData.remark" ref="personnelRemark"></el-input>
                            </el-form-item>
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
        name: "PersonnelDetail",
        data() {
            return {
                personnelData: {
                    // name:'',                    //人员名称
                    // manufacturerId:'',        //所属厂商
                    // phone:'',                   //联系电话
                    // email:'',                   //联系邮箱
                    // typeValue:'',               //人员分类
                    // remark:''                   //人员备注
                },
                tempData:{
                    name:'',                    //人员名称
                    manufacturerId:'',        //所属厂商
                    phone:'',                   //联系电话
                    email:'',                   //联系邮箱
                    typeValue:'',               //人员分类
                    remark:''                   //人员备注
                },         //临时数据
                rules:{
                    manufacturerId:[{ required: true, message: '所属厂商不能为空', trigger: 'change' }],
                    phone:[{ required: true, message: '手机号码不能为空', trigger: ['blur','change'] }]
                },
                isEdit: false,       //是否编辑
                manufacturerDataList: [],
                contactTypeList: [],
                itamUrl: sessionStorage.getItem(this.$constant.APP_KEY.itam)
            }
        },
        components: {
            NavTitle
        },
        mounted() {
            //获取详情数据
            this.$https.get(`${this.itamUrl}/contact/detail`, {
                contactId: this.$route.query.contactId
            }).then(response => {
                if (response.code == this.$constant.SUCCESS_CODE) {
                    this.personnelData = response.result;
                    this.tempData=JSON.parse(JSON.stringify(this.personnelData));
                } else {
                    this.$message.error(response.msg);
                }
            }).catch(() => {
                this.$message.error("请求异常");
            })
            //加载所属厂商
            this.$https.get(`${this.itamUrl}/manufacturer/list`)
                .then(response => {
                    if (response.code == this.$constant.SUCCESS_CODE) {
                        this.manufacturerDataList = response.result.list;
                    } else {
                        this.$message.error(response.msg)
                    }
                })
                .catch(() => {
                    this.$message.error('请求异常')
                })
            //加载人员分类
            this.$https.get(`${this.itamUrl}/mdConfig/getByParentConfigId`, {parentConfigId: 'CD402200'})
                .then(response => {
                    this.contactTypeList = response.children;
                })
                .catch(() => {
                    this.$message.error('请求异常')
                })
        },
        methods: {
            returnList() {
                this.$router.go(-1)
            },
            save() {
                this.$refs.personnelForm.validate(vaild=>{
                   if(!vaild){
                       //数据不合理
                       return false;
                   }else{
                       this.$https.put(`${this.itamUrl}/contact/update`,
                           this.tempData
                       ).then(response => {
                           if (response.code == this.$constant.SUCCESS_CODE) {
                               for(let i in this.manufacturerDataList) {
                                   if (this.tempData.manufacturerId == this.manufacturerDataList[i].manufacturerId) {
                                       this.tempData.manufacturerName = this.manufacturerDataList[i].name;
                                       break;
                                   }
                               }
                               for(let i in this.contactTypeList) {
                                   if (this.tempData.type == this.contactTypeList[i].key) {
                                       this.tempData.typeValue = this.contactTypeList[i].value;
                                       break;
                                   }
                               }
                               this.personnelData = JSON.parse(JSON.stringify(this.tempData));
                               this.isEdit=false;
                               this.$message({
                                   message: '保存成功',
                                   type: 'success'
                               });
                           } else {
                               this.$message.error(response.msg);
                           }
                       }).catch(() => {
                           this.$message.error('请求异常')
                       })
                   }
                });
            },
            cancel(){
                this.tempData=JSON.parse(JSON.stringify(this.personnelData));
                this.isEdit=false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .el-form {
        padding: 0 20px;
    }

    .el-select {
        width: 100%;
    }

    .operation-btn {
        margin: 20px 0;
        padding-left: 120px;
    }

    .operation-btn button {
        padding: 10px 50px;
    }

    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 15px;
    }

    .operation-btn button {
        font-size: 12px;
    }

    .operation-edit {
        text-align: right;

        button {
            margin: 11px 20px 11px 0;
        }

        .save-btn {
            margin: 11px 5px 11px 0;
        }

        .cancel-btn {
            background-color: #eee;
            color: #666;
            border-color: #eee;
        }

        .cancel-btn:hover {
            color: #000;
        }
    }

    .operation-title h6 {
        margin: 20px 20px;
        padding-left: 10px;
        border-left: 3px solid #2090ff;
        font-size: 14px;
    }

    .el-form-item__label {
        font-size: 12px;
    }
</style>