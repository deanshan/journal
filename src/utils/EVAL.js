// 在jsint中使用eval()解析json字符串转换成对象数组时，出现报错的情况，一般可以忽略,js解决方法如下
// 计算表达式的值
export const EVAL = (fn) => {
    // 一个变量指向Function，防止有些前端编译工具报错
    let Fn = Function
    return new Fn('return' + fn)()
  }