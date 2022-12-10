import React from 'react';
import loadingGif from '../images/loadingGif.gif';

function Loading() {
  return (
    <div className="loading">
      <p>
        Carregando...
      </p>
      <img src={ loadingGif } alt="Barra de carregamento" />
    </div>
  );
}

export default Loading;
