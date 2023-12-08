import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import 'reactflow/dist/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { WebGPUDevice } from './webGPU/canvas';

const main = async () => {
  await WebGPUDevice.loadDevice()
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

main()
