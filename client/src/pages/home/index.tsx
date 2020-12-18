import config from '@/config'
import { TOTAL } from '@/router/config/dashboard/path'
import { LOGIN } from '@/router/config/login/path'
import { getLocalStorage } from '@/utils/storage'
import React from 'react'
import { useHistory } from 'react-router-dom'

const HomePage: React.FC = () => {
  const history = useHistory()
  if (getLocalStorage(config.authKey)) {
    history.replace(TOTAL)
  } else {
    history.replace(LOGIN)
  }
  return null
}

export default HomePage
