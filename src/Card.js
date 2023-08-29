

function Card ({ card }) {
  console.log("CARD COMP", card, card.image);
  return (
    <img src={ card.image }></img>
  )
}

export default Card;