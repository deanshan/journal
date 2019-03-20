<template>
    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" width="550px" :before-close="onCancel">
        <el-form :model="exportData">
            <el-form-item :label="dialogTitle" label-width="100px">
                <el-select v-model="exportData.type">
                    <el-option v-for="option in optionData" :label="option.label" :value="option.value"></el-option>
                    <!--<el-option label="导出全部设备" value="1"></el-option>-->
                    <!--<el-option label="导出当前搜索条件下的设备" value="2"></el-option>-->
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="onCancel">取 消</el-button>
            <el-button type="primary" @click="onExportService">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "exportDialog",
        props:{
            dialogFormVisible:{},
            dialogTitle:{
                default:"导出设备"
            },
            optionData:{
                default:[
                    {label:"导出全部设备",value:1},
                    {label:"导出当前搜索条件下的设备",value:2}
                ]
            }
        },
        data() {
            return {
                exportData:{
                    type:''
                },

            }
        },
        methods:{
            onExportService(){
                this.$parent.onExport(this.exportData.type)
                this.onCancel()
            },
            onCancel(){
                this.$emit('visible-change')
            }
        }
    }
</script>

<style scoped>

</style>