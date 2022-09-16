import { useCallback, useState } from 'react';

import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import MovementsTable from './MovementsTable'
import Viewer3D from './Viewer3D';
import './App.css';

function App() {
  const [ urls, setUrls ] = useState([]);

  const onDropFiles = useCallback(files => {
    const urls = files.map(file => URL.createObjectURL(file));

    setUrls(urls);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noKeyboard: false,
    onDrop: onDropFiles,
    maxFiles: 2,
    accept: "model/stl, application/sla", // TODO: not working?
  });

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              AGAI x 創兆
            </Typography>
            <Button variant="contained" disabled>RUN AI</Button>
            <Button variant="text" disabled></Button>
            <Button variant="contained" disabled>SHOW MOVEMENTS</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <header className="App-header">
        {
          urls.length == 0 &&
          <div
            style={{
              cursor: "pointer",
              width: "90vw",
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p>Upload Your Files</p>
          </div>
        }
        {
          urls.length > 0 &&
          <Viewer3D urls={urls} style={{width: "90vw", height: "80vh"}}/>
        }
        <h3>Movements Table</h3>
        <MovementsTable />
      </header>
    </div>
  );
}

export default App;
