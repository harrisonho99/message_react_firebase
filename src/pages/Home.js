import React from 'react';
import TexGenerator from '../components/TextGenerate';
import Canvas from '../components/Canvas';
import './home.css';

export default function Home() {
  const [title, setTitle] = React.useState('HI ! CLICK TO MAKE BUBBLES');
  React.useEffect(() => {
    function isCanvasSupported() {
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    }
    setTitle(
      isCanvasSupported() ? title : "Your Browser Doesn't Support Canvas API"
    );
    let container = document.querySelector('.App-Container');
    container.style.overflow = 'initial';
    container.style.zIndex = '100';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id='home'>
      <TexGenerator title={title} />
      <Canvas />
    </div>
  );
}
