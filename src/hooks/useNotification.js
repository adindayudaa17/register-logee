import { useState, useCallback } from 'react'

const useNotification = () => {
  const [notification, setNotification] = useState(null)

  const showNotification = useCallback((type, message) => {
    setNotification({ type, message })
    setTimeout(() => {
      setNotification(null)
    }, 3000) // Auto-hide after 3 seconds
  }, [])

  const hideNotification = useCallback(() => {
    setNotification(null)
  }, [])

  return {
    notification,
    showNotification,
    hideNotification
  }
}

export default useNotification