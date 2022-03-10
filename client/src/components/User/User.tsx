import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router'
import { useForm } from 'react-hook-form'

import { useAppSelector } from '../../redux/hooks'
import { FollowUserAction, AddInfoAction, GetProfileAction } from './../../redux/reducers/account/actions'
import { registerOptions } from './registerOptions'
import { SetLoadingTrueAction } from '../../redux/reducers/posts/actions'

import { commentsChecker, postChecker } from '../../utils'
import { EditIcons } from '../../utils/icons'
import * as utils from '../../utils/set-image'

import { RootBox } from '../styled-components/RootBox'
import {
    BigUserImage,
    InfoValue,
    InfoBox,
    ProfileBox,
    SmallIcon,
    UserBackground,
    UserBox,
    UserDescription,
    UserInfoBox,
    UserName,
    UserNameInput,
    UserDescriptionInput,
    UserLocationInput,
    EditIcon,
    ButtonsBox,
    CancelButton,
    SaveButton,
    FollowButton,
    UploadLabel,
    UploadImage,
    UploadInput,
    UserErrorDesc,
    Information,
    ShortInfo,
    ShortInfoLine,
    ShortInfoText,
    PostsBox,
    UnfollowButton,
    Form
} from './styles'
import { Icon } from '../Post/styles'

import Post from '../Post/Post'
import NotFound from './../NotFound/NotFound'
import LoadingPage from '../additional/LoadingPage/LoadingPage'

type FormValues = {
    username: string
    description: string
    location: string
}

type ParamTypes = {
    userid?: string
}

const User: React.FC = () => {
    const dispatch = useDispatch()
    const params = useParams<ParamTypes>()
    const { user, profile } = useAppSelector(state => state.account)
    const { loading } = useAppSelector(state => state.posts)

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState('')
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        mode: 'onBlur'
    })

    useEffect(() => {
        dispatch(SetLoadingTrueAction())
        
        if (params.userid) {
            dispatch(GetProfileAction(+params.userid))
        }
    }, [])
    
    const readImage = (e: React.FormEvent<HTMLInputElement>): void => {
        utils.readImage(e).then((result) => setImage(result))
    }

    const onSubmit = (data: FormValues) => {
        dispatch(
            AddInfoAction(
                {
                    ...data,
                    image
                }
            )
        )

        setIsEdit(false)
    }

    const follow = () => {
        if (profile && user?.id) {
            dispatch(FollowUserAction(profile.id))
        }

        if (params.userid) {
            dispatch(GetProfileAction(+params.userid))
        }
    }

    const checkFollow = () => {
        if (user && profile?.followers.includes(user.id)) {
            return (
                <UnfollowButton onClick={follow}>UNFOLLOW</UnfollowButton>
            )
        }

        return (
            <FollowButton onClick={follow}>FOLLOW</FollowButton>
        )
    }

    if (loading) {
        return <LoadingPage />
    }

    if (profile) return (
        <RootBox>
            <UserBox>
                <UserBackground />
            {
                (
                    user && (user.id === profile.id) && isEdit
                ) && (
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <ProfileBox>
                            <BigUserImage url={image}>
                                <UploadLabel htmlFor='img'>
                                    <UploadImage
                                        src='https://cdn-icons-png.flaticon.com/512/16/16410.png'
                                        alt='Upload Image'
                                    />
                                </UploadLabel>
                                <UploadInput
                                    type="file"
                                    id='img'
                                    name='img'
                                    accept='image/*'
                                    onChange={(e) => readImage(e)}
                                />
                            </BigUserImage>
                            <UserNameInput
                                placeholder='Add Your Name'
                                defaultValue={profile.username}
                                {...register('username', registerOptions.username)}
                                error={!!errors?.username}
                            />
                            <UserErrorDesc>{errors?.username?.message}</UserErrorDesc>
                            <UserDescriptionInput
                                placeholder='Add Description'
                                defaultValue={profile.description}
                                {...register('description', registerOptions.description)}
                                error={!!errors?.description}
                            />
                            <UserErrorDesc>{errors?.description?.message}</UserErrorDesc>
                            <UserInfoBox>
                                <InfoBox>
                                    <SmallIcon src='https://cdn-icons.flaticon.com/png/512/3082/premium/3082383.png?token=exp=1644162542~hmac=21d45c7060e94de13f3522736585e838' />
                                    <UserLocationInput
                                        placeholder='Add Your Location'
                                        defaultValue={profile.location}
                                        {...register('location', registerOptions.location)}
                                        error={!!errors?.location}
                                    />
                                </InfoBox>
                                <InfoBox>
                                    <SmallIcon src='https://cdn-icons.flaticon.com/png/512/2342/premium/2342329.png?token=exp=1644163266~hmac=3b86b048b7ba0059c135e2aaeed22b23' />
                                    <InfoValue>Joined on {
                                    new Date(profile.createdAt).toLocaleString(
                                        'en-US', 
                                        { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        }
                                    )
                                }</InfoValue>
                                </InfoBox>
                            </UserInfoBox>
                            <UserErrorDesc>{errors?.location?.message}</UserErrorDesc>
                            <ButtonsBox>
                                <CancelButton onClick={() => setIsEdit(false)}>CANCEL</CancelButton>
                                <SaveButton type='submit'>SAVE</SaveButton>
                            </ButtonsBox>
                        </ProfileBox>
                    </Form>
                )
            }
            {
                !isEdit && (
                    <ProfileBox>
                        {
                            profile.image 
                                ? <BigUserImage url={profile.image} />
                                : <BigUserImage url=''>{profile.username[0]}</BigUserImage>
                        }
                        {
                            (user?.id === profile.id) && (
                                <EditIcon
                                    url={EditIcons.default}
                                    urlHover={EditIcons.hover}
                                    onClick={() => setIsEdit(true)}
                                />
                            )
                        }
                        <UserName>{profile.username}</UserName>
                        <UserDescription>{profile.description}</UserDescription>
                        <UserInfoBox>
                            <InfoBox>
                                <SmallIcon src='https://cdn-icons.flaticon.com/png/512/3082/premium/3082383.png?token=exp=1644162542~hmac=21d45c7060e94de13f3522736585e838' />
                                <InfoValue>{profile.location || 'No Data'}</InfoValue>
                            </InfoBox>
                            <InfoBox>
                                <SmallIcon src='https://cdn-icons.flaticon.com/png/512/2342/premium/2342329.png?token=exp=1644163266~hmac=3b86b048b7ba0059c135e2aaeed22b23' />
                                <InfoValue>Joined on {
                                    new Date(profile.createdAt).toLocaleString(
                                        'en-US', 
                                        { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        }
                                    )
                                }</InfoValue>
                            </InfoBox>
                        </UserInfoBox>
                        <ButtonsBox>
                            {
                                (user && user.id !== profile.id) && checkFollow()
                            }
                        </ButtonsBox>
                    </ProfileBox>
                )
            }
                <Information>
                    <ShortInfo>
                        <ShortInfoLine>
                            <Icon src='https://cdn-icons-png.flaticon.com/512/3596/3596817.png' />
                            <ShortInfoText>{postChecker(profile.posts.length)} published</ShortInfoText>
                        </ShortInfoLine>
                        <ShortInfoLine>
                            <Icon src='https://cdn-icons.flaticon.com/png/512/3031/premium/3031126.png?token=exp=1641739757~hmac=2b7c33b43a7f58edb16d3f5cbb1fb2c3' />
                            <ShortInfoText>{commentsChecker(profile.comments)} written</ShortInfoText>
                        </ShortInfoLine>
                    </ShortInfo>
                    <PostsBox>
                        {
                            profile.posts.map((post) => <Post post={post} key={post.id} />)
                        }
                    </PostsBox>
                </Information>
            </UserBox>
        </RootBox>
    )

    return <NotFound message='User' />
}

export default User
