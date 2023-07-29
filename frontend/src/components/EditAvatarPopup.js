import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
  const avatarInputRef = useRef()

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar(avatarInputRef.current.value)
  }

  return (
    <PopupWithForm name="edit-avatar"
      title="Обновить аватар"
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText="Сохранить">
      <input
        ref={avatarInputRef}
        className="popup__input"
        name="avatarInput"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="error__avatarInput"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup