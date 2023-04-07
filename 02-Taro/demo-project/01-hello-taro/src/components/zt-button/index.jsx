import { View } from '@tarojs/components'
import { useReady, useDidShow, useLoad } from '@tarojs/taro'
import classNames from 'classnames'
import proptypes from 'proptypes'
import { memo, useEffect } from 'react'
import styles from './index.modules.less'

const ZtButtom = memo(props => {
  const { type = 'default', ztButtonClick } = props

  const onBtnClick = () => {
    ztButtonClick && ztButtonClick()
  }

  // 组件生命周期
  useEffect(() => {
    console.log('zt-button 挂在完成~')
    return () => {
      console.log('zt-button 即将卸载')
    }
  }, [])

  // 页面的生命周期
  useLoad(() => {
    console.log('zt-button useLoad')
  })

  useDidShow(() => {
    console.log('zt-button useDidShow')
  })

  useReady(() => {
    console.log('zt-button useReady')
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
