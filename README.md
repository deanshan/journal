# journal

# 需求
## 根据不同环境配置不同（如生产环境、开发环境、测试环境等）
+ 实现方案
+ 登录登出
+ 可视化展示
+ 知识库的内容从后端获取
+ 音乐、地理位置、实时通讯

# 技术栈
+ vue全家桶
+ echarts
+   npm install echarts --save

+ Element
+   npm i element-ui -S

+ vue-baidu-map
+   npm install vue-baidu-map --save

# 目录结构
|——view
|  |——Home.vue   //主界面
|  |——Audio.vue  //音频封装（全局）
|——components
|  |——common    //公共组件
|  |——header    //头部
|  |——aside     //侧边栏导航菜单
|  |——main      //主体内容
|  |  |——cartogram  //统计图
|  |  |——knowledge  //知识库
|  |  |——music      //音乐
|  |  |  |——Music.vue   //音乐主界面
|  |  |  |——Play.vue    //播放界面
|  |  |  |——Lyric.vue   //歌词界面
|  |  |  |——List.vue    //音乐列表
|  |  |——geolocation //地理定位
|  |  |——socket      //实时通讯