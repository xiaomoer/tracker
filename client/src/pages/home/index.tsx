import config from '@/config'
import { LOGIN } from '@/router/config/login/path'
import { USER_MANAGEMENT } from '@/router/config/user-manage/path'
import { getLocalStorage } from '@/utils/storage'
import React from 'react'
import { useHistory } from 'react-router-dom'

const HomePage: React.FC = () => {
  const history = useHistory()
  if (getLocalStorage(config.authKey)) {
    history.replace(USER_MANAGEMENT)
  } else {
    history.replace(LOGIN)
  }
  return null
}

export default HomePage
