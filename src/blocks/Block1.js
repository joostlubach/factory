// @flow

import React from 'react'
import {Block} from '../components'
import {Guy} from '../sprites'
import {layout} from '../styles'

export type Props = {
	
}

export default class Block1 extends React.Component<void, Props, void> {

	render() {
		return (
			<Block>
				<Guy x={layout.block.width / 2} y={layout.block.height - 64}/>
			</Block>
		)
	}

}