const ls = process.browser ? window.localStorage : {}

function accessor(key: string, value?: unknown): any {
	if (!value) {
		return get(key)
	}
	return set(key, value)
}

function get(key: string) {
	try {
		return JSON.parse(ls.getItem(key))
	} catch (error) {
		return ls.getItem(key)
	}
}

function set(key, value) {
	try {
		if (value !== null && typeof value === 'object') {
			value = JSON.stringify(value)
		}

		ls.setItem(key, value)
		return true
	} catch (e) {
		return false
	}
}

function remove(key) {
	return ls.removeItem(key)
}

function clear() {
	return ls.clear()
}

accessor.get = get
accessor.set = set
accessor.remove = remove
accessor.clear = clear

export default accessor
