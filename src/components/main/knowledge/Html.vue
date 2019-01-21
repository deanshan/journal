<template>
    <!-- <mavon-editor v-html="text" @navigationToggle="navigationToggle"/> -->
    <div id="html">
        <div class="api" v-html="api"></div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            api: ''
        }
    },
    mounted() {
        fetch('http://192.168.1.106:3100/')
            .then(response => response.text())
            .then(data => {
                data = JSON.parse(data)
                this.api = data[2].content
            })
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
#html {
    flex: auto;
    overflow-y: scroll;
}
</style>

