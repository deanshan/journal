<template>
    <div id="menu-effect" @mousemove="effect($event)" ref="effect">
        <i :class="iconclass"></i>
        <span slot="title" :style="{'padding-left': padding_left}">{{ title }}</span>
    </div>
</template>

<script>
export default {
    name: 'menuEffect',
    props: {
        iconclass: {
            default: '',
            type: String
        },
        title: {
            default: '',
            type: String
        },
        padding_left: {
            default: '',
            type: String
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
    &:hover {
        background: #07417a;
        span,i {
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
    span,i {
      position: relative;
      color: #83c7e3;
      margin-left: 20px;
    }
}
</style>
