/**
 * @param {selector} element 操作的DOM元素
 * @param {String,Object} objStyle 如果是字符串，则获取或设置该样式，如果是对象，{'stylename':''}属性值为空，为获取样式，不为空，为设置样式
 * @param {String} value 当objStyle的值为字符串时，此形参有效
 *
 * @method  getStyle (selector, {stylename:'',...}) or getStyle(selector, {stylename:value,...}) 返回值为objStyle对象
 * @method  getStyle (selector, stylename) or getStyle(selector,stylename,value)  获取或设置某个样式
 */
export const getStyle =  function (element, objStyle, value) {

/**
 * Get the raw type string of a value e.g. [object Object]
 */
  var _toString = Object.prototype.toString
  function toRawType(objStyle) {
    return _toString.call(objStyle).slice(8, -1)
  }

  if (toRawType(objStyle) === 'object') {

    for (var k in objStyle) {

      if (!objStyle[k]) {

        objStyle[k] = window.getComputedStyle
                      ? window.getComputedStyle(element,false)[k]
                      : element.currentStyle[k]

      } else {

        element.style[k] = objStyle[k]
      }
    }
    return objStyle
  }
  if (toRawType(objStyle) === 'string') {

    if (arguments.length === 2) {

      return window.getComputedStyle
           ? window.getComputedStyle(element,false)[objStyle]
           : element.currentStyle[objStyle]

      } else {

      element.style[objStyle] = value
    }
  }
}
