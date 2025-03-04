import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import { useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './App.css';

function App() {
  const canvasRef = useRef(null);
  const [strokeColor, setStrokeColor] = useState('black');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [preserveAspectRatio] = useState('none');
  const [customStrokeColor, setCustomStrokeColor] = useState('white');

  const clearCanvas = () => {
    canvasRef.current.clearCanvas();
  };

  const undoLastStroke = () => {
    canvasRef.current.undo();
  };

  const handleColorChange = (color) => {
    setStrokeColor(color.hex);
    setCustomStrokeColor(color.hex);
  };

  const saveAndDownloadImage = async () => {
    const dataUrl = await canvasRef.current.exportImage('png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'drawing.png';
    link.click();
  };

  const buttonStyle = {
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    minWidth: '60px',
    border: '1px solid black',
    boxShadow: '0 4px #999',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <div style={{
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'rgb(255 230 199)',
      backgroundImage: 'url(/notitas/bg-grid.png)',
      backgroundSize: 'cover'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '10px', backgroundColor: 'rgb(236, 187, 127)', borderRadius: '15px', padding: '10px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        Notitas <FavoriteIcon style={{ color: 'red', marginLeft: '10px' }} />
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px', height: '10%' }}>
        <Button
          variant="contained"
          style={{ ...buttonStyle, backgroundColor: '#C8A2C8', color: 'white' }}
          onClick={() => setStrokeColor('#C8A2C8')}
        />
        <Button
          variant="contained"
          style={{ ...buttonStyle, backgroundColor: 'turquoise', color: 'white' }}
          onClick={() => setStrokeColor('turquoise')}
        />
        <Button
          variant="contained"
          color="default"
          onClick={() => setDisplayColorPicker(!displayColorPicker)}
          style={{ ...buttonStyle, backgroundColor: customStrokeColor }}
        >
          🎨
        </Button>
        {displayColorPicker && (
          <div style={{ position: 'absolute', zIndex: 2 }}>
            <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }} onClick={() => setDisplayColorPicker(false)} />
            <SketchPicker color={strokeColor} onChange={handleColorChange} />
          </div>
        )}
      </div>
      <ReactSketchCanvas
        ref={canvasRef}
        width="100%"
        height="70%"
        strokeWidth={4}
        strokeColor={strokeColor}
        style={{ backgroundColor: 'white', border: '2px solid brown' }}
        preserveBackgroundImageAspectRatio={preserveAspectRatio}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button
            variant="contained"
            onClick={undoLastStroke}
            style={{ backgroundColor: 'lightgray', color: 'darkgoldenrod', borderRadius: '50px', border: '1px solid black' }}
          >
            Undo
          </Button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <Button
            variant="contained"
            onClick={clearCanvas}
            style={{ backgroundColor: 'lightgray', color: 'darkgoldenrod', borderRadius: '50px', border: '1px solid black' }}
          >
            Clear Canvas
          </Button>
          <Button
            variant="contained"
            onClick={saveAndDownloadImage}
            style={{ backgroundColor: 'lightgray', color: 'darkgoldenrod', borderRadius: '50px', border: '1px solid black' }}
          >
            Save & Download
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
