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

import movements from './exampleMovements';

const STEP = {
  CHOOSE_FILES: "choose files",
  PREVIEW: "preview",
  REQUEST_ALIGNMENT: "request alignment",
  FINISH_ALIGNMENT: "finish alignment",
};

const CONTENT_HOST = "http://localhost:8080"

const ALIGNMENT_NAMES = [
  "upperGingiva.stl",
  "1.7.stl",
  "1.6.stl",
  "1.5.stl",
  "1.4.stl",
  "1.3.stl",
  "1.2.stl",
  "1.1.stl",
  "2.1.stl",
  "2.2.stl",
  "2.3.stl",
  "2.4.stl",
  "2.5.stl",
  "2.6.stl",
  "2.7.stl",
  "lowerGingiva.stl",
  "3.7.stl",
  "3.6.stl",
  "3.5.stl",
  "3.4.stl",
  "3.3.stl",
  "3.2.stl",
  "3.1.stl",
  "4.1.stl",
  "4.2.stl",
  "4.3.stl",
  "4.4.stl",
  "4.5.stl",
  "4.6.stl",
  "4.7.stl",
]

const INITIAL_COLORS = [
  "#787878",
  "#787878",
];
const ALIGNMENT_COLORS = Array(ALIGNMENT_NAMES.length).fill("#787878");

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
      setAlignmentUrls(ALIGNMENT_NAMES.map((name) => (
        `${CONTENT_HOST}/alignment/${name}`
      )));
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
              colors={INITIAL_COLORS}
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
              colors={ALIGNMENT_COLORS}
              style={halfPanelStyle}
            />
          }
        </div>
        <Dialog
          onClose={onMovementsClose}
          open={showMovements}
        >
          <DialogTitle>Movements Table</DialogTitle>
          <MovementsTable movements={movements} />
        </Dialog>
      </header>
    </div>
  );
}

export default App;
