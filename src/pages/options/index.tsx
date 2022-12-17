import { render } from 'solid-js/web'
import Options from './Options'
import '@src/index.css'

const appContainer = document.querySelector('#app-container')
if (!appContainer) {
  throw new Error('Can not find AppContainer')
}

render(Options, appContainer)
