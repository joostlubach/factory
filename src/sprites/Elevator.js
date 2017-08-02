// @flow

import React from 'react'
import {Sprite} from '../components'

export type Props = Position & Size & {
	
}

export default class Elevator extends React.Component<void, Props, void> {

	props: Props

	render() {
		return (
			<Sprite onDrawFrame={this.onDrawFrame}/>
		)
	}

	onDrawFrame = (context: DrawContext, t: number) => {

	}

}