import React from 'react'

export const readImage = (e: React.FormEvent<HTMLInputElement>): Promise<string> => {
    const file = (e.target as HTMLInputElement)
    const reader = new FileReader()

    return new Promise((res, rej) => {
        reader.onload = () => {
            res(reader.result as string)
        }
        if (file.files && file.files[0]) {
            const imageFile = file.files[0].size
            const fileSize = Math.round((imageFile / 1024))
            
            if (fileSize > 5120) {
                return 
            }
    
            reader.readAsDataURL(file.files[0])
        }
    })
}
