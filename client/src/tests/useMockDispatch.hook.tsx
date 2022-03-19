import * as reactRedux from 'react-redux'

const useMockDispatch = () => {
    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(jest.fn())
    const dispatch = reactRedux.useDispatch()

    return dispatch
}

export default useMockDispatch