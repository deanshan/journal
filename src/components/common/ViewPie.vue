<template>
    <div :style="{width:'100%',height:'150px'}" :unit="unit" ref="pieChart"></div>
</template>

<script>
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入树图组件
    require('echarts/lib/chart/pie')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    export default {
        name: "viewPie",
        props:{
            chartsId:{
                type:String
            },
            pieData:{
                default:() => [],
                type:Array
            },
            unit:{
                default:() => 'GB',
                type:String
            }
        },
        data() {
            return {}
        },
        computed:{
            pieOption(){
                return {
                    title:{
                        text:'占用率',
                        bottom:'30%',
                        left:'32%',
                        textStyle:{
                            color:'#FFFFFF',
                            fontSize:12,
                            fontWeight:'normal'
                        }
                    },
                    series: [
                        {
                            name:'占用率',
                            type:'pie',
                            radius: ['65%', '80%'],
                            center:['50%','50%'],
                            silent:true,
                            label: {
                                normal: {
                                    show: false,
                                    formatter: "{d}%",
                                    position: 'center',
                                    textStyle: {
                                        fontSize: '14',
                                        fontWeight: 'normal',
                                        color:'#FFFFFF'
                                    }
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                        fontWeight: 'normal',
                                        color:'#FFFFFF'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            color:['#FF9900','#FFFFFF'],
                            data:this.pieData,
                            // animationDuration:3000,
                            // animationDurationUpdate:3000
                        }
                    ]
                }
            }
        },
        mounted() {
            this.initPie()
        },
        watch:{
            pieData() {
                this.$nextTick(() => {
                    if (this.pieData) {
                        this.initPie()
                    }
                })
            }
        },
        methods:{
            initPie(){
                let domId = this.$refs.pieChart
                let myCharts = echarts.init(domId)
                myCharts.setOption(this.pieOption)
                // var dataIndex = 0;
                // myCharts.on('mousemove', function (params) {
                //     // 取消之前高亮的图形
                //     myCharts.dispatchAction({
                //         type: 'downplay',
                //         seriesIndex: 0,
                //         dataIndex: dataIndex,
                //     });
                //     dataIndex = params.dataIndex;
                //     // 高亮当前图形
                //     myCharts.dispatchAction({
                //         type: 'highlight',
                //         seriesIndex: 0,
                //         dataIndex: dataIndex
                //     });
                // });
                // myCharts.on('mouseout', function (params) {
                //     myCharts.dispatchAction({
                //         type: 'downplay',
                //         seriesIndex: 0,
                //         dataIndex: 1,
                //     });
                //     // 高亮当前图形
                //     myCharts.dispatchAction({
                //         type: 'highlight',
                //         seriesIndex: 0,
                //         dataIndex: 0
                //     });
                //     dataIndex = 0;
                // });
                // myCharts.dispatchAction({
                //     type: 'highlight',
                //     seriesIndex:0,
                //     dataIndex: 0
                // });
            }
        }
    }
</script>

<style scoped>

</style>