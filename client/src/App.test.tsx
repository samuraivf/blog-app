import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { RenderWithRedux } from './tests/helpers/renderWithRedux'
import { CheckAuthAction } from './redux/reducers/account/actions'

import useMockDispatch from './tests/useMockDispatch.hook'
import App from './App'

describe('test App', () => {
    it('render App', async () => {
        const dispatch = useMockDispatch()

        const { getByTestId } = render(
            <MemoryRouter initialEntries={['/']}>
                <RenderWithRedux component={<App />} initialState={{}}/>
            </MemoryRouter>
        )

        expect(getByTestId('background')).toBeInTheDocument()
        expect(dispatch).toBeCalledWith(CheckAuthAction())
    })
})
