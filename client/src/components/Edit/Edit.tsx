import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router'

import { GetPostAction, UpdatePostAction, SetLoadingTrueAction } from './../../redux/reducers/posts/actions'
import { useAppSelector } from '../../redux/hooks'

import Quill from 'quill'

import {
    Editor,
    TitleInput,
    WriteBox,
    InputBox,
    Container,
    PublishBox,
    PublishButton,
    TagsInput,
    UploadImage,
    TagsBox,
    UploadInput,
    UploadLabel,
    ImageName,
    BackButton
} from '../Write/styles'
import { toolbarOptions } from '../Write/quill-options'

import NotFound from './../NotFound/NotFound'
import LoadingPage from '../additional/LoadingPage/LoadingPage'

import * as addImgIcon from '../../icons/add.png'

import '../Write/styles.css'

type ParamsType = {
    postid: string | undefined
}

const EditPost: React.FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams<ParamsType>()
    const { user } = useAppSelector(state => state.account)
    const { currentPost, loading } = useAppSelector(state => state.posts)
    
    const titleInput = useRef<HTMLInputElement>(null)
    const tagInput = useRef<HTMLInputElement>(null)
    const imageName = useRef<HTMLDivElement>(null)
    
    let image: string
    let editor: Quill | null = null

    useEffect(() => {
        dispatch(SetLoadingTrueAction())

        if (params.postid) {
            dispatch(GetPostAction(+params.postid))
        }
    }, [])

    if (loading) {
        return <LoadingPage />
    }

    if (!currentPost && !loading) {
        return <NotFound message='Post' />
    }

    if (currentPost?.author.id !== user?.id) {
        return <NotFound message='Post' />
    }

    setTimeout(() => {
        editor = new Quill('.editor', {
            placeholder: 'Here you write something.\n\nOnce you are done, click **PUBLISH**.',
            modules: {
                toolbar: toolbarOptions
            },
            readOnly: false,
            theme: 'snow'
        })

        if (currentPost) {
            editor.root.innerHTML = currentPost.content
        }

        const toolboxes = document.querySelectorAll('.ql-toolbar.ql-snow')

        for (let i = toolboxes.length - 1; i >= 1; i--) {
            toolboxes[i].remove()
        }

    }, 1000)

    const setImage = (e: React.FormEvent<HTMLInputElement>): void => {
        const file = (e.target as HTMLInputElement)
        const reader = new FileReader()
        const name = imageName.current

        if (name) {
            name.innerHTML = file.value ? `<p>${file?.value.replace(/.*[/\\]/, '')}<p/>` : `<p>Select an image<p/>`
        }

        reader.onload = function () {
            image = reader.result as string
        }

        if (file.files && file.files[0]) {
            const imageFile = file.files[0].size
            const fileSize = Math.round((imageFile / 1024))

            if (name && fileSize > 5120) {
                name.style.backgroundColor = '#F74E4E'
                name.style.color = '#fff'
                name.innerHTML = `<p>Too large image<p/>`
                return
            }

            reader.readAsDataURL(file.files[0])
        }

    }

    const submit = (): void => {
        const title = titleInput.current?.value
        const tags = tagInput.current?.value.split(',')
        const content = editor?.root.innerHTML
        const tagsArr = tags?.map(tag => tag.trim().toLowerCase())

        if (title && content && user && currentPost) {
            dispatch(
                UpdatePostAction(
                    {
                        title,
                        content,
                        author: user.id,
                        tags: Array.from(new Set(tagsArr)),
                        id: currentPost.id,
                        image
                    }
                )
            )
            history.push('/')
        }
    }

    return (
        <>
            <WriteBox>
                <Container>
                    <InputBox>
                        <TitleInput
                            type="text"
                            placeholder='Write a title here'
                            defaultValue={currentPost?.title}
                            ref={titleInput}
                        />
                        <TagsBox>
                            <TagsInput
                                type='text'
                                placeholder='Add some tags(comma separated)'
                                defaultValue={currentPost?.tags.map(tag => tag.name).join(',')}
                                ref={tagInput}
                            />
                            <UploadLabel htmlFor='img'>
                                <UploadImage
                                    src={addImgIcon.default}
                                    alt='Upload Image'
                                />
                            </UploadLabel>
                            <UploadInput
                                type="file"
                                id='img'
                                name='img'
                                accept='image/*'
                                onChange={(e) => setImage(e)}
                            />
                            <ImageName ref={imageName}><p>Select an image</p></ImageName>
                        </TagsBox>
                    </InputBox>
                    <Editor>
                        <div className='editor'></div>
                    </Editor>
                </Container>
            </WriteBox>

            <PublishBox>
                <BackButton onClick={() => history.push('/')}>BACK TO HOME</BackButton>
                <PublishButton onClick={submit}>SAVE</PublishButton>
            </PublishBox>
        </>
    )
}

export default EditPost