import styled, { css } from 'styled-components';

const buttonStyles = css`
  color: white!important;
  padding: 7px 12px;
  border-radius: 5px;
  border: none;
  background-color: ${props => props.theme.primary.main};
  box-shadow: 1px 1px 5px rgba(0,0,0,.3);
  transition: background-color 200ms ease-out, box-shadow 200ms ease-out;
  white-space: nowrap;
  &:hover {
    box-shadow: 1px 2px 7px rgba(0,0,0,.4);
    background-color: ${props => props.theme.primary.hover};
  }
`;

const buttonOutlineStyles = css`
  padding: 7px 12px;
  border-radius: 5px;
  color: ${props => props.theme.primary.main}!important;
  border: 1px solid ${props => props.theme.primary.main};
  white-space: nowrap;
  transition: background-color 200ms ease-out, box-shadow 200ms ease-out, color 200ms ease-out;
  &:hover {
    background-color: ${props => props.theme.primary.main};
    color: white!important;
  }
`;

const secondaryButtonStyles = css`
  padding: 7px 12px;
  border-radius: 5px;
  color: ${props => props.theme.secondary.main};
  white-space: nowrap;
  border: 1px solid ${props => props.theme.secondary.main};
  transition: color 200ms ease-out, border 200ms ease-out;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.secondary.hover};
    border: 1px solid ${props => props.theme.secondary.hover}; 
  }
`;

export const ButtonLink = styled.a`
  ${buttonStyles}
`;

export const Button = styled.button`
  ${buttonStyles}
`;

export const ButtonOutline = styled.button`
  ${buttonOutlineStyles}
`;

export const ButtonOutlineLink = styled.a`
  ${buttonOutlineStyles}
`;

export const SecondaryButton = styled.button`
  ${secondaryButtonStyles}
`;

export const SecondaryButtonLink = styled.a`
  ${secondaryButtonStyles}
`;

export const SecondaryButtonLabel = styled.label`
  ${secondaryButtonStyles}
`;

export const NoButton = styled.button`
  border: none;
  background-color: transparent;
  border-radius: 5px;
  color: ${props => props.theme.bodyColor};
`;

// buttons for categories
export const CategoryBtn = styled.a`
  background-color: #fdfdfd;
  color: #333!important;
  border-radius: 50px;
  font-size: 16px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  padding: 10px 20px;
  font-weight: light;
  white-space: nowrap;
  /* border: 1px solid ${props => props.theme.primary.main}; */
  box-shadow: 1px 1px 5px rgba(0,0,0,.2);
  transition: box-shadow 150ms ease-out;
  &:hover {
    box-shadow: 2px 2px 5px rgba(0,0,0,.3);
  }
`;

// buttons for tags
export const TagBtn = styled.a`
  background-color: #efefef;
  border: 1px solid #efefef;
  border-radius: 50px;
  font-size: 12px;
  padding: 7px 17px;
  @media (min-width: 768px) {
    font-size: 14px;
    padding: 10px 20px;
  }
  white-space: nowrap;
  /* border: 1px solid ${props => props.theme.primary.main}; */
  transition: border 150ms ease-out, background-color 150ms ease-out;
  &:hover {
    border: 1px solid #cdcdcd;
    background-color: white;
  }
`;