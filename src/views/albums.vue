<template>
    <div class="my-swiper__wrap" :class="{'otherEmpty': otherEmpty}">
        <div class="swiper-container-wrap">
            <swiper v-if="imgList.length > 0 && !$root.isShowLoading" :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="(item, index) in imgList" :key="index">
                    <img :src="albumPrefix + item.ImageUrl" />
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <a href="javascript:;" class="btn-edit" v-if="isSelf" @click="goEdit">
            编辑
        </a>
        <a href="javascript:;" class="btn-view" v-else-if="otherNotEmpty" @click="goMySelf">
            查看我的相册
        </a>
        <div class="wrap" v-else-if="otherEmpty && !$root.isShowLoading">
            <div class="no-avatar"></div>
            TA还没有上传照片哦~
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import LogMixin from '../mixins/log-mixin.js'
import _ from 'lodash'
import Vue from 'vue'
Vue.use(window.VueAwesomeSwiper)
export default {
    mixins: [LogMixin],
    data() {
        return {
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination'
                }
            }
        }
    },
    computed: {
        ...mapState(['staffInfo', 'imgList']),
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        StaffID() {
            return this.$route.params.uid
        },
        albumPrefix() {
            return config.albumPrefix
        },
        isSelf() {
            const a = _.padStart(this.staffInfo.StaffID, 8, '0')
            const b = _.padStart(this.StaffID, 8, '0')
            return a === b
        },
        otherNotEmpty() {
            return this.imgList.length > 0 && !this.isSelf
        },
        otherEmpty() {
            return this.imgList.length === 0 && !this.isSelf
        }
    },
    mounted() {
        this.getData()
    },
    watch: {
        StaffID() {
            this.getData()
        }
    },
    methods: {
        ...mapActions(['getUserImageList']),
        ...mapMutations(['GET_USER_IMAGE_LIST']),
        async getData() {
            this.GET_USER_IMAGE_LIST([])
            await this.getUserImageList({
                StaffId: this.StaffID
            })
            // 无头像且是自身时才去[相册操作]
            if (!this.imgList.length) {
                if (this.isSelf) {
                    this.$router.replace({
                        name: '相册操作',
                        params: {
                            uid: this.StaffID
                        }
                    })
                } else {
                    Vue.filter('changeTitle')('个性相册')
                }
            } else {
                Vue.filter('changeTitle')(`个性相册（${this.imgList.length}）张`)
            }
        },
        goEdit() {
            this.saveOperatelLog({
                ModelName: '个性相册',
                ItemName: '编辑',
                DetailInfo: '',
                OperateType: '点击'
            })
            this.$router.push({
                name: '相册操作',
                params: {
                    uid: this.StaffID
                }
            })
        },
        goMySelf() {
            this.saveOperatelLog({
                ModelName: '个性相册',
                ItemName: '我的相册',
                DetailInfo: '',
                OperateType: '点击'
            })
            // 去登录人自己的相册
            this.$router.push({
                name: '个性相册',
                params: {
                    uid: this.staffInfo.StaffID
                }
            })
        }
    }
}
</script>
<style lang="less">
.my-swiper__wrap {
	height: 100%;
	padding: 0.66rem 0.24rem 0;
	background: #000;
	&.otherEmpty {
		background: #fff;
		padding: 0;
		padding-top: 2.96rem;
	}
	.wrap {
		font-size: 0.34rem;
		color: #7c7c7c;
		text-align: center;
		.no-avatar {
			background: url(../assets/image/noAvatar.png) center no-repeat;
			width: 3.24rem;
			height: 3.05rem;
			background-size: 3.24rem;
			margin: 0 auto 0.5rem;
		}
    }
    .btn-edit, .btn-view {
        float: right;
        justify-content: flex-end;
        align-items: center;
        display: flex;
        color: #fff;
    }
    .btn-edit {
        height: 0.5rem;
        width: 1rem;
    }
    .btn-view {
        height: 0.5rem;
        width: 2.2rem;
    }
}
.swiper-container-wrap {
	height: 10rem;
	.swiper-container {
		height: 100%;
		.swiper-slide {
			height: 9.36rem;
			display: flex;
			justify-content: center;
			align-items: center;
			img {
				max-width: 100%;
				max-height: 100%;
			}
		}
		.swiper-pagination-bullets {
			bottom: 4px;
		}
		.swiper-pagination-bullet {
			background: #fff;
			opacity: 1;
			&.swiper-pagination-bullet-active {
				background: #4283fe;
			}
		}
	}
}
</style>
