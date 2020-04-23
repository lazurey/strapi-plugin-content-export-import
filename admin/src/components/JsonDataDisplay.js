import React from 'react';
import styled from 'styled-components';

const CodeWrapper = styled.pre`
  margin: 1.2rem 0;
  background: #efefef;
  height: 20rem;
  line-height: 2rem;
  overflow: scroll;
  width: 100%;
  border-radius: .4rem;
  padding: 1.2rem;
  white-space: pre-wrap;
`;

const JsonDataDisplay = ({ data }) => {
  return (<div>
    <CodeWrapper>
      {
        JSON.stringify(data, null, 4)
      }
    </CodeWrapper>
  </div>)
};

export default JsonDataDisplay;
