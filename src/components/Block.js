// @flow

import React from 'react'
import PropTypes from 'prop-types'
import {jss, layout} from '../styles'
import type Sprite from './Sprite'
import type CompoundSprite from './CompoundSprite'

export type Props = {
	children: Sprite[]
}

export default class Block extends React.Component<void, Props, State> {

	props: Props

	canvas: ?HTMLCanvasElement = null
	sprites: Set<Sprite | CompoundSprite> = new Set()

	static contextTypes = {
		registerBlock:   PropTypes.func,
		unregisterBlock: PropTypes.func,
	}

	static childContextTypes = {
		registerSprite:   PropTypes.func,
		unregisterSprite: PropTypes.func,
	}

	getChildContext() {
		return {
			registerSprite:   (sprite: Sprite | CompoundSprite) => { this.sprites.add(sprite); console.log(sprite) },
			unregisterSprite: (sprite: Sprite | CompoundSprite) => { this.sprites.delete(sprite) }
		}
	}

	onFrame(t: number) {
		const {canvas} = this
		if (canvas == null) { return }

		const context = canvas.getContext('2d')
		context.clearRect(0, 0, canvas.width, canvas.height)

		this.sprites.forEach(sprite => {
			sprite.drawFrame(context, t)
		})
	}

	componentDidMount() {
		this.scaleCanvas()

		const {registerBlock} = this.context
		if (registerBlock != null) {
			registerBlock(this)
		}
	}

	componentWillUnmount() {
		const {unregisterBlock} = this.context
		if (unregisterBlock != null) {
			unregisterBlock(this)
		}
	}

	scaleCanvas() {
		const {canvas} = this
		if (canvas == null) { return }

		const ratio = window.devicePixelRatio || 1
		canvas.getContext('2d').scale(ratio, ratio)
	}
	
	render() {
		return (
			<canvas
				ref={el => { this.canvas = el }}
				className={$.canvas}
				width={layout.block.width * (window.devicePixelRatio || 1)}
				height={layout.block.height * (window.devicePixelRatio || 1)}
			>
				{this.props.children}
			</canvas>
		)
	}

}

const $ = jss({

	canvas: {
		...layout.block
	}

})