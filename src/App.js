import { useDropzone } from 'react-dropzone';
import { useCallback } from 'react';

import './App.css';

function App() {
  const onDropFiles = useCallback(files => {
    // TODO
    console.log(files)
  }, []);

  const dropzoneStyle = {
    cursor: "pointer", // TODO
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noDrag: true,
    noClick: false, // TODO
    noKeyboard: false, // TODO
    onDrop: onDropFiles,
    maxFiles: 2,
    accept: "model/stl, application/sla", // TODO: not working?
  });

  return (
    <div className="App">
      <header className="App-header">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
            <p style={dropzoneStyle}>Click to select your stl files</p>
        </div>
      </header>
    </div>
  );
}

export default App;