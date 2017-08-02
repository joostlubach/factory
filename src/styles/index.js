// @flow

import JSS from 'jss'
let keyframesCounter = 0

// @flow
// @index: export * as ${variable} from ${relpath}

export * as colors from './colors'
export * as fonts from './fonts'
export * as layout from './layout'

// /index

export function jss(styles: Object) {
	const styleSheet = JSS.createStyleSheet(styles).attach()
	return styleSheet.classes
}

export function jssKeyframes(name: string, config: Object) {
	const key = `${name}-${++keyframesCounter}`

	const stylesheet = JSS.createStyleSheet({
		[`@keyframes ${key}`]: config
	})
	stylesheet.attach()

	return key
}