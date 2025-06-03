import './App.css'
import ApplicationProvider from './layouts/ApplicationProvider'
import { ErrorBoundary } from './providers/ErrorBoundary'

function App() {

  return (
    <>
      <ErrorBoundary>
        <ApplicationProvider />
      </ErrorBoundary>
    </>
  )
}

export default App
