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
