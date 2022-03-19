import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import User from './User'

describe('test User component', () => {
    it('should render User with image', () => {
        const mockedProps = {
            username: 'user-1',
            image: '123',
            onClick: jest.fn()
        }

        const { getByTestId, getByText } = render(<User {...mockedProps} />)

        expect(getByTestId('user-box')).toBeInTheDocument()
        expect(getByText(mockedProps.username)).toBeInTheDocument()
        expect(getByTestId('user-image')).not.toHaveTextContent(mockedProps.username[0])
    })

    it('should render User without image', () => {
        const mockedProps = {
            username: 'user-1',
            onClick: jest.fn()
        }

        const { getByTestId, getByText } = render(<User {...mockedProps} />)

        expect(getByTestId('user-box')).toBeInTheDocument()
        expect(getByText(mockedProps.username)).toBeInTheDocument()
        expect(getByTestId('user-image')).toHaveTextContent(mockedProps.username[0])
    })

    it('should call onClick func', () => {
        const mockedProps = {
            username: 'user-1',
            image: '123',
            onClick: jest.fn()
        }

        const { getByText } = render(<User {...mockedProps} />)
        const username = getByText(mockedProps.username)

        expect(mockedProps.onClick).not.toBeCalled()
        userEvent.click(username)
        expect(mockedProps.onClick).toHaveBeenCalled()
    })
})