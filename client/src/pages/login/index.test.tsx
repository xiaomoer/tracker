import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Login } from '.'
// import { getLocalStorage } from '@/utils/storage'
// import config from '@/config'

describe('Login', () => {
  it('display notice', () => {
    const props = { message: 'xxx' }
    const wrapper = render(<Login {...props} />)
    const p = wrapper.getByText(props.message)
    expect(p).toBeInTheDocument()
    expect(p.tagName).toEqual('P')
    expect(p).toHaveClass('notice')
  })
  it('change notice', () => {
    const wrapper = render(<Login message="changed" />)
    const p = wrapper.getByText('changed')
    expect(p).toBeInTheDocument()
    expect(p).toHaveClass('notice')
  })
  it('input user name', () => {
    const wrapper = render(<Login message="login" />)
    const input = wrapper.getByPlaceholderText(/your name/, { exact: false })
    expect(input).toBeInTheDocument()
    fireEvent.change(input, { target: { value: 'lindo' } })
    expect(input).toHaveDisplayValue('lindo')
  })
  it('click login btn', () => {
    const wrapper = render(<Login message="login" />)
    const btn = wrapper.getByText('点击登录')
    // const handleClick = jest.fn()
    // btn.onclick = handleClick
    expect(btn).toBeInTheDocument()
    // fireEvent.click(btn)
    // expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
