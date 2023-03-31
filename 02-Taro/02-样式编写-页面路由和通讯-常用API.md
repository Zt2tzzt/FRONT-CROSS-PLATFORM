# 一、样式编写

## 1.设计稿及尺寸单位

Taro 默认以 750px 作为换算尺寸标准；

如设计稿不是 750px，修改 `config/index.js` 中的 `designWidth`

- 比如：设计稿是 640px：

```js
const config = {
  designWidth: 640,
}
```

Taro 中单位建议使用 px 或百分比 %；

Taro 默认会按照设计稿，对所有单位进行转换。

通常按照 1:1 关系来编写尺寸大小；

- 即设计稿量长度 100px，那么尺寸就写 100px;
- 当转成微信小程序时尺寸为 100rpx；
- 当转成 H5 时尺寸以 rem 为单位。

src\pages\02-style\index.jsx

```jsx
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.less'

export default class extends Component {

  render () {
    return (
      <View className='02-style'>
        <Text className='style-taro'>Hello world!</Text>
      </View>
    )
  }
}
```

src\pages\02-style\index.less

```less
.style-taro {
  font-size: 40px; // h5: 1rem; weapp: 40rpx
}
```

### 1.CSS 编译时忽略

忽略单个属性：

如希望部分 px 单位不被进行转换（转换成 rpx 或 rem），最简单做法，“px” 单位使用大写字母，如 “Px”。

src\pages\02-style\index.less

```less
.style-taro {
  font-size: 40Px; // 不转换单位
}
```


忽略样式文件：

- 对于头部包含注释 `/* postcss-pxtransform disable */` 的文件，插件不予转换处理。
- 通常会把不需要转换的单位，抽取到一个文件中，如 `no-transform-unit.less`：

src\pages\02-style\index.jsx

```jsx
//...
import './no-transform-unit.less'

export default class extends Component {

  render () {
    return (
      <View className='02-style'>
        <View className="no-transform-unit">不转换单位</View>
      </View>
    )
  }
}
```

src\pages\02-style\no-transform-unit.less

```less
/*postcss-pxtransform disable*/

// 有上方注释时，小写的单位（如 px），也不会进行转换

.no-transform-unit {
  border: 6px solid red;
  padding: 10px;
}

```

### 2.JS 行内样式转换

如果是 JS 中编写了行内样式，那么无法自动替换；

针对这种情况，Taro 提供了 API `Taro.pxTransform` 来做运行时的尺寸转换。

src\pages\02-style\index.jsx

```jsx
//...

export default class extends Component {

  render () {
    const lineStyle = {
      fontSize: Taro.pxTransform(30)
    }

    return (
      <View className='02-style'>
        <View style={lineStyle}>行内样式 px 的转换</View>
      </View>
    )
  }
}
```

## 2.全局和局部样式

全局样式：

- Taro 页面和普通组件导入的样式文件，默认在全局生效。

局部样式：

首先明确，React 项目流行的 *styled-components* 方案，在小程序中无效，

在 Taro 项目中，一般使用要 CSS Modules 方案，编写局部样式。

1. 在 `config/index.js` 配置文件中，启用 H5 和小程序的 CSS Modules 的功能。
2. 编写的样式文件需要加上 `.module` 关键字
   - 比如：`index.module.scss` 文件。

3. 在组件中导入该样式文件，即可按照模块的方式使用了。

config\index.js

```js
const config = {

  // 用于微信小程序的配置。
	mini: {
		postcss: {
      //...
			cssModules: {
				enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
			}
		}
	},
	h5: {
    //。。。
		postcss: {
      //...
			cssModules: {
				enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
			}
		}
	},
}
```

新建 `index.module.less`

src\pages\02-style\index.module.less

```less
.local-style {
  color: purple;
  border: 4px solid purple;

  .name {
    color: red;
  }

  &:hover {
    color: blue;
  }
}
```

src\pages\02-style\index.jsx

```jsx
//...
import styles from './index.module.less'

export default class extends Component {
	render() {

		return (
			<View className='02-style'>
				{/* 局部样式，如果使用了 less，也要按照嵌套来写。 */}
				<View className={styles['local-style']}>
          编写局部样式
          <View className={styles['name']}>name</View>
        </View>
			</View>
		)
	}
}
```


CSS Modules 中，也支持编写全局样式,使用 `:global`

src\pages\02-style\index.module.less

```less
:global(.title) {
  color: orange;
}
```

src\pages\02-style\index.jsx

```jsx
//...
import styles from './index.module.less'

export default class extends Component {
	render() {

		return (
			<View className='02-style'>
				{/* 全局和局部样式 */}
        <View className="title">局部样式中编写的全局样式</View>
			</View>
		)
	}
}
```

## 3.背景图片

Taro 支持使用在 css 里设置背景图片，使用方式与普通 web 项目大体相同：

- 支持 base64 格式图片，
- 支持支持网络路径图片。

使用本地资源（图片、字体）需注意：

- 小程序不支持在 css 中使用本地文件（背景图、字体）。须以 base64 格式替换。
- 为了方便开发，Taro 提供了在样式文件中，直接引用本地资源的方式；
  - 其原理是通过 *PostCSS* 的 *postcss-url* 插件，将样式中本地资源引用，转换成 Base64 格式，从而能正常加载。
- 不建议使用太大的背景图，大图需挪到服务器上，从网络地址引用。

在 `config/index.js` 中配置最大转 base64 格式的文件大小。

config\index.js

```js
const config = {

  // 用于微信小程序的配置。
	mini: {
		postcss: {
      //...
			url: {
				enable: true,
				config: {
					// limit: 1024 // 设定转换尺寸上限（无效的，官方文旦未更新）
          maxSize: 100
				}
			},
		}
	},
}
```

在样式中，直接引用本地图片路径。

src\pages\02-style\index.module.less

```less
.bg-img {
  height: 400px;
  border: 1px solid red;

  background-image: url(../../assets/images/empty_cart.png); // 相对路径，适用于 h5, weapp
  // background-image: url(~&/assets/images/empty_cart.png); // 别名路径，适用于 h5

  background-repeat: no-repeat;
  background-size: contain;
}
```

src\pages\02-style\index.jsx

```jsx
//...
import styles from './index.module.less'

export default class extends Component {
	render() {

		return (
			<View className='02-style'>
        {/* 背景图片 */}
        <View className={styles['bg-img']}></View>
			</View>
		)
	}
}
```

## 4.字体图标

Taro 支持使用字体图标，使用方式与普通 web 项目相同，步骤如下：

1. 先生成字体图标文件；
2. `app.lcss` 引入字体图标；
3. 组件中使用自定义字体

src\app.less

```less
@import "./assets/custom-font/iconfont.css";
```

src\pages\02-style\index.less

```less
.text {
  font-size: 100px;
  color: red;
}
```

src\pages\02-style\index.jsx

```jsx
//...
import './index.less'

export default class extends Component {
	render() {

		return (
			<View className='02-style'>
        {/* 字体图标 */}
        <Text className="text iconfont icon-shouye"></Text>
        <Text className="text iconfont icon-touxiang-kong"></Text>
			</View>
		)
	}
}
```

# 二、Page 新建

快速创建新页面

1. 命令行创建：

```shell
Taro create --name [页面名称]
```

在当前项目的 pages 目录下，根据固定模板生成新的页面文件，是一个提高开发效率的利器。

2. 手动创建页面

在目录根目录下的 pages 目录下新建即可。

两种方式：新建的页面，都需在 `app.config.json` 中的 `pages` 列表上配置注册。

删除页面，也要做两件工作：

- 删除页面对应的文件；
- 删除 `app.config.json` 中对应的配置。

# 三、tabbar 配置

创建 `home.jsx`, `category.jsx`, `cart.jsx`, `profile.jsx` 四个页面。

配置 tabbar

src\app.config.js

```js
export default defineAppConfig({
	//...
  tabBar: {
    color: '#999',
    selectedColor: '#ff464e',
    list: [
      {
        text: '首页',
        pagePath: 'pages/home/index',
        iconPath: 'assets/images/tabbar/home.png',
        selectedIconPath: 'assets/images/tabbar/home_active.png'
      },
      {
        text: '分类',
        pagePath: 'pages/category/index',
        iconPath: 'assets/images/tabbar/category.png',
        selectedIconPath: 'assets/images/tabbar/category_active.png'
      },
      {
        text: '购物车',
        pagePath: 'pages/cart/index',
        iconPath: 'assets/images/tabbar/cart.png',
        selectedIconPath: 'assets/images/tabbar/cart_active.png'
      },
      {
        text: '首页',
        pagePath: 'pages/profile/index',
        iconPath: 'assets/images/tabbar/profile.png',
        selectedIconPath: 'assets/images/tabbar/profile_active.png'
      },
    ]
  }
})

```

# 四、页面路由

Taro 有两种页面路由跳转方式：

- 组件：`<Navigator>`；

- 常用 API：`navigate`、`redirectTo`、`switchTab`、`navigateBack`。

创建 detail01 页面，进行测试。从 home 跳转到 detail01.

```jsx
import { Component } from 'react'
import { View, Navigator, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Home extends Component {

  goToDetail01ByNavigate() {
    Taro.navigateTo({
      url: '/pages/detail01/index'
    })
  }

  goToDetail01ByRedirect() {
    Taro.redirectTo({
      url: "/pages/detail01/index"
    })
  }

  goToCategoryByNavigate() {
    Taro.switchTab({
      url: '/pages/category/index'
    })
  }

	render() {
		return (
			<View className='home'>
				<View>1.页面跳转（组件）</View>
				<Navigator url='/pages/detail01/index' openType='navigate'>
					<Button>goToDetail01 navigate</Button>
				</Navigator>
				<Navigator url='/pages/detail01/index' openType='redirect'>
					<Button>goToDetail01 redirect</Button>
				</Navigator>
				<Navigator url='/pages/category/index' openType='switchTab'>
					<Button>goToCategory switchTab</Button>
				</Navigator>

        <View>2.页面跳转（API）</View>
        <Button onClick={() => this.goToDetail01ByNavigate()}>goToDetail01 navigate</Button>
        <Button onClick={() => this.goToDetail01ByRedirect()}>goToDetail01 redirect</Button>
        <Button onClick={() => this.goToCategoryByNavigate()}>goToCategory switchTab</Button>

			</View>
		)
	}
}
```

# 五、页面通讯

在 Taro 中，常见页面通讯方式：

方式一：url 查询字符串；

方式二：EventChannel（只支持小程序端）；

方式三：全局事件总线：`Taro.eventCenter`；

方式四：全局数据：`taroGloabalData`；

方式五：本地数据存储: `Taro.setStorageSync(key, data)`；

方式五：Redux 状态管理库

## 1.正向传递

### 1.url 查询字符串

传递参数：`?name=zzt&age=100`

获取参数：
- `onLoad`、`useLoad` 生命周期获取路由参数；
- `Taro.getCurrentInstance().router.params` 获取路由参数。

`home.jsx` 页面传递给 `detail01.jsx` 页面。

src\pages\home\index.jsx

```jsx
import { Component } from 'react'
import { View, Navigator, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Home extends Component {

  getDetail01WithEventChannel() {
    Taro.navigateTo({
      url: '/pages/detail01/index?name=zzt&age=18',
    })
  }

	render() {
		return (
			<View className='home'>
        <View>3.页面传递参数（正向）</View>
        <Button onClick={() => this.getDetail01WithEventChannel()}>goToDetail01 eventChannel</Button>
			</View>
		)
	}
}
```

src\pages\detail01\index.jsx

```jsx
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Detail01 extends Component {

  componentDidMount () {
    // 方式一
    console.log('detail01 parms:', this.$instance.router.params);
  }

  $instance = Taro.getCurrentInstance() // 其中有 page 实例对象，也有 router 对象。

  onLoad(options) {
    // 方式二
    console.log('detail01 options:', options);
  }

  render () {
    return (
      <View className='detail01'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
```

### 2.EventChannel // TODO

该方式仅支持小程序。

src\pages\home\index.jsx

```jsx
import { Component } from 'react'
import { View, Navigator, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Home extends Component {

  getDetail01WithEventChannel() {
    Taro.navigateTo({
      url: '/pages/detail01/index?name=zzt&age=18',
      success(res) {
        if (process.env.TARO_ENV === 'weapp') {
          // 仅支持小程序
          res.eventChannel.emit('homeToDetail01', {
            data: 'home to detail01'
          })
        }
      }
    })
  }

	render() {
		return (
			<View className='home'>
        <View>3.页面传递参数（正向）</View>
        <Button onClick={() => this.getDetail01WithEventChannel()}>goToDetail01 eventChannel</Button>
			</View>
		)
	}
}
```

src\pages\detail01\index.jsx

```jsx
import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Detail01 extends Component {

  $instance = Taro.getCurrentInstance() // 获取 page 实例，其中有 router 对象。

  onLoad(options) {

    if (process.env.TARO_ENV === 'weapp') {
      const eventChannel = this.$instance.page.getOpenerEventChannel();
      eventChannel.on('homeToDetail01', data => {
        console.log('detial01 accept home data:', data);
      })
    }
  }

  render () {
    return (
      <View className='detail01'>
        <Text>Hello world!</Text>
      </View>
    )
  }
}
```

> `Taro.getCurrentInstance().page` === `Taro.getCurrentPage()`

## 2.逆向传递

### 1.EventChannel

该方式仅支持小程序。

创建 detail02 页面，home 跳转 detail02 页面，从 detail02 返回值，向 home 传递数据。

src\pages\home\index.jsx

```jsx
import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Home extends Component {

  goToDetail02WithEventChannel() {
    Taro.navigateTo({
      url: '/pages/detail02/index',
      // 仅支持小程序
      events: {
        detail02ToHome(data) {
          console.log('home accept detail02 data:', data);
        }
      }
    })
  }

	render() {
		return (
			<View className='home'>
        <View>4.页面传递数据（逆向）</View>
        <Button onClick={() => this.goToDetail02WithEventChannel()}>goToDetail02 eventChannel</Button>
			</View>
		)
	}
}
```

src\pages\detail02\index.jsx

```jsx
import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Detail02 extends Component {
  $instance = Taro.getCurrentInstance(); // 是可以拿到当前的 app 实例，其中有 page 实例，其中有 router 对象

  goBack() {
    Taro.navigateBack({
      deita: 1
    })

    if (process.env.TARO_ENV === 'weapp') {
      // 互殴 page 实例的另一种方式
      /* const pages = Taro.getCurrentPages()
      const page = pages[pages.length - 1] */

      const eventChannel = this.$instance.page.getOpenerEventChannel()
      eventChannel.emit('detail02ToHome', 'detail02 to home')
    }
  }

  render () {
    return (
      <View className='detail02'>
        <Button onClick={() => this.goBack()}>返回!</Button>
      </View>
    )
  }
}
```

### 2.全局事件总线

为了支持跨组件、跨页面之间的通信，Taro 提供了全局事件总线：`Taro.eventCenter`

- `Taro.eventCenter.on( eventName, function )` 监听一个事件；
- `Taro.eventCenter.trigger( eventName, data)` 触发一个事件；
- `Taro.eventCenter.off( eventName, function )` 取消监听事件；

注意事项：

- 需先监听，再触发事件；
  - 比如：在A界面触发，然后跳转到B页面后才监听是不行的。
- 通常有 `on` 就要有 `off`，可以避免多次重复监听
- 适合页面返回传递参数、适合跨组件通讯，不适合界面跳转传递参数

创建 detail03 页面。

src\pages\home\index.jsx

```jsx
import { Component } from 'react'
import { View, Navigator, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Home extends Component {

  onLoad() {
    Taro.eventCenter.on('detail03ToHome', this.detail03ToHome)
  }

  onUnload() {
    Taro.eventCenter.off('detail03ToHome', this.detail03ToHome)
  }

  detail03ToHome(data) {
    console.log('home accept detail03 data:', data);
  }

	render() {
		return (
			<View className='home'>
        <View>4.页面传递数据（逆向）</View>
        <Navigator url='/pages/detail02/index' openType='navigate'>
          <Button>goToDetail02 Taro.eventCenter</Button>
        </Navigator>
			</View>
		)
	}
}

```

src\pages\detail03\index.jsx

```jsx
import { Component } from 'react'
import { View, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Detail03 extends Component {

  goBack() {
    Taro.navigateBack({
      deita: 1
    })

    Taro.eventCenter.trigger('detail03ToHome', 'detail03 to home')
  }

  render () {
    return (
      <View className='detail02'>
        <Button onClick={() => this.goBack()}>返回!</Button>
      </View>
    )
  }
}

```


> Taro 和 uni-app 的编程范式是类似的，只有语法和兼容性不同

# 六、页面生命周期

## 1.class

Taro 页面组件除了支持 React 组件生命周期外，还根据小程序的标准，额外支持以下页面生命周期：

- `onLoad(options)` 在小程序环境中对应页面的 `onLoad`。
	- 通过访问 `options` 参数或调用 `getCurrentInstance().router`，可以访问到页面路由参数
- `componentDidShow()` 在小程序环境中对应页面的 `onShow`。
- `onReady()` 在小程序环境中对应页面的 `onReady`。
	- 可以使用 `createCanvasContext` 或 `createSelectorQuery` 等等 API，访问小程序渲染层 DOM 节点
- `componentDidHide()` 在小程序环境中对应页面的 `onHide`。
- `onUnload()` 在小程序环境中对应页面的 `onUnload`。
	- 一般情况下建议使用 React 的 `componentWillUnmount` 生命周期，处理页面卸载时的逻辑。
- `onPullDownRefresh()` 监听用户下拉动作。
- `onReachBottom()` 监听用户上拉触底事件。

[更多生命周期函数](https://docs.taro.zone/docs/react-page/#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%96%B9%E6%B3%95)

src\pages\home\index.jsx

```jsx
import { Component } from 'react'
import { View, Navigator, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Home extends Component {

	render() {
		return (
			<View className='home'>
        <View>5.页面生命周期</View>
        <Navigator url='/pages/detail04/index' openType='navigate'>
          <Button>goToDetail04 class</Button>
        </Navigator>

			</View>
		)
	}
}
```

src\pages\detail04\index.jsx

```jsx
import { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Detail04 extends Component {

  onLoad() {
    console.log("detail04 onLoad");
  }
  componentDidShow() {
    console.log("detail04 componentDidShow");
  }
  onReady() {
    console.log("detail04 onReady");
  }
  componentDidHide() {
    console.log("detail04 componentDidHide");
  }
  onUnload() {
    console.log("detail04 onUnload");
  }
  onPullDownRefresh() {
    console.log("detail04 onPullDownRefresh");
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  }
  onReachBottom() {
    console.log("detail04 onReachBottom");
  }

  render () {
    return (
      <View className='detail04'>
        <View className='item'>item1</View>
        <View className='item'>item2</View>
        <View className='item'>item3</View>
        <View className='item'>item4</View>
        <View className='item'>item5</View>
        <View className='item'>item6</View>
        <View className='item'>item7</View>
        <View className='item'>item8</View>
        <View className='item'>item9</View>
        <View className='item'>item10</View>
        <View className='item'>item11</View>
        <View className='item'>item12</View>
        <View className='item'>item13</View>
        <View className='item'>item14</View>
        <View className='item'>item15</View>
      </View>
    )
  }
}
```

## 2.Hooks

Taro 使用 Hooks 很简单。Taro 专有 Hooks，例如 `usePageScroll`, `useReachBottom`，需从 `@tarojs/taro` 中引入；

React 框架自己的 Hooks ，例如 `useEffect`, `useState`，从对应的框架引入。

[更多的 Hooks 可查看官网](https://docs.taro.zone/docs/hooks)

src\pages\home\index.jsx

```jsx
import { Component } from 'react'
import { View, Navigator, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './index.less'

export default class Home extends Component {

	render() {
		return (
			<View className='home'>
        <View>5.页面生命周期</View>
        <Navigator url='/pages/detail05/index' openType='navigate'>
          <Button>goToDetail05 hook</Button>
        </Navigator>

			</View>
		)
	}
}
```

在 detail05 中，通过实例拿页面参数，实例用 ref 引用。

src\pages\detail05\index.jsx

```jsx
import { useEffect, useRef } from "react";
import { View } from "@tarojs/components";
import Taro, {
  useLoad,
  useDidShow,
  useReady,
  useDidHide,
  useUnload,
  usePullDownRefresh,
  useReachBottom,
} from "@tarojs/taro";
import "./index.less";

function Detail05() {
  // useRef 存的对象，在整个组件的生命周期中，都是保持同一个对象。
  const $instance = useRef(Taro.getCurrentInstance());
  console.log("router.params=>", $instance.current.router.params);

  // 1.支持组件的生命周期
  useEffect(() => {
    console.log("detail05 useEffect");
    return () => {
      console.log("detail05 useEffect unMount");
    };
  }, []);

  // 2.页面的声明周期
  useLoad((options) => {
    console.log("detail05 useLoad", options);
  });
  useDidShow(() => {
    console.log("detail05 useDidShow");
  });
  useReady(() => {
    console.log("detail05 useReady");
  });
  useDidHide(() => {
    console.log("detail05 useDidHide");
  });
  useUnload(() => {
    console.log("detail05 useUnload");
  });
  usePullDownRefresh(() => {
    console.log("detail05 usePullDownRefresh");
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    }, 1000);
  });

  useReachBottom(() => {
    console.log("detail05 useReachBottom");
  });

  return (
    <View className="detail04">
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
      <View className="detail01-item">item1</View>
    </View>
  );
};

export default Detail05;
```

# 七、网络请求封装

类似于微信小程序：

`Taro.request(OBJECT)` 发起网络请求。

- 在各个小程序平台运行时，网络相关的 API 在使用前需要配置合法域名（域名白名单）。
- 微信小程序开发工具在开发阶段可以配置：不校验合法域名。
- `header` 中的 `content-type` 属性的默认值为：`application/json`

src\service\index.js

```js
import Taro from "@tarojs/taro";

const TIME_OUT = 60000;
const BASE_URL = "http://123.207.32.32:7888/api/hy66";

class ZtRequest {

  request(url, method, data) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: BASE_URL + url,
        method: method || "GET",
        timeout: TIME_OUT,
        data: data,
        success(res) {
          resolve(res.data);
        },
        fail(err) {
          reject(err);
        },
      });
    });
  }

  get(url, params) {
    return this.request(url, "GET", params);
  }

  post(url, data) {
    return this.request(url, "POST", data);
  }
}
export default new ZtRequest();
```

# 八、数据存储

类似于微信小程序和 uni-app

`Taro.setStorage(OBJECT)`

- 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。

`Taro.setStorageSync(KEY, DATA)`

- 将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

`Taro.getStorage(OBJECT)`

- 从本地缓存中异步获取指定 key 对应的内容。

`Taro.getStorageSync(KEY)`

- 从本地缓存中同步获取指定 key 对应的内容。

`Taro.removeStorage(OBJECT)`

- 从本地缓存中异步移除指定 key。

`Taro.removeStorageSync(KEY)`

- 从本地缓存中同步移除指定 key。

src\pages\03-service\index.jsx

```jsx
import { Component } from "react";
import { View, Button } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { getHomeMutidata } from "@/service/home";
import "./index.less";

export default class Detail01 extends Component {
  getHomeData() {
    getHomeMutidata().then((res) => {
      console.log(res);
    });
  }
  setStorage() {
    Taro.setStorage({
      key: "info",
      data: {
        name: "zzt",
        id: 111,
      },
    });

    Taro.setStorageSync("token", "sdfdffthsdf");
  }
  getStorage() {
    Taro.getStorage({
      key: "info",
      success(res) {
        console.log(res.data);
      },
    });
    const token = Taro.getStorageSync("token");
    console.log(token);
  }
  render() {
    return (
      <View className="detail01">
        <View>1.发起网络请求</View>
        <Button onClick={() => this.getHomeData()}>getHomeData</Button>
        <View>2.本地数据的存储</View>
        <Button onClick={() => this.setStorage()}>setStorage</Button>
        <Button onClick={() => this.getStorage()}>getStorage</Button>
      </View>
    );
  }
}
```

