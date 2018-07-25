<template>
    <div class="avatarOp-wrap" :class="{'empty': !imgList.length}">
        <template v-if="imgList.length === 0">
            <div class="no-avatar"></div>
            <p class="txt">个性相册暂无照片哦~ </p>
            <p class="txt">相册将面向全员开放，来展示个性的自己吧！</p>
            <vue-core-image-upload :class="['btn-upload']" :crop="false" :multiple="true" inputAccept="image/*" text="上传照片" @imageuploaded="imageuploaded" @errorhandle="errorhandle" :max-file-size="maxSize" @imageuploading="imageuploading" :url="uploadUrl">
            </vue-core-image-upload>
            <p class="tip">
                <span class="org">注：</span>最多上传5张照片!</p>
        </template>
        <template v-else>
            <ul>
                <li v-for="(item, index) in imgList" :key="index">
                    <span class="icon-wrap">
                        <i class="icon iconfont i-close" @click="onDelClick(item.ImageName)"></i>
                    </span>
                    <img v-lazy="albumPrefix + item.ImageUrl" />
                </li>
                <li v-if="imgList.length < 5">
                    <vue-core-image-upload :class="['add']" :crop="false" :multiple="true" inputAccept="image/*" text="" @imageuploaded="imageuploaded" @errorhandle="errorhandle" :max-file-size="maxSize" @imageuploading="imageuploading" :url="uploadUrl">
                    </vue-core-image-upload>
                </li>
            </ul>
            <div class="tip fixed">
                <span v-if="imgList.length < 5">
                    你还可以上传
                    <span class="remain-num">{{imgMaxNum - imgList.length}}</span> 张照片哦~<br>
                    相册将面向全员开放，来展示个性的自己吧！
                </span>
                <span v-else>
                    你的个性相册已经制作完成哦~
                </span>
            </div>
        </template>
    </div>
</template>
<script>
import VueCoreImageUpload from 'vue-core-image-upload'
import { mapActions, mapState } from 'vuex'
import Vue from 'vue'
import LogMixin from '../mixins/log-mixin.js'
import _ from 'lodash'
export default {
    mixins: [LogMixin],
    components: {
        VueCoreImageUpload
    },
    computed: {
        ...mapState(['staffInfo', 'imgList']),
        StaffID() {
            return this.$route.params.uid
        },
        isSelf() {
            const a = _.padStart(this.staffInfo.StaffID, 8, '0')
            const b = _.padStart(this.StaffID, 8, '0')
            return a === b
        },
        albumPrefix() {
            return config.albumPrefix
        },
        uploadUrl() {
            return config.host + config.WebApiPrefix + '/WebAPI/Upload/UploadImage'
        }
    },
    mounted() {
        this.imgList.length || this.getData()
    },
    data() {
        return {
            imgMaxNum: 5,
            maxSize: 5242880 * 2 // 10M
        }
    },
    methods: {
        ...mapActions(['deleteImage', 'getUserImageList']),
        async getData() {
            // 非自己不能编辑照片
            if (!this.isSelf) {
                this.$router.push({
                    name: '个性相册',
                    params: {
                        uid: this.$route.params.uid
                    }
                })
            }
            await this.getUserImageList({
                StaffId: this.StaffID
            })
            if (this.imgList.length) {
                Vue.filter('changeTitle')(`个性相册（${this.imgList.length}）张`)
            } else {
                Vue.filter('changeTitle')('个性相册')
            }
        },
        imageuploaded(res) {
            this.saveOperatelLog({
                ModelName: '个性相册',
                ItemName: '上传照片',
                DetailInfo: `${this.imgList.length}张`,
                OperateType: '点击'
            })
            if (res && res.result) {
                this.getData()
            } else {
                this.$root.isShowLoading = false
            }
        },
        errorhandle(info) {
            if (info.indexOf('FILE IS TOO LARGER') === 0) {
                Vue.filter('toast')('上传失败，请上传10M内的照片~')
            }
        },
        imageuploading() {
            this.$root.isShowLoading = true
        },
        onDelClick(imageName) {
            const self = this
            this.$vux.confirm.show({
                title: '提示',
                content: '确认删除该照片？',
                onConfirm() {
                    self.deleteImage({ imageName }).then(res => {
                        const toast = Vue.filter('toast')
                        self.saveOperatelLog({
                            ModelName: self.logTitle,
                            ItemName: '删除照片',
                            DetailInfo: '',
                            OperateType: '点击'
                        })
                        if (res && res.result) {
                            toast('删除成功!')
                            self.getData()
                        } else {
                            toast('删除失败!')
                        }
                    })
                }
            })
        }
    }
}
</script>

<style lang="less">
.avatarOp-wrap {
	&.empty {
		padding-top: 1.68rem;
	}
	.no-avatar {
		background: url(../assets/image/noAvatar.png) center no-repeat;
		width: 3.24rem;
		height: 3.05rem;
		background-size: 3.24rem;
		margin: 0 auto 0.52rem;
	}
	.txt {
		color: #7c7c7c;
		font-size: 0.34rem;
		line-height: 0.52rem;
		text-align: center;
	}
	.btn-upload {
		font-size: 0.32rem;
		color: rgb(255, 255, 255);
		text-align: center;
		background-color: rgb(40, 114, 255);
		box-shadow: 1.5px 2.598px 5px 0px rgba(40, 114, 255, 0.28);
		width: 3rem;
		height: 0.91rem;
		line-height: 0.91rem;
		border-radius: 0.455rem;
		display: block;
		margin: 1.32rem auto 0.32rem;
		&:before {
			content: '';
			background: url(../assets/image/add_white.png) center no-repeat;
			width: 0.32rem;
			height: 0.32rem;
			background-size: 0.32rem;
			display: inline-block;
			vertical-align: middle;
			position: relative;
			top: -2px;
			margin-right: 0.18rem;
		}
	}
	.tip {
		text-align: center;
		color: #3f3f3f;
		font-size: 0.3rem;
		&.fixed {
			position: fixed;
			bottom: 1.2rem;
			left: 0;
			right: 0;
		}
		.org {
			color: #f76d02;
		}
		.remain-num {
			color: #007aff;
			vertical-align: bottom;
		}
	}
	li {
		width: 33.33333%;
		float: left;
		height: 2.5rem;
		border: 1px solid #cccccc;
		border-top: 0;
		background-color: rgb(248, 249, 250);
		position: relative;
		.icon-wrap {
			position: absolute;
			top: 0.1rem;
			right: 0.1rem;
			border-radius: 50%;
			background-color: rgb(0, 122, 255);
			opacity: 0.702;
			width: 0.48rem;
			height: 0.48rem;
			text-align: center;
			padding-top: 0.08rem;
			color: #fff;
			i {
				font-size: 0.24rem;
				margin: -0.3rem;
				padding: 0.3rem;
			}
		}
		img {
			width: 100%;
			height: 100%;
		}
		&:last-child {
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.add {
			width: 1.22rem;
			height: 1.22rem;
			background: url(../assets/image/add-big.png) center no-repeat;
			background-size: 1.22rem;
		}
	}
}
</style>
