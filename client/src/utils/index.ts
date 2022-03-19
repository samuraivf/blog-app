import { LikeIcons, SaveIcons } from "./icons"

export const lengthChecker = (length: number, word1: string, word2: string): string => {
    const stringLength = length.toString()
    const lastIndex = stringLength.length - 1
    const lastDigit = stringLength[lastIndex]

    return ( lastDigit === '1' ) ? `${length} ${word1}` : `${length} ${word2}`
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
