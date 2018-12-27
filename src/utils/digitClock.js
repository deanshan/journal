function Clock (options) {

  this.digit = [
    [ // 0
      [0, 0, 1, 1, 1, 0, 0],
      [0, 1, 1, 0, 1, 1, 0],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [0, 1, 1, 0, 1, 1, 0],
      [0, 0, 1, 1, 1, 0, 0]
    ],
    [ // 1
      [0, 0, 0, 1, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1, 1]
    ],
    [ // 2
      [0, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0, 0],
      [0, 1, 1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1]
    ],
    [ //  3
      [1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 1, 0]
    ],
    [ //  4
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 1, 1, 0],
      [0, 0, 1, 1, 1, 1, 0],
      [0, 1, 1, 0, 1, 1, 0],
      [1, 1, 0, 0, 1, 1, 0],
      [1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 1, 1, 1]
    ],
    [ // 5
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 1, 0]
    ],
    [ //  6
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0],
      [1, 1, 0, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 1, 0]
    ],
    [ // 7
      [1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0]
    ],
    [ //  8
      [0, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 1, 1, 0]
    ],
    [ //  9
      [0, 1, 1, 1, 1, 1, 0],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [0, 1, 1, 1, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 1, 1, 0],
      [0, 0, 0, 1, 1, 0, 0],
      [0, 0, 1, 1, 0, 0, 0]
    ],
    [ //  :
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ]
  ]

  this.options = {
    el: 'body',
    w: window.innerWidth, //  默认画布宽为浏览器的宽度
    h: window.innerHeight, //  默认画布高为浏览器的高度
    offsetX: 300,
    offsetY: 200,
    scale: 100,
    color: `#${Math.random().toString().slice(-6)}`
  }

  Object.assign(this.options, options)  //  合并对象

  this.r = this.options.h / this.options.scale - 1//  半径

  this.data = []  //  存储时间

  this.balls = [] // 存储小球

  this.run()

}
Clock.prototype = {

  contructor: Clock,

  createCanvas () { //  初始化canvas元素
    if (!document.querySelector('canvas')) {
      document.querySelector(this.options.el).insertBefore(document.createElement('canvas'), document.querySelector(this.options.el).firstChild)
    }
    this.canvas = document.querySelector('canvas') // canvas元素
    this.canvas.width = this.options.w  // 画布宽度
    this.canvas.height = this.options.h
    this.ctx = this.canvas.getContext('2d') // canvas绘图上下文
  },

  renderDigit () { //  渲染数字
    this.data.forEach((num, index) => { // 遍历时间数字
      this.digit[num].forEach((item, row) => { // 遍历二维数组，对应行
        item.forEach((v, col) => {  // 遍历三维数组，对应列
          if (v === 1) {
            this.ctx.beginPath()
            this.ctx.fillStyle = this.options.color
            this.ctx.arc(this.options.offsetX+14*(this.r+2)*index+(2*col+1)*(this.r+1), this.options.offsetY+(2*row+1)*(this.r+1), this.r, 0, Math.PI*2, false)
            this.ctx.closePath()
            this.ctx.fill()
          }
        })
      })

    })
  },

  currentTime () { // 初始化时间并保存
    let time = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date())
    this.data.push(time[1], time[2], 10, time[3], time[4], 10, time[5], time[6])
  },

  updateTime () { // 时间变化时，获取发现变化对应的数字
    let newTime = []
    let changeNumber = []
    let time = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date())
    newTime.push(time[1], time[2], 10, time[3], time[4], 10, time[5], time[6])

    this.data.forEach((t,k) => {  // 与之前的时间对比，存储发生变化的时间数字的索引及数字
      if (t !== newTime[k]) {
        changeNumber.push((Number(t)+1) + '_' + k )
      }
    })
    changeNumber.forEach((t) => {  // 把发生变化的数字进行小球渲染
      this.addBalls(t.split('_')[0], t.split('_')[1])
    })
    this.data = newTime //  更新时间
  },

  addBalls (num, index) { // 获取每个数字上的所有小球对象属性
    this.digit[num].forEach((item, row) => {
      item.forEach((v, col) => {
        if (v === 1) {
          this.ball = {
              x: this.options.offsetX+14*(this.r+2)*index + col*2*(this.r+1)+(this.r+1),
              y: this.options.offsetY+row*2*(this.r+1)+(this.r+1),
              stepX: Math.floor(Math.random()*4-2),
              stepY: Math.floor(Math.random()*6-4),
              color: `#${Math.random().toString().slice(-6)}`,
              disY: 1
          }
          this.balls.push(this.ball)
        }
      })
    })
  },

  updateBalls () {  // 设置小球运动轨迹方向
    this.balls.forEach((ball, k) => {
      ball.stepY +=ball.disY
      ball.x += ball.stepX;
      ball.y += ball.stepY;
      if(ball.x > this.options.w + this.r || ball.y > this.options.h + this.r){
        this.balls.splice(k,1);
      }
    })
  },

  renderBalls () {  // 渲染小球
    this.balls.forEach(ball => {
      this.ctx.beginPath()
      this.ctx.fillStyle = `#${Math.random().toString().slice(-6)}`
      this.ctx.arc(ball.x, ball.y, this.r, 0, Math.PI*2, false)
      this.ctx.closePath()
      this.ctx.fill()
    })
  },

  run () {
    this.createCanvas()
    this.currentTime()

    this.timer = setInterval(() => {

      this.ctx.fillStyle = '#fff'
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)  //  重置canvas

      this.updateTime()
      this.updateBalls()
      this.renderDigit()
      this.renderBalls()
    }, 50)
  }
}

export {
  Clock
}