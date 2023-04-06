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
