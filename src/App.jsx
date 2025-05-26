import React, { useState } from 'react';
import './App.css';
import gustaveImage from './assets/image/Gustave.webp';
import maelleImage from './assets/image/Maelle.webp';
import esquieImage from './assets/image/Esquie.webp';
import { ShuffleAndToggleButton } from './Button';

function Card() {
  const [cards, setCards] = useState([
    { id: 1, pairId: 1, image: gustaveImage, name: 'Gustave', isBlurred: true },
    { id: 2, pairId: 2, image: maelleImage, name: 'Maelle', isBlurred: true },
    { id: 3, pairId: 3, image: esquieImage, name: 'Esquie', isBlurred: true },
    { id: 4, pairId: 1, image: gustaveImage, name: 'Gustave', isBlurred: true },
    { id: 5, pairId: 2, image: maelleImage, name: 'Maelle', isBlurred: true },
    { id: 6, pairId: 3, image: esquieImage, name: 'Esquie', isBlurred: true },
  ]);
  const [isVictory, setIsVictory] = useState(false);
  const [firstClick, setFirstClick] = useState(null);

  const handleImageClick = (id) => {
    const clickedCard = cards.find(card => card.id === id);
    
    // Si la carte est déjà déblurée, ne rien faire
    if (!clickedCard.isBlurred) return;

    // Si c'est le premier clic
    if (firstClick === null) {
      setFirstClick(id);
      setCards(cards.map(card => 
        card.id === id ? { ...card, isBlurred: false } : card
      ));
    } 
    // Si c'est le deuxième clic
    else {
      const firstCard = cards.find(card => card.id === firstClick);
      
      // Si c'est la même paire
      if (firstCard.pairId === clickedCard.pairId) {
        setCards(cards.map(card => 
          card.id === id ? { ...card, isBlurred: false } : card
        ));
      }
      // Si ce n'est pas la même paire, on reblur la première carte
      else {
        setCards(cards.map(card => 
          card.id === firstClick ? { ...card, isBlurred: true } : card
        ));
      }
      setFirstClick(null);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled.map(card => ({ ...card, isBlurred: true })));
    setIsVictory(false);
    setFirstClick(null);
  };

  // Vérifier si toutes les paires de cartes sont déblurrées
  React.useEffect(() => {
    const allPairsRevealed = [1, 2, 3].every(pairId => 
      cards.filter(card => card.pairId === pairId && !card.isBlurred).length === 2
    );
    if (allPairsRevealed) {
      setIsVictory(true);
    }
  }, [cards]);

  return (
    <div>
      <ShuffleAndToggleButton 
        onShuffle={shuffleCards}
      />
      {isVictory && <h2>Victoire !</h2>}
      <div className="image-grid">
        {cards.map((card) => (
          <img
            key={card.id}
            src={card.image}
            alt={card.name}
            onClick={() => handleImageClick(card.id)}
            className={card.isBlurred ? 'blurred' : ''}
          />
        ))}
      </div>
    </div>
  );
}

export default Card;
