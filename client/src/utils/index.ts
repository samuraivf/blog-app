import { LikeIcons, SaveIcons } from "./icons"

export const likeChecker = (likes: number): string => {
    const stringLikes = likes.toString()
    const lastIndex = stringLikes.length - 1
    const lastDigit = stringLikes[lastIndex]

    if (window.screen.width <= 480) return likes + ''

    return ( lastDigit === '1' ) ? `${likes} Like` : `${likes} Likes`
}  

export const commentsChecker = (comments: number): string => {
    const strComments = comments.toString()
    const lastIndex = strComments.length - 1
    const lastDigit  =strComments[lastIndex]

    if (window.screen.width <= 480) return comments + ''

    return ( lastDigit === '1' ) ? `${comments} Comment` : `${comments} Comments`
}

export const likeIconChecker = (likes: number[], userId: number | undefined): string => {
    if (userId) {
        return (likes.includes(userId)) ? LikeIcons.liked : LikeIcons.notLiked
    }

    return LikeIcons.notLiked
}

export const saveIconChecker = (saved: number[] | undefined, postId: number): string => {
    if (saved) {
        return (saved.includes(postId)) ? SaveIcons.saved : SaveIcons.notSaved
    }

    return SaveIcons.notSaved
}

export const postChecker = (posts: number): string => {
    const strComments = posts.toString()
    const lastIndex = strComments.length - 1
    const lastDigit  =strComments[lastIndex]

    return ( lastDigit === '1' ) ? `${posts} Post` : `${posts} Posts`
}
