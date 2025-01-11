import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

// Pretendard font imports
import PretendardRegular from '../assets/fonts/Pretendard-Regular.woff2';
import PretendardBold from '../assets/fonts/Pretendard-Bold.woff2';

const GlobalStyles = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'Pretendard';
    src: url(${PretendardRegular}) format('woff2'),
         url(${PretendardBold}) format('woff2');
    font-style: normal;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; /* 1rem = 10px */
    width: 100%;
    height: 100%;
  }

  body {
    font-family: 'Pretendard', sans-serif;
    font-size: 1.6rem;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #f8f9fa;
    overflow-x: hidden;
    width: 360px;
    height: 740px;
    margin: auto; /* 화면 가운데 정렬 */
    border : 1px solid black;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    font-family: inherit;
    font-size: inherit;
    background: none;
    border: none;
    cursor: pointer;
  }

  input, textarea {
    font-family: inherit;
    font-size: inherit;
    outline: none;
  }

  .container {
    width: 100%;
    max-width: 360px;
    height: 740px;
    margin: auto;
    padding: 0 20px;
  }
`;

export default GlobalStyles;
