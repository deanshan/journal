<template>
    <div class="multiple-search-content">
        <el-form :model="searchData" label-width="80px">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="设备编码">
                        <el-input v-model="searchData.assetCode" placeholder="设备编码"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="标签">
                        <el-select v-model="searchData.label" placeholder="标签">
                            <option value="">--请选择--</option>
                            <option value=""></option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="资产类型">
                        <el-input v-model="searchData.assetType"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="厂商">
                        <el-input v-model="searchData.manufacture"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="型号">
                        <el-input v-model="searchData.model"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" class="pull-right">
                    <el-button type="primary" size="small" @click="onMultiSearch">确定</el-button>
                    <el-button type="default" size="small" @click="onResetData">重置</el-button>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "multipleSearchPopup",
        data(){
            return {
                searchData: {
                    assetCode:'',       //设备编码
                    label:'',           //标签
                    assetType:'',       //资产类型
                    manufacture:'',     //厂商
                    model:''            //型号
                }
            }
        },
        methods:{
            onMultiSearch(){
                this.$message.success("暂时无法查询")
            },
            onResetData(){
                this.searchData.assetCode = ''
                this.searchData.label = ''
                this.searchData.assetType = ''
                this.searchData.model = ''
            }
        }
    }
</script>

<style scoped>

</style>