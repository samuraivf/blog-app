import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { CheckAuthAction } from './redux/reducers/account/actions'

import Main from './Main'

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(CheckAuthAction())
  }, [])

  return (
    <Main />
  )
}

export default App
