<template>
    <div :style="{width:'100%',height:height}" ref="barChart"></div>
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
        name: "viewBar",
        props:{
            id:{
                type:String
            },
            barData:{
                default:()=>[],
                type:Array
            },
            height:{
                type:String,
                default:() => "300px"
            },
            bgColor:{
                type:String,
                default:() => '#FFFFFF'
            },
            color:{
                type:String,
                default:() => '#5ab1ef'
            },
            title:{
                type:String,
                default:() => ''
            },
            unit:{
                type:String,
                default:() => ''
            }
        },
        data() {
            return {}
        },
        watch:{
            barData() {
                this.$nextTick(() => {
                    if (this.barData) {
                        this.initBar()
                    }
                })
            }
        },
        computed:{
            xData(){
                let xData = []
                for(let i in this.barData){
                    xData.push(this.barData[i].name)
                }
                return xData
            },
            barOption(){
                return {
                    backgroundColor:this.bgColor,
                    color:this.color,
                    title:{
                      show:this.title == '' ? false : true,
                        text:this.title,
                        textStyle:{
                          fontSize:14
                        },
                        padding:10
                    },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter:`{a} <br/> {b}: {c} ${this.unit}`
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top:'12%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : this.xData,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel:{
                                formatter:function(params){
                                    let newParamsName = "";
                                    let providerNumber = 5;
                                    if( params.length <= providerNumber){
                                        newParamsName = params;
                                    }else if( providerNumber< params.length && params.length <= (2*providerNumber)){
                                        newParamsName = params.substr(0, providerNumber) + "\n" + params.substr(providerNumber,providerNumber);
                                    }else{
                                        newParamsName = params.substr(0, providerNumber) + "\n" + params.substr(providerNumber,providerNumber-1) + " ...";
                                    }
                                    return newParamsName;
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitArea : {
                                show : true,
                                areaStyle : {
                                    color: ['rgba(250,250,250,0.5)','rgba(200,200,200,0.2)']
                                }
                            },
                        }
                    ],
                    series : [
                        {
                            name:this.title,
                            type:'bar',
                            barWidth: '60%',
                            data: this.barData,
                            animationDuration: 3000,
                            animationDurationUpdate: 3000
                        }
                    ]
                }
            }
        },
        mounted(){
            this.initBar()
        },
        methods:{
            initBar(){
                let domId = this.$refs.barChart
                let myCharts = echarts.init(domId,'macarons')
                myCharts.setOption(this.barOption,true)
                EleResize.on(domId, () => {
                    myCharts.resize()
                })
            }
        }
    }
</script>

<style scoped>

</style>