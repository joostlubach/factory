// @flow

import React from 'react'
import {Animator} from './components'
import {Block1} from './blocks'
import {jss, colors, layout, fonts} from './styles'

export type Props = {}

export default class App extends React.Component<void, Props, void> {

  render() {
    return (
      <div className={$.app}>
        <Animator className={$.animator} showFPS>
          <Block1/>
        </Animator>
      </div>
    )
  }

}

const $ = jss({
  '@global': {
    html: {
      height: '100vh',
    },
    body: {
      height: '100vh',
      margin: 0,
      font:   fonts.normal
    }
  },

  app: {
    ...layout.overlay,
    background: colors.bg.light,
  },

  animator: {
    flex: [1, 0, 0],
  }

})