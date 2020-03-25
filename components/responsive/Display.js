import styled from 'styled-components';

export const DisplaySm = styled.div`
  display: none;
  @media (min-width: 576px) {
    display: block;
  }
`;

export const DisplayMd = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

export const DisplayLg = styled.div`
  display: none;
  @media (min-width: 992px) {
    display: block;
  }
`;

export const DisplayXl = styled.div`
  display: none;
  @media (min-width: 1200px) {
    display: block;
  }
`;

export const DisplaySmallerThanMd = styled.div`
  display: block;
  @media (min-width: 768px) {
    display: none;
  }
`;

export const DisplaySmallerThanLg = styled.div`
  display: block;
  @media (min-width: 992px) {
    display: none;
  }
`;