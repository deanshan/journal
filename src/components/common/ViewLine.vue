<template>
    <div :style="{width:'100%',height:'350px'}" ref="lineChart"></div>
</template>

<script>
    import { EleResize } from '@/utils/resize.js'
    // 引入基本模板
    let echarts = require('echarts/lib/echarts')
    // 引入树图组件
    require('echarts/lib/chart/bar')
    // 引入提示框和title组件
    require('echarts/lib/component/tooltip')
    require('echarts/theme/macarons')

    export default {
        name: "viewLine",
        props:{
            id:{
                type:String
            },
            lineData:{
                default:()=>[],
                type:Array
            }
        },
        data(){
            return {}
        },
        watch:{
            lineData() {
                this.$nextTick(() => {
                    if (this.lineData) {
                        this.initLine()
                    }
                })
            }
        },
        computed:{
            xData(){
                let xData = []
                for(let i in this.lineData){
                    xData.push(this.lineData[i].name)
                }
                return xData
            },
            lineOption(){
                return {
                    backgroundColor:'rgba(255,255,255)',
                    color:'#5ab1ef',
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter:'{b}: {c}'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : this.xData
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitArea : {
                                show : true,
                                areaStyle : {
                                    color: ['rgba(250,250,250,1)','rgba(200,200,200,0.2)']
                                }
                            },
                        }
                    ],
                    series : [
                        {
                            name:'监控详情',
                            type:'line',
                            lineWidth: '60%',
                            data: this.lineData
                        }
                    ]
                }
            }
        },
        mounted(){
            this.initLine()
        },
        methods:{
            initLine(){
                let domId = this.$refs.lineChart
                let myCharts = echarts.init(domId,'macarons')
                myCharts.setOption(this.lineOption,true)
                EleResize.on(domId, () => {
                    myCharts.resize()
                })
            }
        }
    }
</script>

<style scoped>

</style>