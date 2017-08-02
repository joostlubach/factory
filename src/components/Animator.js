// @flow

import React from 'react'
import PropTypes from 'prop-types'
import {jss, layout, colors} from '../styles'
import {Block} from '.'

export type Props = {
	showFPS:   boolean,
	children?: any
}

export const defaultProps = {
	showFPS: false
}

type State = {
	running: boolean,
	fps:     number
}

const FPS_CALCULATION_WINDOW = 10

export default class Animator extends React.Component<typeof defaultProps, Props, State> {

	props: Props
	static defaultProps = defaultProps

	state: State = {
		running: false,
		fps:     0
	}

	static childContextTypes = {
		registerBlock:   PropTypes.func,
		unregisterBlock: PropTypes.func
	}

	nextFrame: ?number = null
	startedAt = new Date()
	previousFramesAt: Date[] = []

	blocks: Set<Block> = new Set()

	getChildContext() {
		return {
			registerBlock:   (block: Block) => { this.blocks.add(block) },
			unregisterBlock: (block: Block) => { this.blocks.delete(block) }
		}
	}

	start() {
		this.startedAt = new Date()

		this.requestNextFrame()
		this.setState({running: true})
	}

	stop() {
		this.cancelNextFrame()
		this.setState({running: false, fps: 0})
	}

	requestNextFrame() {
		this.nextFrame = requestAnimationFrame(() => {
			const now = new Date()
			const t = now - this.startedAt

			this.setState({fps: this.calculateFPS(now)})

			this.blocks.forEach(block => { block.onFrame(t) })
			this.requestNextFrame()
		})
	}

	cancelNextFrame() {
		if (this.nextFrame == null) { return }

		cancelAnimationFrame(this.nextFrame)
		this.nextFrame = null
	}

	calculateFPS(now: Date): number {
		this.previousFramesAt.push(now)
		while (this.previousFramesAt.length > FPS_CALCULATION_WINDOW) {
			this.previousFramesAt.shift()
		}
		if (this.previousFramesAt.length < 2) {
			return 0
		}

		const totalInterval = this.previousFramesAt[this.previousFramesAt.length - 1] - this.previousFramesAt[0]
		const averageInterval = totalInterval / this.previousFramesAt.length
		return 1000 / averageInterval
	}

	componentDidMount() {
		this.start()
	}

	componentWillUnmount() {
		this.stop()
	}

	render() {
		const {showFPS} = this.props
		const {running, fps} = this.state

		const fpsLabel = fps.toFixed(0)
		
		return (
			<div className={$.animator}>
				{this.props.children}
				{showFPS && running && <span className={$.fps}>{fpsLabel} FPS</span>}
			</div>
		)
	}

}

const $ = jss({

	animator: {
		position:      'relative',

		flexDirection: 'row',
    flexWrap:      'wrap' 
	},

	fps: {
		position: 'absolute',
		top:      0,
		right:    0,
		padding:  layout.padding.m,

		color: colors.fg.dim
	}

})