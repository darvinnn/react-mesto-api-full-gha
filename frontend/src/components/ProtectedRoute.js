import { Navigate } from "react-router-dom"
import Loader from "./Loader"

function ProtectedRoute({ element: Component, isLoading, loggedIn, ...props }) {
  if (isLoading) {
    return <Loader />
  }

  return (
    loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" />
  )
}

export default ProtectedRoute