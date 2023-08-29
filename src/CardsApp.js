import { useState, useEffect } from "react";
import Card from "./Card.js";
import axios from "axios";

const DECK_API = `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`;
const CARD_API = `https://deckofcardsapi.com/api/deck`;
// `https://deckofcardsapi.com/api/deck/<<deck_id>>/draw/?count=2`;

function CardsApp() {
  const [deck, setDeck] = useState({
    deckId: null,
    isLoading: true
  });

  const [card, setCard] = useState({
    card: null,
    isLoading: true
  });
  console.log("CARD STATE", card);
  console.log("DECK STATE", deck);
  console.log("DECK ID", deck.deckId);

  useEffect(function fetchDeckWhenMounted() {
    console.log("DECK EFFECT");
    console.log("DECK ID EFFECT", deck.deckId);
    async function fetchDeck() {
      const resp = await axios.get(DECK_API);
      setDeck({
        deckId: resp.data.deck_id,
        isLoading: false
      });
    }
    fetchDeck();
  }, [ ]);

  useEffect(function fetchCardAfterRender() {
    console.log("CARD EFFECT");
    if(deck.isLoading === false)  {
      async function fetchCard() {
        const resp = await axios.get(`${CARD_API}/${deck.deckId}/draw/?count=1`);
        setCard({
          data: resp.data.cards[0],
          isLoading: false
        });
        console.log("RESP DATA", resp.data);
      }
      fetchCard();
    }
  }, [deck]);

  if(deck.isLoading || card.isLoading) return (<p>Loading...</p>);

  if(card.isLoading) {
    setCard();
  }

  return (
    <div>
      <button onClick={ }>Get Card</button>
      <Card card={ card.data }/>
    </div>
  );
}

export default CardsApp;