import { Router } from 'wouter'

import Header from './components/Header'
import Main from './components/Main'

const { PROD, VITE_HOMEPAGE } = import.meta.env
const base = VITE_HOMEPAGE ? new URL(VITE_HOMEPAGE).pathname : '/'

export default function App() {
  return (
    <Router base={PROD && base !== '/' ? base : undefined}>
      <Header />
      <Main />
    </Router>
  )
}
