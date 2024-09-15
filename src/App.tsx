import StoreClearancesComponent from "./components/storeClearances";
import TokenInputComponent from "./components/tokenInput";
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
      <Toaster
      position="bottom-center" 
      toastOptions={{
        className:'bg-base-300 text-content',
      }
      }
      />
      <TokenInputComponent></TokenInputComponent>
      <StoreClearancesComponent></StoreClearancesComponent>
    </div>
  )
}

export default App
