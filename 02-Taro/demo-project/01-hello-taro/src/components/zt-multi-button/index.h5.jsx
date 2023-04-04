import { View } from '@tarojs/components'
import classNames from 'classnames'
import proptypes from 'proptypes'
import { memo } from 'react'
import styles from './index.modules.less'

const ZtMultiButtom = memo((props) => {
  const { type = 'default', ztButtonClick } = props

  const onBtnClick = () => {
    console.log('h5 端的 zt-multi-button 点击了');
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
