<template>
    <el-col :span="24" class="operation-content">
        <el-col :span="12" class="operation-title">
            <h6>基本信息</h6>
        </el-col>
        <el-col :span="12" style="text-align: right" v-if="isEdit">
            <el-button type="primary" v-if="isCancel" @click="edit" size="small">编辑</el-button>
            <el-button type="primary" v-if="!isCancel" @click="save('formName')" size="small">保存</el-button>
            <el-button type="default" v-if="!isCancel" @click="cancel" size="small">取消</el-button>
        </el-col>
    </el-col>
</template>

<script>
    export default {
        name: "operationTitle",
        props:{
            isEdit:{
                type:Boolean,
                default:true
            },
            formName:{
                type:String,
                default:''
            }
        },
        data(){
            return {
                isCancel:true
            }
        },
        methods:{
            //点击编辑触发事件
            edit(){
                this.isCancel = false
                this.$emit('updateStatus',this.isCancel,'edit')
            },
            //点击取消触发事件
            cancel(){
                this.isCancel = true
                this.$emit('updateStatus',this.isCancel,'cancel')
            },
            //点击保存触发事件
            save(formName){
                this.isCancel = false
                this.$emit('updateStatus',this.isCancel,'save')
            }
        }
    }
</script>

<style scoped>
    .operation-title h6{
        padding-left: 10px;
        border-left: 5px solid #2090ff;
        font-size: 16px;
    }
</style>