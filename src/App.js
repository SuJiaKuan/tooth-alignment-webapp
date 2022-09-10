import { useCallback, useState } from 'react';

import { useDropzone } from 'react-dropzone';

import MovementsTable from './MovementsTable'
import Viewer3D from './Viewer3D';
import './App.css';

function App() {
  const [ urls, setUrls ] = useState([]);

  const onDropFiles = useCallback(files => {
    const urls = files.map(file => URL.createObjectURL(files[0]));

    setUrls(urls);
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
        {
          urls.length > 0 &&
          <Viewer3D urls={urls} />
        }
        <h3>Movements Table</h3>
        <MovementsTable />
      </header>
    </div>
  );
}

export default App;
