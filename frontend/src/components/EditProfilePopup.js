import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext"

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value)
  }
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value)
  }
  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <input
        className="edit-popup__input edit-popup__input_type_name popup__input"
        name="edit-name"
        type="text"
        value={name || ''}
        onChange={handleNameChange}
        required
        minLength="2"
        maxLength="40"
      />
      <span id="error__edit-name"></span>
      <input
        className="edit-popup__input edit-popup__input_type_profession popup__input"
        name="edit-profession"
        type="text"
        value={description || ''}
        onChange={handleDescriptionChange}
        required
        minLength="2"
        maxLength="200"
      />
      <span id="error__edit-profession"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup