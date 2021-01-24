import styled from 'styled-components'

export const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Body = styled.div`
  width: 100%;
  height: 92%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.color};
`
