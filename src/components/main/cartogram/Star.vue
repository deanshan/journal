<template>
    <div id="star-chart">

        <NavTitle :titles="['星空图']"></NavTitle>

        <div class="views">
            <div id="star-view" ></div>
        </div>
    </div>
</template>

<script>

import NavTitle from '@/components/common/NavTitle'

import { EleResize } from '@/utils/resize.js'

export default {
    name: "star",
    data() {
        return {
            cityList: [],
            cityData: [],
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
        this.getCityData()
    },
    methods: {
        // 获取所有城市列表
        getCityList() {
            return new Promise(resolve => {
                this.$https
                    .get('/server/view/star/citylist')
                    .then(res => {  //[]

                        for(let item of Object.values(res)) {

                            this.cityList.push({
                                cityId: item.id,
                                name: item.city_name
                            })
                        }
                        resolve()
                    })

            }).catch(error => {

                this.$message('请求数据异常')

                Promise.reject(error)

            })
        },
        // 获取每个城市对应的数据
        async getCityData() {
            let schemaData = [
                { name: 'distance', index: 1, text: '距离' },
                { name: 'speed', index: 2, text: '速度' },
                { name: 'time', index: 3, text: '时间'},
                { name: 'destination', index: 0, text: '城市名称' },
            ]

            let legendData = []
            let seriesData = []

            await this.getCityList()

            for(let item of Object.values(this.cityList)) {
                await this.$https
                        .get('/server/view/star/citydata', { cityId: item.cityId })
                        .then(res => {
                            let data = []
                            for(let value of Object.values(res)) {
                                data.push([
                                    value.distance,
                                    value.speed,
                                    value.city_name
                                ])
                            }
                            this.cityData.push({
                                name: item.name,
                                data
                            })

                            for(let item of Object.values(this.cityData)) {
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
                        let value = obj.value

                        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                            + obj.seriesName + '——' + value[value.length - 1]
                            + '</div>'
                            + schemaData[0].text + '：' + value[0] + 'km<br>'
                            + schemaData[1].text + '：' + value[1] + 'km/h<br>'
                            + schemaData[2].text + '：' + (value[0] / value[1]).toFixed(1) + 'h'
                    }
                },
                xAxis: {
                    type: 'value',
                    name: '距离(km)',
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
                    name: '速度(km/h)',
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
                        dimension: 0,   //  维度：对应数组的下标
                        min: 0,
                        max: 2000,
                        itemWidth: 30,
                        itemHeight: 120,
                        calculable: true,
                        precision: 0.1,
                        text: ['距离(km)'],
                        textGap: 20,
                        textStyle: {
                            color: '#000'
                        },
                        inRange: {
                            symbolSize: [10, 80]
                        },
                        outOfRange: {
                            symbolSize: [10, 80],
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
                        dimension: 1,   //  维度：对应数组的下标
                        min: 0,
                        max: 400,
                        itemHeight: 120,
                        calculable: true,
                        precision: 0.1,
                        text: ['速度(km/h)'],
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