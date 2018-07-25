import Vue from 'vue'
// import WebStorageCache from 'web-storage-cache'
// const wsCache = new WebStorageCache()
export const storageHelper = {
	setTagRP(data) {
		localStorage.setItem('TagRP', data - 0)
	},
	getTagRP() {
        const col = localStorage.getItem('TagRP')
		return !col ? 1 : col - 0
    },
    setModSettingRP(data) {
		localStorage.setItem('ModSettingRP', data - 0)
	},
	getModSettingRP() {
		const col = localStorage.getItem('ModSettingRP')
		return !col ? 1 : col - 0
    },
    setHCRP(data) {
		localStorage.setItem('HCRP', data - 0)
	},
	getHCRP() {
        const col = localStorage.getItem('HCRP')
		return !col ? 1 : col - 0
    },
    setPendingRP(data) {
		localStorage.setItem('PendingRP', data - 0)
	},
	getPendingRP() {
        const col = localStorage.getItem('PendingRP')
		return !col ? 1 : col - 0
    },
    setPop1Num(data) {
		localStorage.setItem('Pop1Num', data - 0)
	},
	getPop1Num() {
        const col = localStorage.getItem('Pop1Num')
		return !col ? 3 : col - 0
    },
    setPop2Num(data) {
		localStorage.setItem('Pop2Num', data - 0)
	},
	getPop2Num() {
        const col = localStorage.getItem('Pop2Num')
		return !col ? 3 : col - 0
    },
    setAgeTab(data) {
		localStorage.setItem('AgeTab', data - 0)
	},
	getAgeTab() {
        const col = localStorage.getItem('AgeTab')
		return !col ? 0 : col - 0
    },
    setDetailTab(data) {
		localStorage.setItem('DetailTab', data - 0)
	},
	getDetailTab() {
        const col = localStorage.getItem('DetailTab')
		return !col ? 0 : col - 0
    },
    setKeyPointShow(data) {
		localStorage.setItem('KeyPointShow', data - 0)
	},
	getKeyPointShow() {
        const col = localStorage.getItem('KeyPointShow')
		return !col ? 1 : col - 0
    }
}

export function returnDate(str) {
	if (typeof str === 'string') {
		str = str.split('.')[0] // 去除毫秒
		// 替换T为空格
		str = str.replace(/T/g, ' ')
		const a = str.split(' ')
		const d = a[0].split('-')
		const t = (a[1] && a[1].split(':')) || []
		return new Date(d[0], d[1] - 1, d[2], t[0] || 0, t[1] || 0, t[2] || 0)
	} else if (typeof str === 'number') {
		return new Date(str)
	} else if (str instanceof Date) {
		return str
	} else {
		return new Date()
	}
}

export const YYYY_MM_DD = 1
export const MM_DD_HH_SS = 2
export const YYYY_MM_DD_HH_MM = 3 // default
export const YYYY_MM_DD_HH_MM_SS = 4
export const MM_DD = 5
export const HH_MM = 6
export const YYYYMMDD = 7
export const YYYY_MM = 8
export const YYYY_MM2 = 8.5
export const YYYY = 9

export function getDateStr(timestamp, mode = 3, sep = '-') {
	if (!timestamp) {
		return ''
	}
	const d = returnDate(timestamp)
	const year = d.getFullYear()
	const month = `${('0' + (d.getMonth() + 1)).slice(-2)}`
	const day = `${('0' + d.getDate()).slice(-2)}`
	const hour = `${('0' + d.getHours()).slice(-2)}`
	const minute = `${('0' + d.getMinutes()).slice(-2)}`
	const second = `${('0' + d.getSeconds()).slice(-2)}`
	switch (mode) {
		case YYYY_MM_DD:
			return `${year}${sep}${month}${sep}${day}`
		case MM_DD_HH_SS:
			return `${month}${sep}${day} ${hour}:${minute}`
		case YYYY_MM_DD_HH_MM_SS:
			return `${year}${sep}${month}${sep}${day} ${hour}:${minute}:${second}`
		case '':
			return `${month}${sep}${day} ${hour}:${minute}`
		case YYYY_MM_DD_HH_MM:
			return `${year}${sep}${month}${sep}${day} ${hour}:${minute}`
		case MM_DD:
			return `${month}${sep}${day}`
		case HH_MM:
			return `${hour}:${minute}`
		case YYYYMMDD:
			return `${year}${month}${day}`
		case YYYY_MM:
            return `${year}${sep}${month}`
        case YYYY_MM2:
            return `${year}年${d.getMonth() + 1}月`
        case YYYY:
			return `${year}`
		default:
			return `${year}${sep}${month}${sep}${day} ${hour}:${minute}`
	}
}

export function sliceText(raw, num = 10) {
	if (!raw || !num) {
		return raw
	}
	raw += ''
	return raw.length < num ? raw : raw.slice(0, num) + '...'
}

export function validMobile(data) {
	return /^1(3|4|5|7|8)\d{9}$/.test(data)
}

export function validID(data) {
	return /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
		data
	)
}

export function validNumber(data) {
	return data && /^[0-9]+(.[0-9]{1,3})?$/.test(data)
}

export function searchString(str, match, className) {
	return str.replace(
		new RegExp(`(${match})`, 'gi'),
		`<strong class="${className}">$1</strong>`
	)
}

export function extname(name) {
	return name.lastIndexOf('.') !== -1 ?
		name.substring(name.lastIndexOf('.') + 1) :
		''
}

export function isObjectEmpty(obj) {
	for (var name in obj) {
		return false
	}
	return true
}

// 取得浏览器的名字。
export function bwsName() {
	let w = window,
		ua = w.navigator.userAgent,
		tem,
		M =
		ua.match(
			/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
		) || []
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || []
		return `IE ${tem[1] || ''}`
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\bOPR\/(\d+)/)
		if (tem != null) {
			return `Opera ${tem[1]}`
		}
	}
	M = M[2] ?
		[M[1], M[2]] :
		[w.navigator.appName, w.navigator.appVersion, '-?']
	if ((tem = ua.match(/version\/(\d+)/i)) != null) {
		M.splice(1, 1, tem[1])
	}
	return M[0]
}

// 取得浏览器的版本。
export function bwsVersion() {
	let w = window,
		ua = w.navigator.userAgent,
		tem,
		M =
		ua.match(
			/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
		) || []
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || []
		return `IE ${tem[1] || ''}`
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\bOPR\/(\d+)/)
		if (tem != null) {
			return `Opera ${tem[1]}`
		}
	}
	M = M[2] ?
		[M[1], M[2]] :
		[w.navigator.appName, w.navigator.appVersion, '-?']
	if ((tem = ua.match(/version\/(\d+)/i)) != null) {
		M.splice(1, 1, tem[1])
	}
	return M[1]
}
export function getPreMonth(prenum, timestamp) {
	const date = returnDate(timestamp)
	let y = parseInt(date.getFullYear())
	let m = parseInt(date.getMonth()) + 1
	let num = m - prenum
	if (num <= 0) {
		y = y - 1
		m = 12 + num
	} else {
		m = num
	}
	return [y, m]
}
export function getCountDays(date) {
	let curDate = returnDate(date)
	let curMonth = curDate.getMonth()
	curDate.setMonth(curMonth + 1)
	curDate.setDate(0)
	return curDate.getDate()
}

if (!Date.prototype.clearTime) {
	Date.prototype.clearTime = function () {
		this.setHours(0)
		this.setMinutes(0)
		this.setSeconds(0)
		this.setMilliseconds(0)
		return this
	}
}

/**
 * 提示的内容
 * @param {text}  提示的内容
 * @param {textType} 类型，0 为警告 1为成功, 2为文本（默认为2）
 * @param {position} 提示的位置，默认为顶部（top）,可选middle，bottom
 */
export function toast(text, textType = 2, position = 'middle') {
	let type = null
	switch (textType) {
		case 0:
			type = 'warn'
			break
		case 1:
			type = 'success'
			break
		default:
			type = 'text'
			break
	}
	Vue.$vux.toast.show({
		text,
		type,
		position
	})
}

export function alert(title, content, autoHide) {
	Vue.$vux.alert.show({
		title: title,
		content: content
    })
    if (autoHide) {
        setTimeout(() => {
            Vue.$vux.alert.hide()
        }, 3000)
    }
}

export function imageLoadOnError(event) {
	const tar = event.currentTarget || this
	const noimg = require('../assets/image/default-avatar.png')
	tar.src = noimg
}
export function changeTitle(t) {
    t && (document.title = t)
}
