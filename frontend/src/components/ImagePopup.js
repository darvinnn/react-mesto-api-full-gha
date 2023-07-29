function ImagePopup({ card, onClose }) {

  return (
    <div className={`image-popup popup ${card && 'popup_opened'}`} >
      <div className="image-popup__container">
        <button className="popup__close-button" id="image-popup__close-button" type="button" onClick={onClose}></button>
        <img className="image-popup__image" src={card && card.link} alt={card && card.name} />
        <p className="image-popup__title">{card && card.name}</p>
      </div>
      <div className="popup__overlay popup__overlay_darker" onClick={onClose}></div>
    </div>
  )
}

export default ImagePopup