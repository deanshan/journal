<template>
    <div id="home" @click.stop="changeStatus">
        <!-- 头部 -->
        <j-header></j-header>
        <section class="section">
            <!-- 左侧导航 -->
            <j-sidebar></j-sidebar>
            <!-- 主体 -->
            <j-main></j-main>
        </section>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import JHeader from "@/components/header/JHeader.vue"
import Sidebar from "@/components/aside/Sidebar.vue"
import JMain from "@/components/main/JMain.vue"

export default {
    name: "home",
    data() {
        return {
        }
    },
    components: {
        'j-header': JHeader,
        'j-sidebar': Sidebar,
        'j-main': JMain
    },
    computed: {
        ...mapState({
            search_status: state => state.search_status,
            user_list_status: state => state.user_list_status
        })
    },
    methods: {
        ...mapMutations(["SEARCH_STATUS", "USER_LIST_STATUS"]),
        changeStatus() {
            this.SEARCH_STATUS({ search_status: false }),
            this.USER_LIST_STATUS({ user_list_status: false })
        }
    }
};
</script>

<style lang="scss" scoped>
#home {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    section.section {
        flex: auto;
        display: flex;
    }
}
</style>

