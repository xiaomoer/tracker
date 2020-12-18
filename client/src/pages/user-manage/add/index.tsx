import React from 'react'
import { connect } from 'react-redux'
import { namespace, IState } from '@/models/global'

interface IProps extends IState {}

const HomePage: React.FC<IProps> = ({ message }) => <div>添加用户页, {message}</div>

const mapStateToProps = models => ({
  message: models[namespace].message,
})
export default connect(mapStateToProps)(HomePage)
