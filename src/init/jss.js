// @flow

import jss from 'jss'
import defaultPreset from 'jss-preset-default'
import Color from 'color'

jss.setup(defaultPreset())

// Automatically convert colors to strings.
jss.use({
	onCreateRule(name, decl, options) {
		function iterate(val) {
			// For some reason, "val instanceof Color" does not work (anymore).
			if (val instanceof Object && 'color' in val && typeof val.model === 'string') {
				// Something odd is going on, Color objects are converted to plain objects, and when `extend:` is used,
				// the colors are converted to strings. We need to convert back into a color.
				const {color, model, valpha} = val
				const vals = color.map(rgb => parseFloat(rgb))
				return Color[model](vals).alpha(valpha).string()
			} else if (val instanceof Array) {
				return val.map(iterate)
			} else if (val instanceof Object) {
				const res = {}
				for (let key in val) {
					res[key] = iterate(val[key])
				}
				return res
			} else {
				return val
			}
		}

		for (const prop in decl) {
			decl[prop] = iterate(decl[prop])
		}
	}
})