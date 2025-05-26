import React from 'react';

 function ShuffleAndToggleButton({ blurred, onShuffle, onToggle }) {
  const handleClick = () => {
    onShuffle();
    onToggle();
  };

  return (
    <button className="shuffle-button" onClick={handleClick}>
      {blurred ? 'Afficher et mélanger' : 'Cacher et mélanger'}
    </button>
  );
}



export { ShuffleAndToggleButton };
