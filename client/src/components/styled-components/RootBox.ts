import styled from 'styled-components'

type RootBoxType = {
    flexDirectionMedia?: string
    alignItemsMedia?: string
}

export const RootBox = styled.div<RootBoxType>`
    display: flex;
    align-items: flex-start;

    @media screen and (max-width: 768px) {
        flex-direction: ${props => props.flexDirectionMedia};
        align-items: ${props => props.alignItemsMedia || 'flex-start'};
    }
`