import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(255,255,255,.5);
  z-index: 3;
`;

const Loading = () => {
  return (
    <Container>
      <div className="d-flex align-items-center justify-content-center h-100">
        <img width="100" src="/images/loading.svg" alt="Loading..."/>
      </div>
    </Container>
  )
}

export default Loading;