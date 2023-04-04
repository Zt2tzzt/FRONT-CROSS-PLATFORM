import { memo } from 'react'
import { View, Text } from '@tarojs/components'
import ZtButton from '@/components/zt-button'
import ZtMultiButton from '@/components/zt-multi-button'
import setTitle from '@/utils/set-title'
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

  const hadnleZtMultiButtonClick = () => {
    setTitle();
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

      <View>统一接口的多端文件</View>
      <ZtMultiButton type="skyblue" ztButtonClick={hadnleZtMultiButtonClick}>
        ZtMultiButton
      </ZtMultiButton>
		</View>
	)
})
