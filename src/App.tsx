import './App.css'
import { ToastContainer } from './components/common/Toast'
import AppRoutes from './layouts/AppRoutes'

function App() {

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center w-full h-screen gap-4">
        <AppRoutes />
      </div>
    </>
  )
}

export default App
