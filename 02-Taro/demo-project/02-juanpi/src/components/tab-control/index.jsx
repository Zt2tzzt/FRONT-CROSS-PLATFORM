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
