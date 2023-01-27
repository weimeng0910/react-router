import React from 'react';
import { Global, css } from '@emotion/react';
//import Root from '@/router';
//import Test from '@/pages/test';
//import Test2 from '@/pages/text2';
//import Test3 from '@/pages/flex-css';
import ReduxText from '@/pages/reduxText';
//定义全局样式
const GlobalStyles = css`
  * {
    padding: 0;
    margin: 0;
  }
`;
const App = () => {
  return (
    <>
      {/*<Root />*/}
      {/*<Test />*/}
      {/*<Test2 />*/}
      <Global styles={GlobalStyles} />
      {/*<Test3 />*/}
      <ReduxText />
    </>
  );
};

export default App;
