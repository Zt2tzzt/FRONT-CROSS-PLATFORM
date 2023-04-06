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
