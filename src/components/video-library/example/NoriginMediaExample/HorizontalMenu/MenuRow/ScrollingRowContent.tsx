import styled from 'styled-components';

const ContentRowScrollingWrapper = styled.div`
    overflow-x: auto;
    overflow-y: hidden;
    flex-shrink: 1;
    flex-grow: 1;
    padding-left: 60px;
`;

const ContentRowScrollingContent = styled.div`
    display: flex;
    flex-direction: row;
`;

export { ContentRowScrollingWrapper, ContentRowScrollingContent };
