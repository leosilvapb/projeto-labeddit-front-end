import styled from "styled-components";
import {theme} from '../../styles/theme'

export const HeaderStyled = styled.header`
height: 50px;
background-color: ${theme.colors.gray['500']};
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 6px;
position: relative;
`

export const LogoHeader = styled.img`
width: 28px;
`

export const LinkText = styled.p`
color: ${theme.colors.blue['500']};
position: absolute;
right: 20px;
font-size: 18px;
font-weight: bold;
cursor: pointer;
`

export const BackIcon = styled.img`
position: absolute;
left: 20px;
height:24px;
cursor: pointer;
`

export const UserName = styled.p`
color: ${theme.colors.gray['700']};
position: absolute;
left: ${({page})=> page==='post'?'64px':'20px'};
font-size: 12px;
font-weight: bold;
`