import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { RenderTestApp } from '../../tests/helpers/renderTestApp'
import { createAccountAction, loginAction } from './../../redux/reducers/account/actions'

import useMockDispatch from './../../tests/useMockDispatch.hook'
import Account from './Account'

describe('test Account component', () => {
    it('should render Account', () => {
        const { getByTestId, getByText } = render(<RenderTestApp component={<Account />} />)

        expect(getByTestId('create-account-page')).toBeInTheDocument()
        expect(getByText(/welcome to blog/i)).toBeInTheDocument()
        expect(getByText(/create account/i)).toBeInTheDocument()

        const loginChange = getByTestId('change-login')
        
        userEvent.click(loginChange)
        expect(getByText(/log in/i)).toBeInTheDocument()

        const createChange = getByTestId('change-create')

        userEvent.click(createChange)
        expect(getByTestId('username-box')).toBeInTheDocument()
    })

    it('should display required error when value is invalid', async () => {
        const dispatch = useMockDispatch()

        const { getByTestId, findAllByRole } = render(<RenderTestApp component={<Account />} />)

        const submitBtn = getByTestId('submit-btn')

        fireEvent.submit(submitBtn)
        expect(await findAllByRole('alert')).toHaveLength(3)

        const loginChange = getByTestId('change-login')
        
        userEvent.click(loginChange)

        fireEvent.submit(submitBtn)
        expect(await findAllByRole('alert')).toHaveLength(2)

        expect(dispatch).not.toBeCalledWith(loginAction({ email: '', password: '' }))
    })

    it('should not display error when value is valid', async () => {
        const dispatch = useMockDispatch()

        const { getByTestId, queryAllByRole } = render(<RenderTestApp component={<Account />} />)

        const mockedUserData = {
            username: 'username',
            password: 'password1',
            email: 'test@mail.com'
        }

        fireEvent.input(getByTestId('username'), {
            target: {
              value: mockedUserData.username
            }
        })

        fireEvent.input(getByTestId('email'), {
            target: {
              value: mockedUserData.email
            }
        })
      
        fireEvent.input(getByTestId('password'), {
            target: {
              value: mockedUserData.password
            }
        })

        fireEvent.submit(getByTestId('submit-btn'))

        await waitFor(
            () => queryAllByRole('alert').forEach(alert => expect(alert).toHaveTextContent(''))
        )

        expect(dispatch).toBeCalledWith(createAccountAction(mockedUserData))
    })
})
