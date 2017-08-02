// @flow

import React from 'react'
import {Sprite, CompoundSprite} from '../components'
import {Oval} from '.'

export type WalkingDirection = 'left' | 'right'

export type Props = Position & {
	walkingDirection: ?WalkingDirection	
}

export const defaultProps = {
	walkingDirection: 'left'
}

const width = 32

export default class Guy extends React.Component<*, Props, void> {

	props: Props
	static defaultProps = defaultProps

	nextDip = 500

	render() {
		const {x, y, walkingDirection} = this.props

		const ty = (t: number) => {
			if (t > this.nextDip + 100) {
				this.nextDip += 500
			}

			if (walkingDirection != null && t > this.nextDip && t < this.nextDip + 100) {
				return y - 1
			} else {
				return y
			}
		}

		return (
			<CompoundSprite tx={x} ty={ty}>
				<Oval key="head" cx={width / 2} cy={10} r={8}/>
				<Sprite key="body" onDrawFrame={this.onDrawBody}/>
				<Sprite key="arms" onDrawFrame={this.onDrawArms}/>
				<Sprite key="legs" onDrawFrame={this.onDrawLegs}/>
			</CompoundSprite>
		)
	}

	onDrawBody = (context: DrawContext) => {
		const y = 21
		const h = 24
		const inset = 8

		context.beginPath()
		context.moveTo(0, y)
		context.lineTo(width, y)
		context.lineTo(width - inset, y + inset)
		context.lineTo(width - inset, y + h)
		context.lineTo(inset, y + h)
		context.lineTo(inset, y + inset)
		context.closePath()
		context.fill()
	}

	onDrawArms = (context: DrawContext) => {
		const y = 21
		const h = 24
		const inset = 8

		context.beginPath()
		context.moveTo(2, y + 4)
		context.lineTo(inset - 2, y + inset)
		context.lineTo(inset - 2, y + h)
		context.lineTo(2, y + h)
		context.closePath()
		context.fill()

		context.beginPath()
		context.moveTo(width - 2, y + 4)
		context.lineTo(width - inset + 2, y + inset)
		context.lineTo(width - inset + 2, y + h)
		context.lineTo(width - 2, y + h)
		context.closePath()
		context.fill()
	}

	onDrawLegs = (context: DrawContext, t: number) => {
		const {walkingDirection} = this.props

		switch (walkingDirection) {
		case 'left':
			this.drawLegsWalkingLeft(context, t)
			break
		case 'right':
			// this.drawLegsWalkingRight(context, t)
			break
		default:
			this.drawLegsStraight(context)
		}
	}

	drawLegsStraight(context: DrawContext) {
		const w = 6
		const y = 47
		const h = 17
		const inset = 8

		context.beginPath()
		context.moveTo(inset, y)
		context.lineTo(inset + w, y)
		context.lineTo(inset + w, y + h)
		context.lineTo(inset, y + h)
		context.closePath()
		context.fill()

		context.beginPath()
		context.moveTo(width - inset, y)
		context.lineTo(width - inset - w, y)
		context.lineTo(width - inset - w, y + h)
		context.lineTo(width - inset, y + h)
		context.closePath()
		context.fill()
	}

	drawLegsWalkingLeft(context: DrawContext, t: number) {
		const y = 47
		const inset = 8
		const w = 6
		const h = 17
		const offset = 6

		const leftKneeY = Math.sin(t / 1000 * Math.PI * 2) * 3 + 9
		const leftFootX = Math.sin(t / 1000 * Math.PI * 2) * 3 - 1.5
		const leftFootY = Math.sin(t / 1000 * Math.PI * 2) * 3 - 1.5 + h

		const rightKneeY = Math.sin(t / 1000 * Math.PI * 2 + Math.PI) * 3 + 9

		context.beginPath()
		context.moveTo(inset, y)
		context.lineTo(inset + w, y)
		context.lineTo(inset + w - offset, y + leftKneeY)
		context.lineTo(inset + w + leftFootX, y + leftFootY)
		context.lineTo(inset + leftFootX, y + leftFootY)
		context.lineTo(inset - offset, y + leftKneeY)
		context.closePath()
		context.fill()

		context.beginPath()
		context.moveTo(width - inset, y)
		context.lineTo(width - inset - w, y)
		context.lineTo(width - inset - w - offset, y + rightKneeY)
		context.lineTo(width - inset - w, y + h)
		context.lineTo(width - inset, y + h)
		context.lineTo(width - inset - offset, y + rightKneeY)
		context.closePath()
		context.fill()
	}

}