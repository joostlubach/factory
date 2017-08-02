// @flow

import React from 'react'
import PropTypes from 'prop-types'
import type Sprite from './Sprite'

export type Props = {
	tx: number | (t: number) => number,
	ty: number | (t: number) => number,

	children?: any
}

export const defaultProps = {
	tx: 0,
	ty: 0
}

export default class CompoundSprite extends React.Component<typeof defaultProps, Props, void> {

	props: Props
	static defaultProps = defaultProps

	children: Set<Sprite | CompoundSprite> = new Set()

	static contextTypes = {
		registerSprite:   PropTypes.func,
		unregisterSprite: PropTypes.func,
	}

	static childContextTypes = {
		registerSprite:   PropTypes.func,
		unregisterSprite: PropTypes.func,
	}

	getChildContext() {
		return {
			registerSprite:   (sprite: Sprite | CompoundSprite) => { this.children.add(sprite) },
			unregisterSprite: (sprite: Sprite | CompoundSprite) => { this.children.delete(sprite) }
		}
	}

	componentDidMount() {
		const {registerSprite} = this.context
		if (registerSprite != null) {
			registerSprite(this)
		}
	}

	componentWillUnmount() {
		const {unregisterSprite} = this.context
		if (unregisterSprite != null) {
			unregisterSprite(this)
		}
	}

	render() {
		return this.props.children
	}

	drawFrame(context: DrawContext, t: number) {
		context.save()
		this.prepareContext(context, t)
		this.children.forEach(sprite => { sprite.drawFrame(context, t) })
		context.restore()
	}

	prepareContext(context: DrawContext, t: number) {
		let {tx, ty} = this.props
		if (tx instanceof Function) { tx = tx(t) }
		if (ty instanceof Function) { ty = ty(t) }

		context.translate(tx, ty)
	}

}