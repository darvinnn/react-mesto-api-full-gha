import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import EditProfilePopup from "./EditProfilePopup.js";
import RegisterPopup from "./RegisterPopup.js";
import AddCardPopup from "./AddCardPopup.js";
import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import PageNotFound from "./404.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { register, login, checkToken } from "../utils/Auth.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [headerField, setHeaderField] = useState(null)
  const [headerEmail, setHeaderEmail] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(true)

  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard || isRegisterPopupOpen

  const navigate = useNavigate()

  const handleCardClick = (card) => setSelectedCard(card);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleRegisterSubmit = ({ email, password }) => {
    register({ email, password })
      .then((response) => {
        if (response) {
          setIsRegisterPopupOpen(true)
          setIsRegistrationSuccess(true)
          navigate('/sign-in')
        }
      })
      .catch(err => {
        setIsRegisterPopupOpen(true)
        setIsRegistrationSuccess(false)
        console.log(err)
      })
  }

  const handleLoginSubmit = ({ email, password }) => {
    login({ email, password })
      .then(({ token }) => {
        if (token) {
          localStorage.setItem('jwt', token)
          setIsLoggedIn(true)
          navigate('/')
        }
      })
      .catch(err => {
        setIsRegisterPopupOpen(true)
        setIsRegistrationSuccess(false)
        console.log(err)
      })
  }

  const handleUpdateUser = (info) => {
    api.editUserInfo(info)
      .then(newInfo => setCurrentUser(newInfo))
      .then(closeAllPopups())
      .catch(err => console.log(err))
  }

  const handleUpdateAvatar = (avatarLink) => {
    api.changeAvatar(avatarLink)
      .then(newInfo => setCurrentUser(newInfo))
      .then(closeAllPopups())
      .catch(err => console.log(err))
  }

  const handleAddCard = (cardName, cardLink) => {
    api.addCard({ name: cardName, link: cardLink })
      .then(newCard => setCards([newCard, ...cards]))
      .then(closeAllPopups())
      .catch(err => console.log(err))
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    api.toggleLike(card._id, isLiked)
      .then(newCard => {
        setCards(cards => cards.map(c => c._id === card._id ? newCard : c))
      })
      .catch(err => console.log(err))
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(setCards(cards => cards.filter(c => c !== card)))
      .catch(err => console.log(err))
  }

  const handleQuit = () => {
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
  }

  const checkLocalToken = () => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setHeaderEmail(res.data.email);
            setIsLoggedIn(true)
            setIsLoading(false)
            navigate('/', { replace: true })
            getCards()
            getInfo()
          }
        })
        .catch(err => {
          setIsLoading(false)
          console.log(err)
        })
    } else { navigate('/sign-in') }
  }

  useEffect(() => {
    checkLocalToken()
  }, [isLoggedIn, isLoading])

  const getCards = () => {
    api.getInitialCards()
      .then(data => setCards(data))
      .catch(err => console.log(err))
  }

  const getInfo = () => {
    api.getUserInfo()
      .then(res => setCurrentUser(res))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsRegisterPopupOpen(false)
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <AddCardPopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} onAddCard={handleAddCard} />
        <EditAvatarPopup onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup onClose={closeAllPopups} isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <RegisterPopup onClose={closeAllPopups} isOpen={isRegisterPopupOpen} isSuccessed={isRegistrationSuccess} />

        <Header headerField={headerField} onQuit={handleQuit} headerEmail={headerEmail} />
        <Routes>
          <Route path="/sign-up" element={<Register setHeaderField={setHeaderField} onSubmit={handleRegisterSubmit} />} />
          <Route path="/sign-in" element={<Login setHeaderField={setHeaderField} onSubmit={handleLoginSubmit} />} />
          <Route path="/" element={<ProtectedRoute
            loggedIn={isLoggedIn}
            isLoading={isLoading}
            cards={cards}
            onCardDelete={handleCardDelete}
            onCardLike={handleCardLike}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            setHeaderField={setHeaderField}
            element={Main} />} />
          <Route path="*" element={<PageNotFound setHeaderField={setHeaderField} />} />
        </Routes>

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
