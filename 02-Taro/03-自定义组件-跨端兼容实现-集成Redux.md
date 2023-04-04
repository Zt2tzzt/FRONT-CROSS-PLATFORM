# 一、组件生命周期

在 Taro 中，除了应用和页面有生命周期之外， 组件也有生命周期。

在 Taro 中，可以使用的 class 组件生命周期有，和对应函数式组件中的 Hooks，如下表：

| class 组件                                                   | Hooks 组件                                                   |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [constructor()](https://docs.taro.zone/docs/apis/about/tarocomponent#constructor) | [useState]([componentWillUnmount()](https://docs.taro.zone/docs/apis/about/tarocomponent#componentwillunmount)) |
| [static getDerivedStateFromProps()](https://docs.taro.zone/docs/apis/about/tarocomponent#static-getderivedstatefromprops) | [useState ]([componentWillUnmount()](https://docs.taro.zone/docs/apis/about/tarocomponent#componentwillunmount))的 update |
| [shouldComponentUpdate()](https://docs.taro.zone/docs/apis/about/tarocomponent#shouldcomponentupdate) | [useMemo](https://docs.taro.zone/docs/hooks#usememo)         |
| [render()](https://docs.taro.zone/docs/apis/about/tarocomponent#render) | 函数式组件本身                                               |
| [componentDidMount()](https://docs.taro.zone/docs/apis/about/tarocomponent#componentdidmount) | [useEffect](https://docs.taro.zone/docs/hooks#useeffect)     |
| [componentDidUpdate()](https://docs.taro.zone/docs/apis/about/tarocomponent#componentdidupdate) | [useEffect](https://docs.taro.zone/docs/hooks#useeffect)     |
| [componentWillUnmount()](https://docs.taro.zone/docs/apis/about/tarocomponent#componentwillunmount) | [useEffect](https://docs.taro.zone/docs/hooks#useeffect) 返回的函数。 |

安装 *classnames*，*proptypes* 依赖

```shell
pnpm add classnames proptypes
```

创建一个组件 `zt-button` 组件，测试在组件中，编写页面的生命周期。

> 【注意】：
>
> 组件中，编写页面生命周期：
>
> - 函数式组件，支持 Hooks API 的页面生命周期;（下方案例属于该情况）
> - 类组件，不支持页面的生命周期。
>
> 页面中，编写组件生命周期：
>
> - 类组件、函数式组件都支持。

src\components\zt-buttom\index.jsx

```jsx
import { View } from '@tarojs/components'
import { useReady, useDidShow, useLoad } from '@tarojs/taro'
import classNames from 'classnames'
import proptypes from 'proptypes'
import { memo, useEffect } from 'react'
import styles from './index.modules.less'

const ZtButtom = memo((props) => {
  const { type = 'default', ztButtonClick } = props

  const onBtnClick = () => {
    ztButtonClick && ztButtonClick()
  }

  // 组件生命周期
  useEffect(() => {
    console.log('zt-button 挂在完成~');
    return () => {
      console.log('zt-button 即将卸载');
    }
  }, [])

  // 页面的生命周期，
  useLoad(() => {
    console.log('zt-button useLoad');
  })

  useDidShow(() => {
    console.log('zt-button useDidShow');
  })

  useReady(() => {
    console.log('zt-button useReady');
  })

  return (
    <View className={classNames(styles['zt-button'], styles[type])} onClick={onBtnClick}>
      {props.children}
    </View>
  )
})

ZtButtom.propTypes = {
  type: proptypes.string,
  onBtnClick: proptypes.func
}

export default ZtButtom

```

编写组件 `zt-button` 的局部样式。

src\components\zt-buttom\index.modules.less

```less
.zt-button {
  font-size: 36px;
  padding: 20px;
  text-align: center;
  color: white;
  border-radius: 10px;
}

.default {
  background-color: #cdcdcd;
}

.skyblue {
  background-color: skyblue;
}

.primary {
  background-color: #ff464e;
}
```

在 `category.jsx` 页面中，引用 `zt-button`。

src\pages\category\index.jsx

```jsx
import { memo } from 'react'
import { View, Text } from '@tarojs/components'
import ZtButton from '@/components/zt-buttom'
import './index.less'

export default memo(() => {
	const handleZtButtonClick = () => {
		console.log('handleZtButtonClick')
	}

	return (
		<View className='category'>
			<Text>Hello Category!</Text>
			<ZtButton type='primary' ztButtonClick={handleZtButtonClick}>
				ZtButton
			</ZtButton>
		</View>
	)
})
```

# 二、跨端兼容方案

Taro 的设计初衷，就是为了统一跨平台；

即使 Taro 尽力通过运行时、抹平组件、API的多端差异；不同的平台之间，还是存在一些无法消除的差异；

为了更好的实现跨平台开发，Taro 提供了如下两种方案。

## 1.内置环境变量 

Taro 在编译时，提供了一些内置的环境变量，来区分不同环境，从而实现类似于条件编译的效果。

内置环境变量（`process.env.TARO_ENV`）可直接在代码中使用：
- 用于判断当前的编译平台类型，有效值为：`weapp` / `swan` / `alipay` / `tt` / `qq` / `jd` / `h5` / `rn`。 

通过这个变量来区分不同环境，从而使用不同的逻辑。 

在编译阶段，会移除不属于当前平台的代码，只保留当前平台的代码，例如：

:egg: 理解案例：

在 `category` 页面中，进行测试：

src\pages\category\index.jsx

```jsx
import { memo } from 'react'
import { View, Text } from '@tarojs/components'
import ZtButton from '@/components/zt-buttom'
// import ZtMultiButton from '@/components/zt-multi-buttom'
import './index.less'

export default memo(() => {
	const handleZtButtonClick = () => {
		if (process.env.TARO_ENV === 'h5') {
			console.log('h5 端 ZtButton 点击了~')
		}
		if (process.env.TARO_ENV === 'weapp') {
			console.log('weapp 端 ZtButton 点击了~')
		}
	}

	return (
		<View className='category'>
			<Text>Hello Category!</Text>
			<ZtButton type='primary' ztButtonClick={handleZtButtonClick}>
				ZtButton
			</ZtButton>
			{process.env.TARO_ENV === 'h5' ? (
				<>
					<View>h5 端专有组件</View>
					<ZtButton type='skyblue'>ZtButton h5</ZtButton>
				</>
			) : process.env.TARO_ENV === 'weapp' ? (
				<>
					<View>weapp 端专有组件</View>
					<ZtButton type='primary'>ZtButton weapp</ZtButton>
				</>
			) : (
				undefined
			)}
		</View>
	)
})
```

> 【注意】：环境变量 process.env 不能被解构。

由上述案例可知，内置环境变量方案，缺点是代码中会存在很多逻辑判断，造成代码的可读性和可维护性降低了；

为了解决这种问题，Taro 提供了另外一种方案作为补充。

## 2.统一接口的多端文件

多端文件，采用”[原文件名] + [端类型]（`process.env.TARO_ENV` 的取值）“的命名形式；

各端的文件代码，对外保持统一接口，引用时，仍然 `import` 原文件名即可。

Taro 在编译时，根据当前编译到的平台类型，加载对应跨端的文件；


统一接口的多端文件这一跨平台兼容写法有如下三个使用要点： 
- 不同端的对应文件一定要统一接口和调用方式。 
- 引用文件的时候，只需写默认文件名，不用带文件后缀。 
- 最好有一个平台无关的默认文件，这样在使用 TS 的时候也不会出现报错。

常见有以下使用场景： 
- 多端组件（属性，方法，事件等需统一） 
	- 针对不同的端写不同的组件代码
- 多端脚本逻辑（属性、方法等需统一）
	- 针对不同的端写不同的脚本逻辑代码

:egg:理解案例（多端组件）：

创建 `zt-multi-button` 组件，在其中创建 `index.jsx`、`index.h5.jsx`、`index.weapp.jsx` 三个文件;


src\components\zt-multi-button\index.jsx

```jsx
import { View } from '@tarojs/components'
import classNames from 'classnames'
import proptypes from 'proptypes'
import { memo } from 'react'
import styles from './index.modules.less'

const ZtMultiButtom = memo((props) => {
  const { type = 'default', ztButtonClick } = props

  const onBtnClick = () => {
    console.log('zt-multi-button 按钮店家了');
    ztButtonClick && ztButtonClick()
  }

  return (
    <View className={classNames(styles['zt-button'], styles[type])} onClick={onBtnClick}>
      {props.children}
    </View>
  )
})

ZtMultiButtom.propTypes = {
  type: proptypes.string,
  onBtnClick: proptypes.func
}

export default ZtMultiButtom
```

src\components\zt-multi-button\index.h5.jsx

```jsx
//...
const onBtnClick = () => {
  console.log('h5 端的 zt-multi-button 点击了'); // h5 端，打印了
  ztButtonClick && ztButtonClick()
}
//...
```

src\components\zt-multi-button\index.weapp.jsx

```jsx
//...
const onBtnClick = () => {
  console.log('weapp 端的 zt-multi-button 点击了'); // weapp 端打印了
  ztButtonClick && ztButtonClick()
}
//...
```

在 `cross-platform` 页面中引用：

src\pages\category\index.jsx

```jsx
import { memo } from 'react'
import { View } from '@tarojs/components'
import ZtMultiButton from '@/components/zt-multi-button'
import './index.less'

export default memo(() => {

	return (
		<View className='category'>

      <View>统一接口的多端文件</View>
      <ZtMultiButton type="skyblue">
        ZtMultiButton
      </ZtMultiButton>
		</View>
	)
})
```

:egg:理解案例（多端脚本逻辑）：

在工具函数中，也可以使用统一端口的多段文件方案：

新建工具 `set-title`

src\utils\set-title\index.js

```js
import Taro from '@tarojs/taro';

export default function () {
  Taro.setNavigationBarTitle({
    title: '与平台无关的标题'
  })
}
```

src\utils\set-title\index.h5.js

```js
export default function () {
  document.title = 'h5 平台的标题'
}
```

src\utils\set-title\index.weapp.js

```js
export default function () {
  wx.setNavigationBarTitle({
    title: 'weapp 平台的标题'
  })
}
```

在 `category` 中，引用工具函数。

src\pages\category\index.jsx

```jsx
import { memo } from 'react'
import { View } from '@tarojs/components'
import ZtMultiButton from '@/components/zt-multi-button'
import setTitle from '@/utils/set-title'
import './index.less'

export default memo(() => {

  const hadnleZtMultiButtonClick = () => {
    setTitle();
  }

	return (
		<View className='category'>
      <View>统一接口的多端文件</View>
      <ZtMultiButton type="skyblue" ztButtonClick={hadnleZtMultiButtonClick}>
        ZtMultiButton
      </ZtMultiButton>
		</View>
	)
})
```

# 三、Redux 状态管理

> 【回顾】：Redux 的使用。

早期使用 redux 时，通常会将 redux 代码拆分在多个文件中；

- 比如：`constants.ts`、`action.ts`、`reducer.ts` 等 

这种代码组织方式过于繁琐和麻烦，导致代码量过多，也不利于后期管理。并且 `createStore` 方法已标为过时，

Redux Toolkit 是目前官方推荐的编写 Redux 逻辑的方案。 为了解决上述问题而诞生。 

安装 Redux 和 Redux Toolkit：

```shell
npm install @reduxjs/toolkit react-redux
```

Redux Toolkit 的核心 API 主要是如下几个： 

`configureStore`：包装 `createStore` 以提供简化的配置选项和良好的默认值，有以下属性：

- `reducer`：可自动组合 slice reducer 
- `middleware`：可添加其它 Redux 中间件（默认包含 redux-thunk）。
- `devTools`：默认启用 Redux DevTools Extension

`createSlice`：接受”切片名称“、”初始状态值“和”reducer 函数对象“，自动生成切片 reducer，且带有相应的 actions。 

`createAsyncThunk`: 接受一个动作类型字符串和一个返回承诺的函数：

- 生成一个 `pending` / `fulfilled` / `rejected` 基于该承诺分派 actioos 类型的 thunk。
- 专门用来处理异步 Action。

:egg:案例理解：

创建 home reducers

src\store\modules\home.js

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHomeMutidata } from "@/service/home";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    counter: 800,
    homeData: null,
  },
  reducers: {
    incrementAction(state, action) {
      const { payload } = action;
      state.counter += payload;
    },
    decrementAction(state, action) {
      const { payload } = action;
      state.counter -= payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeMutiDataAction.fulfilled, (state, action) => {
      const { payload } = action;
      state.homeData = payload.data;
    });
  },
});

export const { incrementAction, decrementAction } = homeSlice.actions;
export default homeSlice.reducer;

// 异步 action
export const fetchHomeMutiDataAction = createAsyncThunk(
  "home/multidata", // action type 的前缀
  async () => {
    const res = await getHomeMutidata();
    console.log("res=>", res);
    return res;
  }
);
```

src\store\index.js

```js
import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./modules/home";

const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});

export default store;
```

使用 `<Provider>` 组件，提供 store。

src\app.js

```jsx
<Provider store={store}>
  {this.props.children}
</Provider>
```

在 `cart` 页面中，测试派发同步 action 和异步 action，

src\pages\cart\index.jsx

```jsx
import { memo } from 'react'
import { View, Text, Button } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { decrementAction, fetchHomeMutiDataAction, incrementAction } from '@/store/modules/home'
import './index.less'

export default memo(() => {

  const counter = useSelector(state => state.home.counter)

  const dispatch = useDispatch()

  const onAddBtnClick = () => dispatch(incrementAction(1))
  const onSubBtnClick = () => dispatch(decrementAction(1))

  const onFetchDataBtnClick = () => dispatch(fetchHomeMutiDataAction())

  return (
    <View className='cart'>
      <Text>{counter}</Text>
      <Button onClick={onAddBtnClick}>+1</Button>
      <Button onClick={onSubBtnClick}>-1</Button>
      <Button onClick={onFetchDataBtnClick}>getHomeMutiData</Button>
    </View>
  )
})
```



