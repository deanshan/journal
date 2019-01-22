<template>
    <div id="header">

        <nav>
            <a
                href="#"
                class="link link-flip"
                v-for="(item, key) in nav"
                :key="key"
            >
              <span v-for="(str, k) in item.split('')" :key="k">{{ str }}</span>
          </a>
        </nav>
    </div>
</template>

<script>

export default {
    name: "jheader",
    data() {
      return {
        nav: ['home', 'video', 'protfolio', 'skills', 'map', 'contact']
      }
    },
    computed: {
    }
};
</script>

<style lang="scss" scoped>
#header {
    padding: 0 30px;
    background: #000;
    height: 60px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    nav {
        a + a {
            margin-left: 20px;
        }
    }
}
</style>

