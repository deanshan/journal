<template>
    <div class="operation-main-content">
        <!-- 导向 -->
        <NavTitle :titles="['矩阵图']"></NavTitle>
        <!-- 主体 -->
        <div class="main-content">
            <div class="select-data">
                <el-tabs v-model="ipAddressSegmentValue" @tab-click="changeIpSegment">
                    <el-tab-pane
                        v-for="(value, index) in yearList"
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
            centuryList: [],
            networkSegmentValue: '',
            yearList: [],
            ipAddressSegmentValue: '',
            dateList: {},
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
        // 获取世纪数据列表
        getCentury() {
            return new Promise(resolve => {
                this.$https
                    .get('/server/view/matrix/century')
                    .then(res => {
                        for(let item of Object.values(res)) {
                            this.centuryList.push({
                                value: item.id,
                                label: item.centuryName
                            })
                        }
                        resolve()
                    })
            })
        },
        // 获取年代列表
        async getYear() {
            for(let item of Object.values(this.centuryList)) {
                await this.$https
                    .get('/server/view/matrix/year', {centuryId: item.value})
                    .then(res => {
                        for(let value of Object.values(res)) {
                            this.yearList.push({
                                value: value.id,
                                label: value.yearName
                            })
                        }
                    })
            }
        },
        async getDate(yearId) {
            return new Promise(resolve => {
                this.$https
                    .get('/server/view/matrix/date', {yearId})
                    .then(res => {
                        if(Object.keys(res).length !== 0) {
                            this.dateList = res
                        } else {
                            this.dateList = {}
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

            for(let key in this.scatterData) {
                this.scatterData[key] = []
            }

            for(let key in Object.keys(this.dateList)) {
                if(key == 0) {
                    let number = this.dateList[Object.keys(this.dateList)[key]].length
                    for(let i = 0; i < number; i++) {
                        this.scatterData.xAxis.push('')
                    }
                }
            }
            for(let key in Object.keys(this.dateList)) {
                this.scatterData.yAxis.push(Object.keys(this.dateList)[key])
                for(let index of Object.keys(this.scatterData.xAxis)) {
                    data.push([key, index, this.dateList[Object.keys(this.dateList)[key]][index]])
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
                await this.getCentury()
                await this.getYear()
                await this.getDate(this.yearList[0]['value'])

                this.ipAddressSegmentValue = this.yearList[0]['value']

                this.getScatterData()
            } catch(error) {
                Promise.reject(error)
            }
        },
        async changeIpSegment(data) {
            try {
                await this.getDate(data.name)
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
                    text: '20世纪——21世纪',
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
                        return `<div>${params.value[2]['date']}</br>${params.seriesName}</div>`
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