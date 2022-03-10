import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router'

import { CloseButton, CreateAccountButton, ModalBox, Background } from './styles'

interface PropTypes {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const modalRoot = document.getElementById('modal')!

const AuthModal: React.FC<PropTypes> = ({ isOpen, setIsOpen }) => {
    const el = document.createElement('div')
    const history = useHistory()

    useEffect(() => {
        modalRoot.appendChild(el)

        return () => {
            modalRoot.removeChild(el)
        }
    }, [])

    const close = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLDivElement).id !== 'modal-box') {
            setIsOpen(false)
        }
    }

    if (!isOpen) return null

    return ReactDOM.createPortal(
        <Background onClick={(e) => close(e)}>
            <ModalBox id='modal-box'>
                <h2>You are not authorized :(</h2>
                <div>
                    <CloseButton onClick={() => setIsOpen(false)}>Close</CloseButton>
                    <CreateAccountButton onClick={() => history.push('/account')}>Create Account</CreateAccountButton>
                </div>
            </ModalBox>
        </Background>,
        el
    )
}

export default AuthModal
