import { useCallback, useState } from 'react';

import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import MovementsTable from './MovementsTable'
import Viewer3D from './Viewer3D';
import Loading from "./Loading";
import './App.css';

const STEP = {
  CHOOSE_FILES: "choose files",
  PREVIEW: "preview",
  REQUEST_ALIGNMENT: "request alignment",
  FINISH_ALIGNMENT: "finish alignment",
};

function App() {
  const [ initialUrls, setInitialUrls ] = useState([]);
  const [ alignmentUrls, setAlignmentUrls ] = useState([]);
  const [ step, setStep ] = useState(STEP.CHOOSE_FILES);
  const [ showMovements, setShowMovements ] = useState(false);

  const onDropFiles = useCallback(files => {
    if (files.length !== 2) return;

    const urls = files.map(file => URL.createObjectURL(file));

    setInitialUrls(urls);
    setStep(STEP.PREVIEW);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noKeyboard: false,
    onDrop: onDropFiles,
    maxFiles: 2,
    accept: "model/stl, application/sla", // TODO: not working?
  });

  const onClickAlignmentButton = () => {
    setStep(STEP.REQUEST_ALIGNMENT);

    // TODO
    setTimeout(() => {
      setStep(STEP.FINISH_ALIGNMENT);
      // TODO
      setAlignmentUrls(initialUrls);
    }, 5000 + Math.random() * 3000);
  };

  const onClickMovementsButton = () => {
    setShowMovements(true);
  };

  const onMovementsClose = () => {
    setShowMovements(false);
  };

  const fullPanelStyle = {
    width: "90vw",
    height: "80vh",
  };
  const halfPanelStyle = {
    width: "45vw",
    height: "80vh",
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{ flexGrow: 1, width: "100%" }}>
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
              <Button
                variant="contained"
                disabled={step !== STEP.PREVIEW}
                onClick={onClickAlignmentButton}
              >
                RUN AI
              </Button>
              <Button variant="text" disabled></Button>
              <Button
                variant="contained"
                disabled={step !== STEP.FINISH_ALIGNMENT}
                onClick={onClickMovementsButton}
              >
                SHOW MOVEMENTS
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        {
          step === STEP.CHOOSE_FILES &&
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              ...fullPanelStyle
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p>Upload Your Files</p>
          </div>
        }
        <div style={{
          display: "flex",
          alignItems: "center",
        }}>
          {
            step !== STEP.CHOOSE_FILES &&
            <Viewer3D
              urls={initialUrls}
              style={step === STEP.PREVIEW ? fullPanelStyle : halfPanelStyle}
            />
          }
          {
            step === STEP.REQUEST_ALIGNMENT &&
            <div
              style={{
                position: "relative",
                ...halfPanelStyle
              }}
            >
              <Loading
                style={{
                  margin: "auto",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          }
          {
            step === STEP.FINISH_ALIGNMENT &&
            <Viewer3D
              urls={alignmentUrls}
              style={halfPanelStyle}
            />
          }
        </div>
        <Dialog
          onClose={onMovementsClose}
          open={showMovements}
        >
          <DialogTitle>Movements Table</DialogTitle>
          <MovementsTable />
        </Dialog>
      </header>
    </div>
  );
}

export default App;
