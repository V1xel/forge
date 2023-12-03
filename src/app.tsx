import ReactFlow, { Background, BackgroundVariant } from 'reactflow'
import { useFlowStore } from './state/flowStore'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow {...useFlowStore()}>
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
      </ReactFlow>
    </div>
  )
}

export default App
