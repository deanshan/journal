<template>
<!--
    center: {lng, lat} 经纬度
    zoom: 缩放等级
    scroll-whell-zoom: 是否开启滚轮缩放，默认false不开启

    anchor: 控件显示的位置
-->
    <baidu-map
        id="maps"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="ready"
    >
        <!-- 控件 -->
        <bm-scale anchor="BMAP_ANCHOR_BOTTOM_LEFT" :offset="{width: 20, height: 60}"></bm-scale>    <!-- 比例尺控件 -->
        <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT" :offset="{width: 10, height: 10}"></bm-navigation>  <!-- 缩放控件 -->
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>   <!-- 地图类型控件 -->
        <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map>    <!-- 缩略图控件 -->
        <bm-panorama :offset="{width: 10, height: 40}"></bm-panorama>     <!-- 插入全景控件 -->
        <!-- 定位控件 -->
        <!-- <bm-geolocation
            anchor="BMAP_ANCHOR_TOP_LEFT"
            :showAddressBar="false"
            :autoLocation="true"
        ></bm-geolocation> -->
        <!-- 覆盖物 -->
        <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
            <bm-label content="" :labelStyle="{color: 'red', fontSize : '24px'}" :offset="{width: -35, height: 30}"/>
        </bm-marker>
    </baidu-map>
</template>

<script>

export default {
    name: 'maps',
    data() {
        return {
            center: {lng: 0, lat: 0},
            zoom: 15
        }
    },
    mounted() {
    },
    methods: {
        ready({BMap, map}) {
            var geolocation = new BMap.Geolocation();
            // 开启SDK辅助定位
            geolocation.enableSDKLocation();
            geolocation.getCurrentPosition(function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    map.panTo(r.point);
                    alert('您的位置：'+r.point.lng+','+r.point.lat);
                }
                else {
                    alert('failed'+this.getStatus());
                }
            });

            // let geolocation = new BMap.Geolocation()
            // geolocation.getCurrentPosition(r => {
            //     console.log(this, r)
            //     this.center = {lng: r.longitude, lat: r.latitude}
            // }, {enableHighAccuracy: true})
        }
    }
}
</script>

<style lang="scss" scoped>
#maps {
    width: 100%;
    height: 550px;
}
</style>
