import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    position: relative;
    min-height: 100vh;
  }

  .react-confirm-alert-overlay {
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    z-index: 999;
  }
`;
