import { View } from '@tarojs/components'
import classNames from 'classnames'
import proptypes from 'proptypes'
import { memo } from 'react'
import styles from './index.modules.less'

const ZtMultiButtom = memo(props => {
  const { type = 'default', ztButtonClick } = props

  const onBtnClick = () => {
    console.log('zt-multi-button 按钮店家了')
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
