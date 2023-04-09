# 一、项目初始化

## 1.项目创建

创建项目 `02-juanpi`

```shell
npx @tarojs/cli init 02-juanpi
```

## 2.安装依赖

安装以下依赖：

_@reduxjs/toolkit_、_react-redux_、_classnames_、_proptypes_、_prettier_

```shell
pnpm add @reduxjs/toolkit react-redux

pnpm add classnames

pnpm add proptypes

pnpm add prettier -D

pnpm add eslint-plugin-prettier eslint-config-prettier -D
```

## 3.基本配置

在 `config/index.js` 中，

配置项目路径别名（参考前文配置）

config\index.js

```js
import path from 'path'

const config = {
  //...
  alias: {
    '@': path.resolve(__dirname, '..', 'src')
  }
}
```

启用 webpack 持久化缓存配置（新版无需启用，否则可能报错）。

config\index.js

```js
const config = {
  //...
  cache: {
    enable: true // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  }
}
```

小程序、h5 段，启用 css modules；

config\index.js

```js
const config = {
  mini: {
    postcss: {
      //...
      cssModules: {
        enable: true // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  },
  h5: {
    //...
    postcss: {
      //...
      cssModules: {
        enable: true // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  }
}
```

小程序引入本地文件，自动转 base64，最大文件大小配置。

config\index.js

```js
const config = {
  mini: {
    postcss: {
      url: {
        enable: true,
        config: {
          maxSize: 200
        }
      }
    }
  }
}
```

消除项目配置文件中的报错（参考前文配置）。

在 `project.config.json` 中，配置小程序的 `appid`。

## 4.资源引入

在 `src/assets  ` 目录下，引入 `image` 和 `css` 等资源。

## 5.页面创建

在 `app.jsx` 中，保留类组件，其它页面或组件，使用函数式组件编写，

创建 `home`，`category`，`cart`，`profile` 页面，作为 tabbar 页面。

创建 `detail` 页面，作为商品详情页。

```shell
Taro create --name home
Taro create --name category
Taro create --name cart
Taro create --name profile

Taro create --name detail
```

## 6.全局配置

在 `app.config.js` 中，

配置窗口 `window`（仅在小程序中有效），配置 `tabbar`。

src\app.config.js

```js
export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/category/index',
    'pages/cart/index',
    'pages/profile/index',
    'pages/detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#ff464e',
    navigationBarTitleText: '首页',
    navigationBarTextStyle: 'white'
  },
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
        text: '我的',
        pagePath: 'pages/profile/index',
        iconPath: 'assets/images/tabbar/profile.png',
        selectedIconPath: 'assets/images/tabbar/profile_active.png'
      }
    ]
  }
})
```

重启项目服务。

# 二、网络请求

将之前封装好的网络请求，放入项目中。

src\service\index.js

```js
import Taro from '@tarojs/taro'

const BASE_URL = 'http://codercba.com:9060/juanpi/api'
const TIME_OUT = 10000

class ZtRequest {
  request(url, method, data) {
    return new Promise((resolve, reject) => {
      Taro.request({
        url: BASE_URL + url,
        timeout: TIME_OUT,
        method,
        data,
        success: res => {
          resolve(res.data)
        },
        fail: reject
      })
    })
  }

  get(url, params) {
    return this.request(url, 'GET', params)
  }

  post(url, data) {
    return this.request(url, 'POST', data)
  }
}
export default new ZtRequest()
```

封装 `getHomeInfoData` 网络请求。

src\service\home.js

```js
import ztRequest from './index'

// 1.拿到首页bannber的数据
export const getHomeInfoData = () => {
  return ztRequest.get('/homeinfo', {})
}
```

# 三、状态管理

使用 redux 创建 store。

src\store\index.js

```js
import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './modules/home.js'

const store = configureStore({
  reducer: {
    home: homeReducer
  }
})
export default store
```

创建 home reducer。

src\store\modules\home.js

```js
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    banners: []
  }
})

// 同步的action
export default homeSlice.reducer
```

# 四、home 页面

## 1.home-search 组件

在 `home` 中，创建 `home-search` 组件。

编写内容和样式。

src\pages\home\cpns\home-search\index.jsx

```jsx
import { memo } from 'react'
import { View, Image, Text } from '@tarojs/components'
import LeftSearchImg from '@/assets/images/search_icon.png'
import RigthSearchImg from '@/assets/images/search.png'
import styles from './index.module.less'

const HomeSearch = memo(() => {
  return (
    <View className={styles['home-search']}>
      {/* 左侧区域 */}
      <View className={styles['search-panel']}>
        {/* 搜索图标 */}
        <Image className={styles['left-search-img']} src={LeftSearchImg} mode='widthFix'></Image>
        {/* 搜索框 */}
        <View className={styles['name']}>
          商品<Text className={styles['sub-name']}></Text>
        </View>
      </View>

      {/* 右测图标 */}
      <Image className={styles['right-search-img']} src={RigthSearchImg} mode='widthFix'></Image>
    </View>
  )
})

HomeSearch.propTypes = {}

export default HomeSearch
```

编写样式。

src\pages\home\cpns\home-search\index.module.less

## 2.home-banner 组件

在 home reducer 中，创建 `fetchHomeInfoDataAction` 异步 action。

src\store\modules\home.js

```js
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    banners: []
  },
  extraReducers: builder => {
    builder.addCase(fetchHomeInfoDataAction.fulfilled, (state, { payload }) => {
      state.banners = payload.adsInfo.slide_ads.config.slide || []
    })
  }
})

// 1.创建异步的action
export const fetchHomeInfoDataAction = createAsyncThunk(
  'home/info',
  async (payload, { dispatch, getState }) => {
    const res = await getHomeInfoData()
    return res.data
  }
)

export default homeSlice.reducer
```

在 `home` 中，派发 action。

src\pages\home\index.jsx

```jsx
const Home = memo(function () {
  // 获取 banner 的数据
  useLoad(() => {
    // 获取 banner 的数据
    dispatch(fetchHomeInfoDataAction())
  })
})
```

在 `home` 中，创建 `home-banner` 组件。用于展示轮播图。

src\pages\home\cpns\home-banner\index.jsx

```jsx
import { memo } from 'react'
import { Swiper, SwiperItem, Image } from '@tarojs/components'
import PropTypes from 'proptypes'
import styles from './index.module.less'

const HomeBanner = memo(function (props) {
  const { banners } = props
  return (
    <Swiper
      className={styles['home-banner']}
      indicatorDots
      indicatorColor='#999'
      indicatorActiveColor='#ff464e'
      autoplay
      interval={3000}
    >
      {banners.map(item => (
        <SwiperItem key={item.id}>
          <Image className={styles['banner-img']} src={item.pic} mode='widthFix'></Image>
        </SwiperItem>
      ))}
    </Swiper>
  )
})

HomeBanner.propTypes = {
  banners: PropTypes.array
}

export default HomeBanner
```

src\pages\home\index.jsx

```jsx
const Home = memo(function () {
  const dispatch = useDispatch()

  const { banners } = useSelector(state => ({
    banners: state.home.banners
  }))

  // 页面的生命周期
  useLoad(() => {
    // 获取 banner 的数据
    dispatch(fetchHomeInfoDataAction())
  })

  return (
    <View className={styles['home']}>
      <HomeBanner banners={banners}></HomeBanner>
    </View>
  )
})
```

## 3.home-popular 组件

在 home reducer 中，封装 `fetchHomeRecommendDataAction` 异步 action；

在 store 中，保存 `recommends` 和 `populars` 数据。

src\store\modules\home.js

```js
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    populars: [],
    recommend: null
  },
  extraReducers: builder => {
    builder.addCase(fetchHomeRecommendDataAction.fulfilled, (state, { payload }) => {
      state.populars = payload.populars || []
      state.recommend = payload.recommend || null
    })
  }
})

export const fetchHomeRecommendDataAction = createAsyncThunk('home/recommend', async () => {
  const res = await getRecommendData()
  return res.data
})
```

在 `home` 中，派发该异步 action。获取到 `recommends` 和 `populars` 数据。

src\pages\home\index.jsx

```jsx
const Home = memo(function () {
  const dispatch = useDispatch()

  // 2.从 redux store 中读取数据
  const { populars, recommend } = useSelector(state => ({
    populars: state.home.populars,
    recommend: state.home.recommend,
  }))

  useLoad(() => {
    dispatch(fetchHomeRecommendDataAction())
  })

  return (
    <View className={styles['home']}>
      <!-- ... -->
      <HomePopular populars={populars}></HomePopular>
      <HomeRecommend recommend={recommend}></HomeRecommend>
    </View>
  )
})
```

在 `home` 中，创建 `home-popular` 组件，用于编写热门区域的四张图片。

src\pages\home\cpns\home-popular\index.jsx

```jsx
import { memo } from 'react'
import { View, Image } from '@tarojs/components'
import PropTypes from 'proptypes'
import styles from './index.module.less'

const HomePopular = memo(function (props) {
  const { populars } = props

  return (
    <View className={styles['home-popular']}>
      {populars.map(item => (
        <Image
          key={item.id}
          className={styles['popular-img']}
          src={item.pic}
          mode='widthFix'
        ></Image>
      ))}
    </View>
  )
})

HomePopular.propTypes = {
  populars: PropTypes.array
}

export default HomePopular
```

## 4.home-recommend 组件

在 `home` 中，创建 `home-recommend` 组件，用于展示推荐区域的六张图片。

src\pages\home\cpns\home-recommend\index.jsx

```jsx
import { memo } from 'react'
import { View, Image } from '@tarojs/components'
import PropTypes from 'proptypes'
import styles from './index.module.less'

const HomeRecommend = memo(function (props) {
  const { recommend } = props
  if (!recommend) return

  return (
    <View className={styles['home-recommend']}>
      {/* 顶部 */}
      <Image
        className={styles['ad-big-top-pic']}
        src={recommend.ad_big_top.pic}
        mode='widthFix'
      ></Image>

      {/* 中间 */}
      <View className={styles['recommend-item']}>
        {/* 品牌清货 */}
        <Image className={styles['ad-left']} src={recommend.ad_left.pic} mode='widthFix'></Image>
        <View className={styles['ad-right']}>
          {/* 限量快抢 */}
          <Image
            className={styles['ad-right-pic1']}
            src={recommend.ad_right1.pic}
            mode='widthFix'
          ></Image>
          <Image
            className={styles['ad-right-pic2']}
            src={recommend.ad_right2.pic}
            mode='widthFix'
          ></Image>
        </View>
      </View>

      {/* 底部 */}
      <Image
        className={styles['ad-big-top-pic']}
        src={recommend.ad_big_bottom.pic}
        mode='widthFix'
      ></Image>
      <Image
        className={styles['ad-big-top-pic']}
        src={recommend.choiceness.pic}
        mode='widthFix'
      ></Image>
    </View>
  )
})

HomeRecommend.propTypes = {
  recommend: PropTypes.object
}

export default HomeRecommend
```

## 5.tab-control 组件

在 `home` 中，编写下方商品列表区域：

在 `src/components` 目录下，创建 `tab-control` 组件，用于展示选项卡。

src\components\tab-control\index.jsx

```jsx
import { memo, useState } from 'react'
import { View } from '@tarojs/components'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import styles from './index.module.less'

const TabControl = memo(function (props) {
  const { titles, onTabClick } = props
  const [currentIndex, setCurrentIndex] = useState(0)
  function handleTabItemClick(index) {
    setCurrentIndex(index)
    onTabClick && onTabClick(index)
  }
  return (
    <View className={styles['tab-control']}>
      {titles.map((title, index) => (
        <View
          className={classNames(styles['tab-item'], currentIndex === index ? styles['active'] : '')}
          key={title}
          onClick={() => handleTabItemClick(index)}
        >
          {title}
        </View>
      ))}
    </View>
  )
})

TabControl.propTypes = {
  titles: PropTypes.array,
  onTabClick: PropTypes.func
}

export default TabControl
```

## 6.grid-view 组件

封装获取商品列表的网络请求，并在 home reducer 中，封装异步的 action；

将“精选专场”和“精选单品”的商品数据，保存到 store 中 `goodList`。动态生成 `goodList`。

src\store\modules\home.js

```js
function getDefaultGoodsList() {
  const goodsListOrigin = {}
  tabTypes.forEach(item => {
    goodsListOrigin[item] = { page: 0, list: [] }
  })
  return goodsListOrigin
}

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    //...
    goodsList: getDefaultGoodsList()
    // goodsList: {
    //   specific: {
    //     // 精选专场
    //     page: 0,
    //     list: [],
    //   },
    //   single: {
    //     // 精选单品
    //     page: 0,
    //     list: [],
    //   },
    // },
  },
  extraReducers: builder => {
    builder
      //...
      .addCase(fetchHomeGoodsDataAction.fulfilled, (state, { payload }) => {
        const { type, page, goods } = payload
        if (goods && goods.length) {
          state.goodsList[tabTypes[type]].list = [
            ...state.goodsList[tabTypes[type]].list, // old goods
            ...goods // new goods
          ]
          state.goodsList[tabTypes[type]].page = page
        }
      })
  }
})

//...

// 异步的 action:  fetchHomeGoodsDataAction({type: 0, page: 1})
export const fetchHomeGoodsDataAction = createAsyncThunk(
  'home/goods', // 会用在异步action的type名的前缀
  async payload => {
    const { type, page } = payload // {type: 0, page: 1}
    // type, // 0 -> 精选专场 ; 1 -> 精选单品
    // page, 默认为 1 ,拿到第一页的数据
    const res = await getGoodsData(type, page)
    return {
      goods: res.data.goods,
      type,
      page
    }
  }
)
```

在 `home` 中派发 action。

src\pages\home\index.jsx

```jsx
const Home = memo(function () {

  const dispatch = useDispatch()

  // 2.从redux store中读取数据
  const { goodsList } = useSelector(state => ({
    goodsList: state.home.goodsList
  }))

  // 页面的生命周期
  useLoad(() => {
    //...
    dispatch(fetchHomeGoodsDataAction({ type: 0, page: 1 }))
    dispatch(fetchHomeGoodsDataAction({ type: 1, page: 1 }))
  })

  return (
    <View className={styles['home']}>
      <!-- ... -->
      <TabControl titles={['精选专场', '精选单品']} onTabClick={handleTabItemClick}></TabControl>
      {/* <GridView goods={goodsList["single"].list}></GridView> */}
      <GridView goods={goodsList[currentTabName].list}></GridView>
    </View>
  )
  })
```

在 `src/components` 目录下，创建 `grid-view` 组件，用于展示商品列表。

src\components\grid-view\index.jsx

```jsx
import { memo } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import PropTypes from 'proptypes'
import styles from './index.module.less'
import GridViewItem from '../grid-view-item'

const GridView = memo(function (props) {
  const { goods } = props
  function handleItemClick(goodInfo) {
    console.log(goodInfo)
    Taro.navigateTo({
      url: '/pages/detail/index?link=' + goodInfo.goods_jump_url
    })
  }
  return (
    <View className={styles['grid-view']}>
      {goods.map(goodInfo => (
        <View className={styles['item']} key={goodInfo.goods_id}>
          <GridViewItem goodInfo={goodInfo} onItemClick={handleItemClick}></GridViewItem>
        </View>
      ))}
    </View>
  )
})

GridView.propTypes = {
  goods: PropTypes.array
}

export default GridView
```

### 1.grid-view-item 组件

在 `src/components` 目录下，创建 `grid-view-item` 组件，在 `grid-view` 中引用，用于展示商品 item。

src\components\grid-view-item\index.jsx

```jsx
import { memo } from 'react'
import { View, Image, Text } from '@tarojs/components'
import PropTypes from 'proptypes'
import styles from './index.module.less'

const GridViewItem = memo(function (props) {
  const { goodInfo, onItemClick } = props

  function handleItemClick() {
    onItemClick && onItemClick(goodInfo)
  }
  return (
    <View className={styles['grid-view-item']} onClick={handleItemClick}>
      <Image className={styles['item-img']} src={goodInfo.pic_url} mode='widthFix'></Image>

      <View className={styles['item-price']}>
        <Text className={styles['price']}>{goodInfo.coupon_tips}</Text>
        <Image className={styles['logo']} src={goodInfo.logo_url} mode='widthFix'></Image>
      </View>

      <View className={styles['item-title']}>
        <Text className={styles['title']}>{goodInfo.title}</Text>
        <Text className={styles['tips']}>{goodInfo.time_left}</Text>
      </View>
    </View>
  )
})

GridViewItem.propTypes = {
  goodInfo: PropTypes.object,
  onItemClick: PropTypes.func
}

export default GridViewItem
```

## 7.选项卡切换

在 home reducer 中，维护一个 `currentTab` 状态。

src\store\modules\home.js

```js
export const tabTypes = ['specific', 'single']

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    currentTabName: tabTypes[0] // specific
  },
  reducers: {
    setCurrentTabName(state, action) {
      const { payload } = action
      state.currentTabName = payload // payload = specific | single
    }
  }
})
```

在 `home` 中，监听 `tab-control` 组件点击，改变 `currentTabName` 状态，和商品列表数据。

src\pages\home\index.jsx

```jsx
const Home = memo(function () {
  const dispatch = useDispatch()

  // 2.从redux store中读取数据
  const { currentTabName, goodsList } = useSelector(state => ({
    currentTabName: state.home.currentTabName, // specific
    goodsList: state.home.goodsList
  }))

  // 页面的生命周期
  useLoad(() => {
    // type, // 0 -> 精选专场 ; 1 -> 精选单品
    // page, 默认为 1 ,拿到第一页的数据
    dispatch(fetchHomeGoodsDataAction({ type: 0, page: 1 }))
    dispatch(fetchHomeGoodsDataAction({ type: 1, page: 1 }))
  })

  function handleTabItemClick(index) {
    // 触发一个同步的action
    dispatch(setCurrentTabName(tabTypes[index]))
  }

  return (
    <View className={styles['home']}>
      <TabControl titles={['精选专场', '精选单品']} onTabClick={handleTabItemClick}></TabControl>
      <GridView goods={goodsList[currentTabName].list}></GridView>
    </View>
  )
})
```

## 8.下拉加载更多

在 `home` 中，监听触底事件，加载下一页商品数据。

src\pages\home\index.jsx

```jsx
const Home = memo(function () {
  //...
  useReachBottom(() => {
    // 获取当前商品类型的下一页
    const nextPage = goodsList[currentTabName].page + 1
    const currentType = tabTypes[0] === currentTabName ? 0 : 1 // specific = 0 | single =1
    dispatch(fetchHomeGoodsDataAction({ type: currentType, page: nextPage }))
  })
  //...
})
```

## 9.页面跳转

创建 `detail` 页面。

src\pages\detail\index.jsx

```jsx
import { memo, useState } from 'react'
import { WebView } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'

const Detail = memo(() => {
  const [link, setLink] = useState(null)

  useLoad(options => {
    setLink(options.link)
  })

  return <WebView src={link}></WebView>
})

export default Detail
```

在 `grid-view` 中，监听 `grid-view-item` 点击（非必要，用于练习事件传递）；

跳转到 `detail` 页面，并传递 `WebView` 的 `url`。

src\components\grid-view-item\index.jsx

```jsx
const GridViewItem = memo(function (props) {
  const { goodInfo, onItemClick } = props

  function handleItemClick() {
    onItemClick && onItemClick(goodInfo)
  }
  return (
    <View className={styles['grid-view-item']} onClick={handleItemClick}>
      <!--...-->
    </View>
  )
})
```

src\components\grid-view\index.jsx

```jsx
const GridView = memo(function (props) {
  //...
  function handleItemClick(goodInfo) {
    console.log(goodInfo)
    Taro.navigateTo({
      url: '/pages/detail/index?link=' + goodInfo.goods_jump_url
    })
  }
	return (
		<View className={styles['grid-view']}>
      <!--...-->
      <GridViewItem goodInfo={goodInfo} onItemClick={handleItemClick}></GridViewItem>
      <!--...-->
		</View>
	)
})
```

# 五、项目打包部署

多端同步调试，在 `dist` 目录下，创建一个与打包的目标平台，同名的目录，并将结果放在这个目录下；

- 例如：微信小程序，打包在 `dist/weapp` 目录下； H5 打包在 `dist/h5` 目录下；

只有这样，各个平台才能在打包后，使用独立的目录互不影响，从而达到多端同步调试的目的；

在 `config/index.js` 配置如下：

```js
const config = {
  //...
  outputRoot: `dist/${process.env.TARO_ENV}`
}
```

浏览器端打包：

```shell
npm run build:h5
```

微信小程序打包：

```shell
npm run build:weapp
```

还要修改 `project.config.json` 中的配置。

```json
{
  "miniprogramRoot": "./dist/weapp/"
}
```

微信开发者工具，打开 weapp 目录进行预览或发包。
