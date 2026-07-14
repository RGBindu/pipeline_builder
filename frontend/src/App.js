import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { NodeSidebar } from './NodeSidebar';

function App() {
  return (
    <div>
      <PipelineToolbar />
      <div style={{ display: 'flex' }}>
        <NodeSidebar />
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;

