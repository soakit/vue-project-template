<template>
    <div id="app" :class="{'notIOS': !config.isIOS}">
        <router-view v-if="staffInfo" />
        <Loading v-model="isShowLoading" text="加载中" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { Loading } from 'vux'
import Vue from 'vue'
export default {
    name: 'App',
    components: {
        Loading
    },
    props: ['isShowLoading'],
    mounted() {
        this.changeTitle()
    },
    watch: {
        $route: function () {
            this.changeTitle()
        }
    },
    computed: {
        ...mapState(['staffInfo']),
        config() {
            return window.config
        }
    },
    methods: {
        changeTitle() {
            const { name, meta } = this.$route
            if (name !== '个性相册' && name !== '相册操作' && name !== '面评情况') {
                Vue.filter('changeTitle')(meta.pageTitle || name)
            }
        }
    }
}
</script>

<style lang='less'>
@import '~@/assets/less/all.less';
</style>
