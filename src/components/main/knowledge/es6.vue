<template>
    <div ref="div"></div>
</template>

<script>

export default {
    data() {
        return {
            baseUrl: process.env.BASE_URL,
            data: ''
        }
    },
    mounted() {
        fetch(`${this.baseUrl}note/es6/es6.md`)
            .then(response => response.text())
            .then(data => {
                // this.$refs.div.innerHTML = this.$marked(data)
                this.$refs.div.innerHTML = data
            })
    }
}
</script>
