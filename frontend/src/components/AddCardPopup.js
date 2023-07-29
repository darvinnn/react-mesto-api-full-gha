import PopupWithForm from "./PopupWithForm"
import { useState } from "react"

function AddCardPopup({ onClose, isOpen, onAddCard }) {
  const [cardName, setCardName] = useState('')
  const [cardLink, setCardLink] = useState('')

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    await onAddCard(cardName, cardLink)
    setCardName('')
    setCardLink('')
  }

  const handleCardNameChange = (evt) => setCardName(evt.target.value)

  const handleCardLinkChange = (evt) => setCardLink(evt.target.value)

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      buttonText="Создать"
    >
      <input
        className="new-card-popup__input new-card-popup__input_type_name popup__input"
        name="new-card-name"
        type="text"
        placeholder="Название"
        onChange={handleCardNameChange}
        value={cardName || ''}
        required
        minLength="2"
        maxLength="30"
      />
      <span id="error__new-card-name"></span>
      <input
        className="new-card-popup__input new-card-popup__input_type_image popup__input"
        name="new-card-image"
        onChange={handleCardLinkChange}
        value={cardLink || ''}
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="error__new-card-image"></span>
    </PopupWithForm>
  )
}

export default AddCardPopup