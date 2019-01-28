<template>
    <div id="j-main">

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'jmain',
    data() {
        return {

        }
    }
}
</script>

<style lang="scss" scoped>
#j-main {
    flex: auto;
    overflow-y: scroll;
    padding: 20px 50px;
}
</style>
