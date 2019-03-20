<template>
    <div id="star-chart">
        <!-- 导向 -->
        <NavTitle :titles="['运维中心', '视图管理', '虚拟机星空图']"></NavTitle>
        <!-- 主体 -->
        <div class="views">
            <div id="star-view" ></div>
        </div>
    </div>
</template>

<script>

import NavTitle from '@/components/common/NavTitle'

import { EleResize } from '@/utils/resize.js'

export default {
    name: "starChart",
    data() {
        return {
            resourcePoolList: [],
            virtualMachineData: [],
        }
    },
    components:{
        NavTitle
    },
    computed: {
        operationUrl() {
            return sessionStorage.getItem('cmp-operation')
        }
    },
    mounted() {
        this.getVirtualMachineData()
    },
    methods: {
        getResourcePoolList() {
            return new Promise(resolve => {
                this.$https
                    .get('/view/star')
                    .then(res => {
                        console.log(JSON.stringify(res))
                        if(res.length !== 0) {
                            for(let item of Object.values(res)) {
                                this.resourcePoolList.push({
                                    name: item.name,
                                    resourcePoolId: item.resourcePoolId
                                })
                            }
                            resolve()
                        }
                    })
            }).catch(error => {
                this.$message('请求数据异常')
            })
        },
        async getVirtualMachineData() {
            let schemaData = [
                { name: 'cpu', index: 1, text: 'cpu利用率' },
                { name: 'memory', index: 2, text: '内存利用率' },
                { name: 'name', index: 0, text: '虚拟机名称' },
            ]

            let legendData = []
            let seriesData = []

            await this.getResourcePoolList()

            for(let item of Object.values(this.resourcePoolList)) {
                await this.$https
                        .get(`${this.operationUrl}/vHost/graph`, { resourcePoolId: item.resourcePoolId })
                        .then(res => {
                            let data = []
                            for(let item of Object.values(res)) {
                                data.push([
                                    parseInt(item.cpu * 100),
                                    parseInt(item.memory * 100),
                                    item.hostName
                                ])
                            }
                            this.virtualMachineData.push({
                                name: item.name,
                                data
                            })

                            for(let item of Object.values(this.virtualMachineData)) {
                                legendData.push(item.name)
                                seriesData.push({
                                    name: item.name,
                                    type: 'scatter',
                                    itemStyle: {
                                        normal: {
                                            opacity: 0.8,
                                            shadowBlur: 10,
                                            shadowOffsetX: 0,
                                            shadowOffsetY: 0,
                                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                                        }
                                    },
                                    data: item.data
                                })
                            }

                            this.initVirtualMachine({
                                legendData, schemaData, seriesData
                            })
                        })
            }
        },
        initVirtualMachine({ legendData, schemaData, seriesData }) {
            let virtualMachine = document.getElementById("star-view")
            let myChart = this.$echarts.init(virtualMachine, 'macarons')

            let option = {
                 backgroundColor: new this.$echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
                    offset: 0,
                    color: '#f7f8fa'
                }, {
                    offset: 1,
                    color: '#cdd0d5'
                }]),
                legend: {
                    type: 'scroll',
                    left: '6%',
                    right: '8%',
                    top: 8,
                    orient:'horizontal',
                    padding: 20,
                    itemGap: 50,
                    itemWidth: 12,
                    formatter: name => {
                        return this.$echarts.format.truncateText(name, 80, '12px Microsoft Yahei', '…');
                    },
                    textStyle: {
                        color: '#000',
                        fontSize: 14
                    },
                    pageIconColor: 'red',
                    pageIconInactiveColor: 'green',
                    data: legendData
                },
                grid: {
                    top: 100,
                    left: 50,
                    bottom: 30,
                    right: '15%'
                },
                tooltip: {
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: function (obj) {
                        let value = obj.value;
                        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                            + obj.seriesName + '：' + value[value.length - 1]
                            + '</div>'
                            + schemaData[0].text + '：' + value[0] + '%<br>'
                            + schemaData[1].text + '：' + value[1] + '%<br>'
                    }
                },
                xAxis: {
                    type: 'value',
                    name: 'CPU利用率(%)',
                    min: 0,
                    max: 100,
                    nameGap: 16,
                    nameTextStyle: {
                        color: '#000',
                        fontSize: 12
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#000'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '内存利用率(%)',
                    min: 0,
                    max: 100,
                    nameLocation: 'end',
                    nameGap: 20,
                    nameTextStyle: {
                        color: '#000',
                        fontSize: 12
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#000'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                visualMap: [
                    {
                        top: '18%',
                        right: 20,
                        dimension: 0,
                        min: 0,
                        max: 100,
                        itemWidth: 30,
                        itemHeight: 120,
                        calculable: true,
                        precision: 0.1,
                        text: ['cpu利用率'],
                        textGap: 20,
                        textStyle: {
                            color: '#000'
                        },
                        inRange: {
                            symbolSize: [10, 50]
                        },
                        outOfRange: {
                            symbolSize: [10, 50],
                            color: ['rgba(255,255,255,.2)']
                        },
                        controller: {
                            inRange: {
                                color: ['#c23531']
                            },
                            outOfRange: {
                                color: ['#444']
                            }
                        }
                    },
                    {
                        right: 20,
                        bottom: '10%',
                        dimension: 1,
                        min: 0,
                        max: 100,
                        itemHeight: 120,
                        calculable: true,
                        precision: 0.1,
                        text: ['内存利用率'],
                        textGap: 20,
                        textStyle: {
                            color: '#000'
                        },
                        inRange: {
                            colorLightness: [1, 0.5]
                        },
                        outOfRange: {
                            color: ['rgba(255,255,255,.2)']
                        },
                        controller: {
                            inRange: {
                                color: ['#c23531']
                            },
                            outOfRange: {
                                color: ['#444']
                            }
                        }
                    }
                ],
                series: seriesData
            };

            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }
            EleResize.on(document.querySelector('.views'), () => {
                myChart.resize()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#star-chart {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    .views {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        background: rgb(243,243,243);
        flex: 1;
        #star-view {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 600px;
            margin-bottom: 20px;
        }
    }
}
</style>