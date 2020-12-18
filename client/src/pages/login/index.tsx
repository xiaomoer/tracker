import { Button, Input } from 'antd'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { namespace, IState } from './model'
import { connect } from 'react-redux'
import { IDispatch } from '@/typings/model'
import { setLocalStorage } from '@/utils/storage'
import config from '@/config'
import styles from './style.module.scss'
import { TOTAL } from '@/router/config/dashboard/path'

interface IProps extends IDispatch, Partial<IState> {}

export const Login: React.FC<IProps> = ({ message, dispatch }) => {
  const history = useHistory()
  function handleClick() {
    setLocalStorage(config.authKey, 'this is token from server')
    history.push(TOTAL)
  }
  return (
    <>
      <p className={styles.notice}>{message}</p>
      <Input placeholder="your name please" />
      <Button onClick={handleClick} type="primary">
        点击登录
      </Button>
    </>
  )
}

const mapStateToProps = models => ({
  message: models[namespace].message,
})

export default connect(mapStateToProps)(Login)
