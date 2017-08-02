// @flow

import React from 'react'
import PropTypes from 'prop-types'

export type Props = {
	onDrawFrame: (contet: DrawContext, t: number) => void
}

export default class Sprite extends React.Component<void, Props, void> {

	static contextTypes = {
		registerSprite:   PropTypes.func,
		unregisterSprite: PropTypes.func,
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
		return null
	}

	drawFrame(context: DrawContext, t: number) {
		this.props.onDrawFrame(context, t)
	}

}