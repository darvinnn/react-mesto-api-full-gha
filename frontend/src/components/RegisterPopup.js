import successPic from '../images/successPic.svg'
import rejectPic from '../images/rejectPic.svg'

function RegisterPopup({ onClose, isSuccessed, isOpen }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container register-popup__container" >
        <button className="popup__close-button" type="button" onClick={onClose} />
        <img className='register-popup__image' src={isSuccessed ? successPic : rejectPic} alt={isSuccessed ? 'Успех!' : 'Ошибка'} />
        <p className='register-popup__text'>{isSuccessed ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
      <div className="popup__overlay" onClick={onClose}></div>
    </div>
  )
}

export default RegisterPopup