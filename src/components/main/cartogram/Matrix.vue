<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心', '视图管理', 'IP池矩阵图']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <div class="select-data">
                <el-tabs v-model="ipAddressSegmentValue" @tab-click="changeIpSegment">
                    <el-tab-pane
                        v-for="(value, index) in ipAddressSegmentData"
                        :key="index"
                        :label="value.label"
                        :name="value.value"
                    ></el-tab-pane>
                </el-tabs>
            </div>
            <div id="ip-pool" ></div>
        </div>
    </div>
</template>

<script>

import NavTitle from '@/components/common/NavTitle'

import { EleResize } from '@/utils/resize.js'

export default {
    name: "",
    data() {
        return {
            networkSegment: [],
            networkSegmentValue: '',
            ipAddressSegmentData: [],
            ipAddressSegmentValue: '',
            ipSegmentIdList: {},
            scatterData: {
                xAxis: [],
                yAxis: [],
                unallocated: [],
                allocated: [],
            }
        }
    },
    components: {
        NavTitle
    },
    computed: {
        operationUrl() {
            return sessionStorage.getItem('cmp-operation')
        }
    },
    mounted() {
        this.initScatterData()
    },
    methods: {
        getNetworkSegment() {
            return new Promise(resolve => {
                this.$axios
                    .get('/view/matrix', {params:{ centuryId: '123'}})
                    .then(res => {
                        console.log(res)
                        for(let item of Object.values(res)) {
                            this.networkSegment.push({
                                value: item.ipAddressSegmentId,
                                label: `${item.name}(${item.segment})`
                            })
                        }
                        resolve()
                    })
            })
        },
        async getIpSegmentId() {
            for(let item of Object.values(this.networkSegment)) {
                await this.$https
                    .get(`${this.operationUrl}/ipPool/listIpSegments`, {parentId: item.value})
                    .then(res => {
                        if(res.length !== 0) {
                            for(let item of Object.values(res)) {
                                this.ipAddressSegmentData.push({
                                    value: item.ipAddressSegmentId,
                                    label: item.name
                                })
                            }
                        } else {
                            this.ipAddressSegmentData = []
                            this.ipAddressSegmentValue = ''
                            this.ipSegmentIdList = {}
                            for(let key in this.scatterData) {
                                this.scatterData[key] = []
                            }
                        }
                    })
            }
        },
        async getIpSegmentIdList(ipSegmentId) {
            return new Promise(resolve => {
                this.$https
                    .get(`${this.operationUrl}/ipPool/listIpAddressByIpSegmentId`, {ipSegmentId})
                    .then(res => {
                        if(Object.keys(res).length !== 0) {
                            this.ipSegmentIdList = res
                        } else {
                            this.ipSegmentIdList = {}
                            for(let key in this.scatterData) {
                                this.scatterData[key] = []
                            }
                        }
                        resolve()
                    })
            })
        },
        async getScatterData() {
            let data = []

            for(let key in Object.keys(this.ipSegmentIdList)) {
                if(key == 0) {
                    let number = this.ipSegmentIdList[Object.keys(this.ipSegmentIdList)[key]].length
                    for(let i = 0; i < number; i++) {
                        this.scatterData.xAxis.push('')
                    }
                }
            }
            for(let key in Object.keys(this.ipSegmentIdList)) {
                this.scatterData.yAxis.push(Object.keys(this.ipSegmentIdList)[key])
                for(let index of Object.keys(this.scatterData.xAxis)) {
                    data.push([key, index, this.ipSegmentIdList[Object.keys(this.ipSegmentIdList)[key]][index]])
                }
            }

            for(let item of Object.values(data)) {
                if(item[2] !== undefined) {
                    if(item[2]['status'] == 1) {
                        this.scatterData.unallocated.push(item)
                    }
                    if(item[2]['status'] == 2) {
                        this.scatterData.allocated.push(item)
                    }
                }
            }
            this.scatterData.unallocated = this.scatterData.unallocated.map(item => {
                return [Number(item[1]), Number(item[0]), item[2]]
            })
            this.scatterData.allocated = this.scatterData.allocated.map(item => {
                return [Number(item[1]), Number(item[0]), item[2]]
            })

            this.initScatter(this.scatterData)

        },
        async initScatterData() {
            try {
                await this.getNetworkSegment()
                await this.getIpSegmentId()
                await this.getIpSegmentIdList(this.ipAddressSegmentData[0]['value'])

                this.ipAddressSegmentValue = this.ipAddressSegmentData[0]['value']

                this.getScatterData()
            } catch(error) {
                Promise.reject(error)
            }
        },
        async changeIpSegment(data) {
            try {
                await this.getIpSegmentIdList(data.name)
                this.getScatterData()
            } catch(error) {
                this.initScatter({})
            }
        },
        initScatter(data) {
            let ipPool = document.getElementById("ip-pool");
            let myChart = this.$echarts.init(ipPool);

            let option = {
                title: {
                    text: 'IP池矩阵图',
                    padding: 20,
                    textStyle: {
                        color: '#ccc',
                        textBorderColor: '#fff',
                        textBorderWidth: 1,
                        textShadowColor: '#000',
                        textShadowBlur: 0,
                        textShadowOffsetX: 1,
                        textShadowOffsetY: 1
                    }
                },
                legend: {
                    data: ['未分配','已分配'],
                    top: 10,
                    right: 30
                },
                tooltip: {
                    position: 'top',
                    formatter: function (params) {
                        return `<div>${params.value[2]['ipAddress']}</br>${params.seriesName}</div>`
                    }
                },
                grid: {
                    left: 5,
                    bottom: 20,
                    right: 20,
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: data.xAxis,
                    boundaryGap: false,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#999',
                            type: 'dashed'
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    data: data.yAxis,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        margin: 20
                    },
                    axisTick: {
                        show: false
                    }
                },
                series: [{
                    type: 'scatter',
                    name: '未分配',
                    symbolSize: 20,
                    data: data.unallocated,
                    animationDelay: function (idx) {
                        return idx * 5;
                    },
                    itemStyle: {
                        normal: {
                            color: '#5cb85c'
                        }
                    }
                },
                {
                    type: 'scatter',
                    name: '已分配',
                    symbolSize: 20,
                    data: data.allocated,
                    animationDelay: function (idx) {
                        return idx * 5;
                    },
                    itemStyle: {
                        normal: {
                            color: 'red'
                        }
                    }
                }]
            }
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
            EleResize.on(ipPool, () => {
                myChart.resize()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.operation-main-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    .main-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        .select-data {
            padding: 10px;
        }
        #ip-pool {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
    }
}
</style>