<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心', '监控中心', '通知组']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <!-- 查询 -->
            <div class="search-content">
                <el-button type="default" icon="fa fa-refresh" @click="tableRefresh()" class="btn-refresh"></el-button>

                <el-button type="primary" @click="dialog = true" class="btn-add" size="small">添加</el-button>

                <el-dialog title="添加通知组" :visible.sync="dialog">
                    <el-form :model="groupData">
                        <el-form-item label="通知组：" >
                            <el-input v-model="groupData.name" ></el-input>
                        </el-form-item>
                        <el-form-item label="备注：">
                            <el-input v-model="groupData.remark" ></el-input>
                        </el-form-item>
                        <el-form-item label="通知方式" >
                            <el-checkbox-group v-model="groupData.types">
                                <el-checkbox label="1" name="type">邮箱</el-checkbox>
                                <el-checkbox label="3" name="type">短信</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="资源类型" >
                            <el-select v-model="groupData.resourceType" placeholder="请选择资源类型">
                                <el-option label="云主机" value="10"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialog = false">取 消</el-button>
                        <el-button type="primary" @click="addGroupNoticeCheck">确 定</el-button>
                    </div>
                </el-dialog>

                <el-form :inline="true" :model="groupData" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="searchData.name" placeholder="请输入通知组名称" size="small">
                            <template slot="prepend">通知组名称</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-search" @click="onSubmit" @keyup.enter="onSubmit" size="small" class="btn-line-height">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>



            <!-- 表格 -->
            <div class="table-content">
                <el-table :tableData="tableData"
                            :itemData="itemData"
                            :operationData="operationData"
                            :total="totalNum"
                            :url="url"
                            ref="baseTableData"
                            :baseloading="loading"
                            :data="tableData">


                        <el-table-column type="expand"  >
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand"  v-for="data in props.row.list">
                                    <el-form-item>
                                        <span></span>
                                    </el-form-item>
                                    <el-form-item >
                                        <span>{{ data.username}}</span>
                                    </el-form-item>
                                    <el-form-item >
                                        <span >{{data.mobile}}</span>
                                    </el-form-item>
                                    <el-form-item   >
                                        <span>{{data.email}}</span>
                                    </el-form-item>


                                    <el-form-item label-position="center">
                                        <el-button type="text" size="mini"@click="remove(data.userId,props.row)">删除</el-button>
                                        <el-dialog title="删除通知人" :visible.sync="userRemoveDialog">
                                            <el-form :model="removeUserData">
                                                确定删除该通知人么？
                                            </el-form>
                                            <div slot="footer" class="userRemoveDialog-footer">
                                                <el-button @click="userRemoveDialog = false">取 消</el-button>
                                                <el-button type="primary" @click="removeUser">确 定</el-button>
                                            </div>
                                        </el-dialog>
                                    </el-form-item>

                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="通知组"
                        >
                        </el-table-column>
                        <el-table-column
                                prop="userName"
                                label="通知人">
                        </el-table-column>
                    <el-table-column
                            prop="mobile"
                            label="手机">
                    </el-table-column>
                    <el-table-column
                            prop="email"
                            label="邮箱"
                    >
                    </el-table-column>


                    <el-table-column label="操作" >
                    <template slot-scope="scope">

                        <el-button type="text" @click="edit(scope.row)">编辑</el-button>

                        <el-dialog title="编辑通知组" :visible.sync="groupEditDialog">
                            <el-form :model="editGroupData">
                                <el-form-item label="通知组：" >
                                    <el-input v-model="editGroupData.name" ></el-input>
                                </el-form-item>
                                <el-form-item label="备注：">
                                    <el-input v-model="editGroupData.remark" ></el-input>
                                </el-form-item>
                                <el-form-item label="通知方式" >
                                    <el-checkbox-group v-model="editGroupData.types">
                                        <el-checkbox label="1" name="type">邮箱</el-checkbox>
                                        <el-checkbox label="3" name="type">短信</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>

                                <!--<el-form-item label="资源类型" >
                                    <el-select v-model="editGroupData.resourceType" placeholder="请选择资源类型">
                                        <el-option label="云主机" value="10"></el-option>
                                        <el-option label="云硬盘" value="20"></el-option>
                                    </el-select>
                                </el-form-item>-->

                            </el-form>
                            <div slot="footer" class="groupEditDialog-footer">
                                <el-button @click="groupEditDialog = false">取 消</el-button>
                                <el-button type="primary" @click="editGroup">确 定</el-button>
                            </div>
                        </el-dialog>



                        <el-button type="text" @click="add(scope.row)">添加用户</el-button>

                        <el-dialog title="添加通知人" :visible.sync="userAddDialog">
                            <template>
                                <el-table
                                        :data="userTableData"
                                        style="width: 100%"
                                        @selection-change="change">
                                    <el-table-column type="selection">
                                    </el-table-column>
                                    <el-table-column
                                            prop="username"
                                            label="通知人"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="mobile"
                                            label="手机"
                                            width="180">
                                    </el-table-column>
                                    <el-table-column
                                            prop="email"
                                            label="邮箱">
                                    </el-table-column>
                                </el-table>
                            </template>

                            <div slot="footer" class="userAddDialog-footer">
                                <el-button @click="userAddDialog = false">取 消</el-button>
                                <el-button type="primary" @click="addUser">确 定</el-button>
                            </div>
                        </el-dialog>

                        <el-button type="text" @click="deleteOperation(scope.row)">删除</el-button>
                        <el-dialog title="删除通知组" :visible.sync="groupDeleteDialog">
                            <el-form :model="deleteGroupData">
                                确定删除么？
                            </el-form>
                            <div slot="footer" class="groupEditDialog-footer">
                                <el-button @click="groupDeleteDialog = false">取 消</el-button>
                                <el-button type="primary" @click="deleteGroup">确 定</el-button>
                            </div>
                        </el-dialog>



                    </template>
                </el-table-column>
                </el-table>


            </div>
        </div>
    </div>
</template>


<style>
    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 20%;
    }
</style>






<script>
    import NavTitle from '@/components/common/NavTitle'
    import BaseTable from '@/components/common/table/BaseTable'
    export default {
        name: "noticeGroup",
        data(){
            return {
                loading:true,
                url:`${this.monitorUrl}/notify/group/page`,
                userTableData:[],
                checkUserData:[],
                userIds:[],
                searchData:{
                    name:'',
                    projectId:''
                },
                groupData:{
                    name:'',
                    groupId:'',
                    //projectId:'0cc37b6dac684f4eae5be595e7bfa992',
                    resourceType:'',
                    types:[],
                    remark:''
                },
                editGroupData:{
                    name:'',
                    groupId:'',
                    //projectId:'0cc37b6dac684f4eae5be595e7bfa992',
                    resourceType:'',
                    types:[],
                    remark:''
                },
                userData:{
                    userName:'',
                    mobile:'',
                    email:'',
                    groupId:'',
                    projectId:'',
                    userIds:''
                },
                addUserData:{
                    groupId:'',

                },
                removeUserData:{
                    groupId:'',
                    userIds:''
                },

                deleteGroupData:{
                    groupId:'',
                },

                tableData:[],
                totalNum:1,
                itemData:[{
                    prop:"name",
                    label:"通知组",
                    width:'150'
                },{
                    prop:"userName",
                    label:"通知人",
                    width:'150'
                },{
                    prop:"mobile",
                    label:"手机",
                    width:'150'
                },{
                    prop:"email",
                    label:"邮箱",
                    width:'200'
                }],
                operationData:[{
                    prop:"operation",
                    label:"操作",
                    width:'100',
                    list:[{
                        name:"编辑",
                        type: 'detail',
                        textClass:"text-operation"
                    }]
                }],
                dialog: false,
                userAddDialog: false,
                groupEditDialog: false,
                groupDeleteDialog:false,
                userAddDialog:false,
                userRemoveDialog:false

            }
        },
        components:{
            NavTitle,
            BaseTable
        },
        computed:{
            monitorUrl(){
                return sessionStorage.getItem(this.$constant.APP_KEY.monitor)
            },
        },

        mounted(){
            this.getDataList(this.$refs.baseTableData.currentPage)
        },
        methods:{
            //获取row的key值
            getRowKeys(row) {
                return row.id;
            },

            addGroupNoticeCheck(){
                this.$https.get(`${this.monitorUrl}/notify/group/check`,{
                    resourceType:this.groupData.resourceType

                })
                    .then((res) => {
                        if(res){
                            alert("该资源已绑定，请重新选择资源类型！");
                          } else{
                                 this.groupNoticeAdd();
                            }
                    }).catch(error => {
                    this.loading=false
                })

            },


            groupNoticeAdd(){
                this.$https.post(`${this.monitorUrl}/notify/group/create`,{
                        name:this.groupData.name,
                        types:this.groupData.types.join(),
                        remark:this.groupData.remark,
                         resourceType:this.groupData.resourceType

                    })
                    .then((res) => {
                        //alert(JSON.stringify(res));
                        if(res.code === this.$constant.SUCCESS_CODE){
                            this.$message.success("添加通知组成功")

                        }else{
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    this.loading=false
                })
                this.dialog = false;
                this.tableRefresh();
                this.groupData.name="";
                this.groupData.projectId="";
                this.groupData.types=[];
                this.groupData.remark="";
                this.groupData.resourceType="";
            },
            edit(row){
                this.editGroupData.groupId=row.notificationGroupId==null?"":row.notificationGroupId;
                this.editGroupData.name=row.name==null?"":row.name;
                this.editGroupData.remark=row.remark==null?"":row.remark;
                this.editGroupData.types=row.notifyType.split(",");
                this.groupEditDialog=true;

            },

            editGroupNoticeCheck(){
                this.$https.get(`${this.monitorUrl}/notify/group/check`,{
                    resourceType:this.editGroupData.resourceType

                })
                    .then((res) => {
                        alert(res);
                        if((res)){
                            alert("该资源已绑定，请重新选择资源类型！");
                        } else{
                            this.editGroup();
                        }
                    }).catch(error => {
                    this.loading=false
                })

            },
            editGroup(){
                this.$https.put(`${this.monitorUrl}/notify/group/update`,{
                    name:this.editGroupData.name,
                    groupId:this.editGroupData.groupId,
                    types:this.editGroupData.types.join(),
                    remark:this.editGroupData.remark,

                })
                    .then((res) => {
                        //alert(JSON.stringify(res));
                        if(res.code === this.$constant.SUCCESS_CODE){
                            this.$message.success("编辑通知组成功")
                        }else{
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    this.loading=false
                })
                this.groupEditDialog = false;
                this.tableRefresh();


            },
            add(row){

                this.userData.groupId=row.notificationGroupId;
                this.userData.projectId=row.projectId==null?"":row.projectId;

                //alert(JSON.stringify(row));
                this.getUserPage();
                this.userAddDialog =true;
            },
            getUserPage(){

                this.$https.get(`${this.monitorUrl}/notify/group/project/user/page`,{
                    projectId:this.userData.projectId,
                    groupId:this.userData.groupId

                })
                    .then((res) => {
                        //alert(JSON.stringify(res));
                        if(res.code === this.$constant.SUCCESS_CODE){
                            //this.$message.success("获取通知组用户成功");
                           // alert(JSON.stringify(res));
                            this.userTableData = res.result.pageInfo.list;
                           /* this.userTableData.forEach(user => {
                                alert("userId:"+user.userId);
                            })*/
                         // alert(JSON.stringify(this.userTableData));
                        }else{
                            //this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    this.loading=false
                })

            },
            addUser(){
                this.$https.post(`${this.monitorUrl}/notify/group/member/add`,{
                    groupId:this.userData.groupId,
                    userIds:this.userIds.join()

                })
                    .then((res) => {
                        if(res.code === this.$constant.SUCCESS_CODE){
                            this.$message.success("添加通知人成功")
                        }else{
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    this.loading=false;
                })
                this.userAddDialog = false;
                this.userIds=[];
                this.tableRefresh();

            },
            change(val) {
                this.checkUserData = val;
                this.checkUserData.forEach(user => {
                   this.userIds.push(user.userId);
                })
            },

            deleteOperation(row){
                this.deleteGroupData.groupId=row.notificationGroupId==null?"":row.notificationGroupId;
                this.groupDeleteDialog=true;

            },
            deleteGroup(){
                this.$https.delete(`${this.monitorUrl}/notify/group/delete`,{
                    groupId:this.deleteGroupData.groupId,

                })
                    .then((res) => {
                        //alert(JSON.stringify(res));
                        if(res.code === this.$constant.SUCCESS_CODE){
                            this.$message.success("删除通知组成功")
                        }else{
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    this.loading=false
                })
                    this.groupDeleteDialog=false;
                    this.tableRefresh();


            },

            getDataList(val){
                this.$https.get(`${this.monitorUrl}/notify/group/page`,{
                        page:val,
                        rows:this.$refs.baseTableData.pageSize,
                        name:this.searchData.name,
                        projectId:'',

                    })
                    .then((response) => {
                        this.loading=false
                        if(response.code === this.$constant.SUCCESS_CODE){
                            this.tableData = response.result.pageInfo.list;
                            /*alert(this.tableData[0].name);
                            alert(this.tableData[0].list[0].userName);
                            alert(this.tableData[0].list[0].email);
                            alert(JSON.stringify(tableData));
                            this.$message.success(response.msg)*/
                            this.totalNum = response.result.pageInfo.total;

                        }else{
                            //this.$message.error(response.msg)
                        }
                    }).catch(error => {
                    this.loading=false
                })
            },
            onSubmit(){
                this.getDataList(this.$refs.baseTableData.currentPage)
            },
            tableRefresh(){
                this.searchData.name = ""
                this.$refs.baseTableData.currentPage = 1
                this.getDataList(this.$refs.baseTableData.currentPage)
            },

            remove(userId,row){
                //this.userData.groupId=row.notificationGroupId;
                this.removeUserData.userIds=userId;
                this.removeUserData.groupId=row.notificationGroupId;
                /*alert(JSON.stringify(row));
                alert(userId);*/
                this.userRemoveDialog =true;
            },
            removeUser(){
                this.$https.post(`${this.monitorUrl}/notify/group/member/remove`,{
                    groupId:this.removeUserData.groupId,
                    userIds:this.removeUserData.userIds

                })
                    .then((res) => {
                        if(res.code === this.$constant.SUCCESS_CODE){
                            this.$message.success("删除通知人成功")
                        }else{
                            this.$message.error(res.msg)
                        }
                    }).catch(error => {
                    this.loading=false;
                })
                this.userRemoveDialog = false;
                this.tableRefresh();

            }
        }
    }
</script>


<style scoped>
    .demo-form-inline{
        float: right;
    }
    .search-content{
        padding: 10px 20px;
    }
</style>

