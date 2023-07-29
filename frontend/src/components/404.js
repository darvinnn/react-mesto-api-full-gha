import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function PageNotFound({ setHeaderField }) {
  useEffect(() => {
    setHeaderField('404')
  })
  const navigate = useNavigate()
  function handleGoBack() {
    navigate(-1)
  }
  return (
    <>
      <h2 style={{ color: "white", margin: "20px auto" }}>Page not found!</h2>
      <button style={{ color: "white", textDecoration: "underline", margin: "0 auto", cursor: "pointer", padding: 0, backgroundColor: 'transparent', border: 'none' }} onClick={handleGoBack}>Назад</button>
    </>
  )
}

export default PageNotFound