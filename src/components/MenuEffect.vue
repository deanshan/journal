<template>
    <div id="menu-effect" @mousemove="effect($event)" ref="effect">
        <i class="iconfont" :class="iconClass" :style="styleObj"></i>
        <div class="title link link-flip"><span>{{ title }}</span></div>
    </div>
</template>

<script>
export default {
    name: 'menuEffect',
    props: {
        iconClass: {
            type: String,
            default: '',
        },
        styleObj: {
            type: Object,
            default: () => {
                return {
                    'padding-left': '30px'
                }
            }
        },
        title: {
            type: String,
            default: '',
        }
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
    height: 50px;
    overflow: hidden;
    transition: all .2s ease;
    position: relative;
    z-index: 101;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:hover {
        background: #07417a;
        span,i {
            color: greenyellow;
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
    .title {
        width: 100%;
        position: relative;
    }
    span,i {
      position: relative;
      color: #fff;
    }
    span {
        margin-left: 10px;
    }
    i {
        font-size: 20px;
    }
}
</style>
