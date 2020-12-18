import * as React from 'react'
import { getLocalStorage } from '@/utils/storage'
import config from '@/config'
import { useHistory } from 'react-router-dom'

interface IProps {
  redirect?: string
}

const Auth: React.FC<React.PropsWithChildren<IProps>> = ({ redirect, children }) => {
  const history = useHistory()
  const token = getLocalStorage(config.authKey)
  if (token) {
    history.push(redirect)
    return null
  }
  return <>{children}</>
}

export default Auth
