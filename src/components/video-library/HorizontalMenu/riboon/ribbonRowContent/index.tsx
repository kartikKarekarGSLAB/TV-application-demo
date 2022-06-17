import {
    FocusableComponentLayout,
    FocusContext,
    FocusDetails,
    KeyPressDetails,
    useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import styled from 'styled-components';
import { RibbonAsset } from '../ribbonElement';

/**
 * @interface RibbonRowContentProperties This is the interface used for displaying
 * the ribbon content.
 * @property reference {any} needed to handle the scrolling effect for the ribbon content.
 * @property ribbonContentList {any[]} content being rendered inside the ribbon row.
 */
interface RibbonRowContentProperties {
    reference?: any;
    ribbonContentList: any[];
    onAssetPress: (props: any, details: KeyPressDetails) => void;
    onAssetFocus: (
        focusableComponentLayout: FocusableComponentLayout,
        extraProps: any,
        focusDetails: FocusDetails,
    ) => void;
}

/**
 * This is the style component used to represent scrolling Wrapper.
 */
const ContentRowScrollingWrapper = styled.div`
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    margin-bottom: 1vh;
`;

/**
 * This is the functional component used to represent the
 * content of row.
 * @param param0 ribbon row content properties
 * @returns
 */
const RibbonRowContent = function ({ ribbonContentList, onAssetPress, onAssetFocus }: RibbonRowContentProperties) {
    const { ref, focusKey } = useFocusable({});
    return (
        <FocusContext.Provider value={focusKey}>
            <ContentRowScrollingWrapper ref={ref}>
                {ribbonContentList.map((element: any) => (
                    <RibbonAsset
                        key={element.videoId}
                        assetDetails={element}
                        onEnterPress={onAssetPress}
                        onFocus={onAssetFocus}
                    />
                ))}
            </ContentRowScrollingWrapper>
        </FocusContext.Provider>
    );
};
export { RibbonRowContent };
