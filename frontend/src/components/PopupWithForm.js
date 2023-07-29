function PopupWithForm({ name, isOpen, title, onClose, children, buttonText, onSubmit }) {
  return (
    <div className={`${name}-popup popup ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h3 className={`${name}-popup__title popup__title`}>{title}</h3>
        <button className="popup__close-button" type="button" onClick={onClose} />
        <form className="form" onSubmit={onSubmit} name={name}>
          {children}
          <input className="popup__submit-button" type="submit" value={buttonText} />
        </form>
      </div>
      <div className="popup__overlay" onClick={onClose}></div>
    </div>
  )
}

export default PopupWithForm