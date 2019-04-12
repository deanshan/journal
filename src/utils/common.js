
const _toString = Object.prototype.toString

// 判断是否为数组且不为空
export const isArray = (arr) => {
    return (_toString.call(arr).slice(8,-1) === "Array") && (arr.length !== 0)
}