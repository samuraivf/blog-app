import styled from "styled-components"
import { Icon } from "../PostContent/styles"
import { DeleteButton } from '../Post/styles'
import { Button } from '../styled-components/Button'

export const CommentsBox = styled.div`
    padding: 0 3.5rem 3rem;
    border-top: 1px solid #CCC;

    @media screen and (max-width: 480px) {
        padding: 0 1rem 3rem;
    }
`

export const AddCommentBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    height: 7rem;
    margin-bottom: 2rem;
`

export const CommentFiled = styled.textarea`
    width: 90%;
    height: 3rem;
    border-radius: 5px;
    resize: none;
    border: 2px solid #EBEBEB;
    padding: .5rem;
    transition-duration: .3s;
    font-family: 'Inconsolata', monospace, Arial, Helvetica, sans-serif;
    font-size: 1rem;
    font-weight: 500;
    position: absolute;
    right: 0;
    top: 0;

    &:focus {
        outline: none;
        border: 2px solid #3B49DF;
        margin: 0
    }
`

export const AddCommentButton = styled(Button)`
    width: 3rem;
    height: 2rem;
    position: absolute;
    right: 0;
    bottom: 0;
`

export const CommentContainer = styled.div`
    width: 100%;
    margin-bottom: 1rem;
    display: flex;
    align-items: flex-start;
`

export const Comment = styled.div`
    width: 87.7%;
    min-height: 3.5rem;
    border-radius: 5px;
    border: 2px solid #EBEBEB;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;    
`

export const UserName = styled.h4`
    margin: 0;
    font-weight: 600;
    cursor: pointer;
    transition-duration: .3s;

    &:hover {
        color: #3B49DF;
    }
`

export const DateBox = styled.span`
    font-weight: 400;
    font-size: 1rem;
    color: #717171
`

export const CommentContent = styled.h3`
    font-weight: 400;
    font-size: 1.2rem;
    margin: 0;
    margin-top: 1rem;
`

export const Likes = styled.span`
    font-weight: 400;
    margin-top: 1rem;
    font-size: .9rem;
    display: flex;
    align-items: center;
    border-radius: 5px;
    transition-duration: .3s;
    cursor: pointer;
    padding: .5rem;

    &:hover {
        background-color: #EBEBEB;
    }
`

export const LikeIcon = styled(Icon)`
    width: 1rem;
    height: 1rem;
    margin-right: .5rem;
`

export const DeleteComment = styled(DeleteButton)`
    width: 2rem;
    height: 2rem;
`

export const InteractionBox = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: end;
`