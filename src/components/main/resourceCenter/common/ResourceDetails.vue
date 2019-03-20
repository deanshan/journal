<template>
    <div class="resource-details">
        <el-row class="title">
            <el-col :span="12">
                <h6>基本信息</h6>
            </el-col>
        </el-row>
        <el-row v-for="(list,key) in detailsList.baseInfo" :key="key">
            <el-col class="label" :span="3">{{ list.label }} :</el-col>
            <el-col class="name" :span="9">{{ list.prop }}</el-col>
        </el-row>
        <el-row class="config" v-if="isConfig">
            <el-col :span="12">
                <el-tabs v-model="activeName2" type="border-card">
                    <el-tab-pane label="配置" name="first">
                        <el-row v-for="(list,key) in detailsList.config" :key="key">
                            <el-col class="label" :span="6">{{ list.label }} :</el-col>
                            <el-col class="name" :span="18">{{ list.prop }}</el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="网络" name="second">
                        <el-row v-for="(list,key) in detailsList.network" :key="key">
                            <el-col class="label" :span="6">{{ list.label }} :</el-col>
                            <el-col class="name" :span="18">{{ list.prop }}</el-col>
                        </el-row>
                    </el-tab-pane>
                    <el-tab-pane label="云硬盘" name="third">
                        <!--<el-row v-for="(list,key) in detailsList.disk" :key="key">-->
                            <!--<el-col class="label" :span="6">{{ list.label }} :</el-col>-->
                            <!--<el-col class="name" :span="18">{{ list.prop }}</el-col>-->
                        <!--</el-row>-->
                        <el-table
                                :data="detailsList.disks"
                                style="width: 100%">
                            <el-table-column
                                    prop="name"
                                    label="云硬盘">
                            </el-table-column>
                            <el-table-column
                                    prop="mountPoint"
                                    label="挂载点">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>

</template>

<script>
export default {
    name: 'resourceDetails',
    data() {
        return {
            activeName2: 'first',
        }
    },
    props: {
        detailsList: {
            defalut: () => {},
            type: Object
        },
        isConfig: {
            defalut: false,
            type: Boolean
        }
    }
}
</script>

<style lang="scss" scoped>
@mixin font-style($justify) {
    font-size: 12px;
    color: #666666;
    padding-right: 30px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: $justify;
}
.resource-details {
    flex: 1;
    background: #fff;
    .title {
        padding: 20px 20px 10px 20px;
        h6 {
            font-size: 14px;
            border-left: 4px solid #2090ff;
            padding-left: 10px;
            margin-top: 7px;
            margin-bottom: 8px;
        }
    }
    .label {
        @include font-style(flex-end);
    }
    .name {
        @include font-style(flex-start);
    }
    .config {
        padding: 20px 20px 10px 20px;
        font-size: 12px;
    }
}
</style>
<style>
.el-tabs__item {
    height: 30px;
    line-height: 30px;
    padding: 0 25px;
    font-size: 12px;
}
</style>
