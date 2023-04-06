import { memo } from 'react'
import { View, Image } from '@tarojs/components'
import PropTypes from 'proptypes'
import styles from './index.module.less'

const HomePopular = memo(function (props) {
	const { populars } = props

	return (
		<View className={styles['home-popular']}>
			{populars.map(item => {
				return (
					<Image
						key={item.id}
						className={styles['popular-img']}
						src={item.pic}
						mode='widthFix'
					></Image>
				)
			})}
		</View>
	)
})

HomePopular.propTypes = {
	populars: PropTypes.array
}

export default HomePopular
