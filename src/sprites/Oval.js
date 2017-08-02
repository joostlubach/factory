// @flow

import React from 'react'
import {Sprite} from '../components'
import {colors} from '../styles'

export type Props = {
	cx: number,
	cy: number
} & ({r: number} | {rx: number, ry: number})

export default class Oval extends React.Component<void, Props, void> {

	props: Props

	render() {
		return <Sprite onDrawFrame={this.onDrawFrame}/>
	}

	onDrawFrame = (context: DrawContext, t: number) => {
		const {cx, cy} = this.props

		let rx, ry
		if ('r' in this.props) {
			rx = this.props.r
			ry = this.props.r
		} else {
			rx = this.props.rx
			ry = this.props.ry
		}

		context.fillStyle = colors.sprite.string()
		context.beginPath()
		context.ellipse(cx, cy, rx, ry, 0, 0, 2 * Math.PI)
		context.fill()
	}

}