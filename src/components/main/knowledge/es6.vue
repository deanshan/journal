<template>
    <div>{{ data }}</div>
</template>

<script>
import md from '@/assets/es6.md'
export default {
    data() {
        return {
            baseUrl: process.env.BASE_URL,
            data: ''
        }
    },
    mounted() {
        console.log(md)
        console.log(this.$marked)
        this.data = this.$marked(`${this.baseUrl}note/es6/es6.md`)
    }
}
</script>
