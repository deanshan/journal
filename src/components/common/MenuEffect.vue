<template>
    <div id="menu-effect" @mousemove="effect($event)" ref="effect">
        <!-- 图标 -->
        <slot name="icon"></slot>

        <a
            :class="[isEffect ? 'link link-flip' : '']"
            :style="setStyle"
        >
            <span v-if="isEffect === false">{{ title }}</span>
            <span v-else-if="isEffect === true" v-for="(str, k) in title.split('')" :key="k">{{ str }}</span>
        </a>

    </div>
</template>

<script>
export default {
    name: 'menuEffect',
    props: {
        setStyle: {
            default: () => {},  //  参数类型为Array/Object必须使用函数返回默认值，否则报错
            type: Object
        },
        title: {
            default: '',
            type: String
        },
        padding_left: {
            default: '',
            type: String
        },
        isEffect: {
            default: false,
            type: Boolean
        }
    },
    mounted() {
    },
    methods: {
        effect(e) {
            this.$refs.effect.style.setProperty('--x', `${e.offsetX}px`);
            this.$refs.effect.style.setProperty('--y', `${e.offsetY}px`);
        }
    }
}
</script>

<style lang="scss" scoped>
#menu-effect {
    width: 100%;
    overflow: hidden;
    transition: all .2s ease;
    position: relative;
    z-index: 101;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
        background: #07417a;
        a,i {
            color: gold;
        }
    }
    &:before {
        --opacity: 0;
        --scale: 0;
        --size: 200px;
        -webkit-transform: scale(var(--scale));
        background: radial-gradient(circle closest-side,#26c6f0,transparent);
        content: "";
        height: var(--size);
        left: calc(var(--x) - var(--size) / 2);
        opacity: var(--opacity);
        position: absolute;
        top: calc(var(--y) - var(--size) / 2);
        z-index: -1;
        transform: scale(var(--scale));
        transition: transform .8s cubic-bezier(.22,1,.32,1),opacity .8s cubic-bezier(.22,1,.32,1);
        width: var(--size);
    }
    &:hover:before {
        --opacity: 1;
        --scale: 1;
    }
    a,i {
      position: relative;
      color: #83c7e3;
      padding-left: 22px;
    }
    a {
        width: 100%;
    }
}
</style>
