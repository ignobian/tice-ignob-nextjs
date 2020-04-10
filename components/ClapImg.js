import styled from 'styled-components';

export const ClapImg = styled.img`
  width: 30px;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 200ms ease-out;
  @media (min-width: 768px) {
    width: 33px;
  }
  &:hover {
    opacity: 1;
  }
`;

export default function({ style }) {
  return <ClapImg style={style} src="/images/clap.svg" />
}