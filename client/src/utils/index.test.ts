import { lengthChecker, likeIconChecker, saveIconChecker } from '.'
import { LikeIcons, SaveIcons } from './icons'

describe('test likeChecker', () => {
    it('should return first word', () => {
        expect(lengthChecker(1, 'Like', 'Likes')).toBe('1 Like')
        expect(lengthChecker(231, 'Like', 'Likes')).toBe('231 Like')
    })

    it('should return secont word', () => {
        expect(lengthChecker(0, 'Like', 'Likes')).toBe('0 Likes')
        expect(lengthChecker(2, 'Like', 'Likes')).toBe('2 Likes')
        expect(lengthChecker(232, 'Like', 'Likes')).toBe('232 Likes')
    })
})

describe('test iconsChecker', () => {
    describe('likeIconChecker', () => {
        const likes = [1, 2]

        it('should return liked icon', () => {
            expect(likeIconChecker(likes, 2)).toBe(LikeIcons.liked)
        })

        it('should return notLiked icon', () => {
            expect(likeIconChecker(likes, 3)).toBe(LikeIcons.notLiked)
            expect(likeIconChecker(likes, undefined)).toBe(LikeIcons.notLiked)
            expect(likeIconChecker([], 3)).toBe(LikeIcons.notLiked)
        })
    })

    describe('saveIconChecker', () => {
        const saved = [1, 2]

        it('should return saved icon', () => {
            expect(saveIconChecker(saved, 2)).toBe(SaveIcons.saved)
        })

        it('should return notSaved icon', () => {
            expect(saveIconChecker(saved, 3)).toBe(SaveIcons.notSaved)
            expect(saveIconChecker(undefined, 3)).toBe(SaveIcons.notSaved)
            expect(saveIconChecker([], 3)).toBe(SaveIcons.notSaved)
        })
    })
})
