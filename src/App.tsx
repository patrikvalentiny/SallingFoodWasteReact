import { Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import HomePage from "./pages/homePage";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'bg-base-300 text-white text-base-content',
        }
        }
      />
    </div>
  )
}

export default App
