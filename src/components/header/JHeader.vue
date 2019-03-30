<template>
    <div id="header">
        <div class="title">
            <a class="link link-journal" href="javascript:void(0)" data-letters="Journal">Journal</a>
        </div>
        <div class="r-header">

            <a @click="logout">退出</a>
        </div>
    </div>
</template>

<script>

import { mapMutations } from 'vuex'

export default {
    name: "jheader",
    data() {
        return {
        }
    },
    methods: {
        ...mapMutations(['SET_TOKEN']),
        logout() {
            this.SET_TOKEN({token: ''})
            sessionStorage.clear()
            this.$router.push({ path: '/login' })
        }
    }
};
</script>

<style lang="scss" scoped>
#header {
    background: rgb(240, 188, 180);
    height: 60px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    .title {
        background: #8b5c7e;
        width: 240px;
        height: 100%;
        text-align: center;
        line-height: 60px;
        position: relative;
    }
    .r-header{
        flex: auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
}
</style>

