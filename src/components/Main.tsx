import { Route, Switch } from 'wouter'

import Container from './Container'

const { VITE_DESCRIPTION } = import.meta.env

export default function Main() {
  return (
    // header and footer are 56px + 1px border
    <Container as="main" className="min-h-[calc(100vh_-_114px)] flex-col" border>
      <Switch>
        <Route path="/">
          <p>{VITE_DESCRIPTION}</p>
        </Route>
        <Route>
          <h1 className="text-xl font-semibold">Not Found</h1>
        </Route>
      </Switch>
    </Container>
  )
}
