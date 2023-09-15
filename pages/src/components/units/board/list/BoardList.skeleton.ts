import styled from "styled-components"

const SkeletonItem = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 5px;

  @keyframes skeleton-loader {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  :before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      270deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0)
    );
    transform: translateX(-100%);
    animation: skeleton-loader 2s infinite;
  }
`

export default SkeletonItem
