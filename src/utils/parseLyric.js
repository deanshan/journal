export const parseLyric = (text) => {
    let lines = text.split('\n')// 将文本分隔成一行一行，存入数组
    let pattern = /\[\d{2}:\d{2}.\d+\]/g // 用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
    let result = []// 保存最终结果的数组
    // 去掉不含时间的行
    while (!pattern.test(lines[0])) {
      lines = lines.slice(1)
    }
    // 上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
    lines[lines.length - 1].length === 0 && lines.pop()
    lines.forEach(val => {
      let time = val.match(pattern)// 提取出时间[xx:xx.xx]
      let value = val.replace(pattern, '')// 提取歌词
      // 因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
      time.forEach(v => {
      // 去掉时间里的中括号得到xx:xx.xx
        let t = v.slice(1, -1).split(':')
        // 将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value])
      })
    })
    // 最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
    result.sort(function (a, b) {
      return a[0] - b[0]
    })
    return result
  }