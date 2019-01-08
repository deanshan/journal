<template>
    <!-- <mavon-editor v-html="text" @navigationToggle="navigationToggle"/> -->
    <div id="knowledge">
        <mavon-editor
            v-html="text"
            :subfield="false"
            defaultOpen="preview"
            :navigation="true"
        />
    </div>

</template>

<script>
export default {
    data() {
        return {
            baseUrl: process.env.BASE_URL,
            text: '',
           value: ""
        }
    },
    mounted() {
        fetch(`${this.baseUrl}note/es6.md`)
            .then(response => response.text())
            .then(data => {
                this.text = this.$marked(data.toString())
            })
        fetch('http://10.2.102.134:3100')
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
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

