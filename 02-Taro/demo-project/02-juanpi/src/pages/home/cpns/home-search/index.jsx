import { memo } from 'react'
import { View, Image, Text } from '@tarojs/components'

import LeftSearchImg from '@/assets/images/search_icon.png'
import RigthSearchImg from '@/assets/images/search.png'
import styles from './index.module.less'

const HomeSearch = memo(function () {
  return (
    <View className={styles['home-search']}>
      <View className={styles['search-panel']}>
        <Image className={styles['left-search-img']} src={LeftSearchImg} mode='widthFix'></Image>
        <View className={styles['name']}>
          商品<Text className={styles['sub-name']}>搜索</Text>
        </View>
      </View>
      <Image className={styles['right-search-img']} src={RigthSearchImg} mode='widthFix'></Image>
    </View>
  )
})
export default HomeSearch
