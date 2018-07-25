export default {
	data() {
		return {
			enterTime: Date.now()
		}
    },
	beforeRouteLeave(to, from, next) {
		this.saveOperatelLog({
            ModelName: this.logTitle,
            ItemName: '',
            DetailInfo: (Date.now() - this.enterTime) / 1000,
            OperateType: '停留'
        })
        next()
    },
    activated () {
        this.enterTime = Date.now()
    }
}
