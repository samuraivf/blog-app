export class CreatePostDto {
    readonly title: string
    readonly content: string
    readonly tags: string[]
    readonly author: number
    readonly image?: string
}
