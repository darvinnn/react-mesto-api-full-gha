import { useContext } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"

function Card({ card, onCardClick, onCardLike, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext)
  const isOwner = currentUser._id === card.owner
  const isLiked = card.likes.some(like => like === currentUser._id)
  const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_active'}`);

  const handleLikeClick = () => {
    onCardLike(card)
  }
  const handleDeleteClick = () => {
    onDeleteClick(card)
  }

  return (
    <li className="card">
      {isOwner && <button className="card__delete-button" onClick={handleDeleteClick} type="button"></button>}
      <img className="card__image" src={card.link} alt={card.name} onClick={() => onCardClick(card)} />
      <div className="card__info">
        <h2 className="card__name text-overflow">{card.name}</h2>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
}

export default Card