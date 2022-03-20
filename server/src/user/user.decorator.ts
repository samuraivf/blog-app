import { createParamDecorator } from '@nestjs/common'

import { UserRequest } from 'src/posts/dto/user-request'

export const User = createParamDecorator((data, req: UserRequest) => {
    return req.user
})
