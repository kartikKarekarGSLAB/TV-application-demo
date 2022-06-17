import './configurations/initialization';
import { VerticalMenu } from './VerticalMenu';
import { VerticalMenuFocusKey } from './configurations/VerticalMenu';
import { GlobalStyle } from './configurations/styling/GlobalStyle';
import { VideoLibraryWrapper } from './Wrappers/VideoLibrary';
import { Content } from './HorizontalMenu';

function VideoLibraryExample() {
    return (
        <VideoLibraryWrapper>
            <GlobalStyle />
            <VerticalMenu focusKey={VerticalMenuFocusKey} />
            <Content focusKey={VerticalMenuFocusKey} />
        </VideoLibraryWrapper>
    );
}

export { VideoLibraryExample };
