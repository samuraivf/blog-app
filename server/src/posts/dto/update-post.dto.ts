export class UpdatePostDto {
    readonly content: string
    readonly author: number
    readonly title: string
    readonly tags: string[]
    readonly id: number
    readonly image?: string
}
