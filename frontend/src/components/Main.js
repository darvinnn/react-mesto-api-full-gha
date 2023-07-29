import React, { useContext, useEffect } from "react";
import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike, cards, setHeaderField }) {
  useEffect(() => {
    setHeaderField(null)
  })
  const currentUser = useContext(CurrentUserContext)
  const { name: userName, about: userDescription, avatar: userAvatar } = currentUser

  return (
    <main className="main">

      <section className="profile">
        <div className="profile__avatar-hover" onClick={onEditAvatar}></div>
        <img className="profile__avatar" src={userAvatar} alt="Аватар" />
        <div className="profile__info">
          <div className="profile__title">
            <h1 className="profile__name text-overflow">{userName}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__subtitle text-overflow">{userDescription}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card card={card} onCardClick={onCardClick} onDeleteClick={onCardDelete} onCardLike={onCardLike} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main