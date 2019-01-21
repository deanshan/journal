<template>
    <!-- <mavon-editor v-html="text" @navigationToggle="navigationToggle"/> -->
    <div id="knowledge">
        <!-- <mavon-editor v-html="text" :subfield="false" defaultOpen="preview" :navigation="true" /> -->
        es6
    </div>

</template>

<script>
export default {
    data() {
        return {
            text: ''
        }
    },
    mounted() {
        // fetch('http://10.2.102.166:3100/')
        //     .then(response => response.text())
        //     .then(data => {
        //         console.log(data)
        //         this.text = data.content
        //     })
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>
#knowledge {
    flex: auto;
    overflow-y: scroll;
}
</style>

