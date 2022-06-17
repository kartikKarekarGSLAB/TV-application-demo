import {
    FocusableComponentLayout,
    FocusContext,
    FocusDetails,
    KeyPressDetails,
    useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import { useCallback, useRef } from 'react';
import { VIDEO_ASSET } from '../../configurations/HorizontalMenu';
import { VerticalAsset } from '../../MenuItem/HorizontalMenu';
import { ContentRowTitle } from './ContentRowTitle';
import { ContentRowWrapper } from './ContentRowWrapper';
import { ContentRowScrollingContent, ContentRowScrollingWrapper } from './ScrollingRowContent';

/**
 * @interface ContentRowProps This interface is used to represent the ContentRowProps
 * @property {title} string represent the row title.
 * @property {onAssetPress} function is the callback function when the asset from the row is selected.
 * @property {onFocus} function is the callback function when the asset from the row has focused.
 */
interface ContentRowProps {
    title: string;
    onAssetPress: (props: any, details: KeyPressDetails) => void;
    onFocus: (layout: FocusableComponentLayout, props: any, details: FocusDetails) => void;
}

/**
 * This is the functional component representing the Horizontal Menu Row.
 * @param param0 {ContentRowProps}
 * @returns
 */
function HorizontalMenuRow({ title: rowTitle, onAssetPress, onFocus }: ContentRowProps) {
    const { ref, focusKey } = useFocusable({
        onFocus,
    });

    const scrollingRef: any = useRef(null);

    const onAssetFocus = useCallback(
        ({ x }) => {
            scrollingRef.current.scrollTo({
                left: x,
                behavior: 'smooth',
            });
        },
        [scrollingRef],
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <ContentRowWrapper ref={ref}>
                <ContentRowTitle>{rowTitle}</ContentRowTitle>
                <ContentRowScrollingWrapper ref={scrollingRef}>
                    <ContentRowScrollingContent>
                        {VIDEO_ASSET.map(({ title, color }) => (
                            <VerticalAsset
                                key={title}
                                title={title}
                                color={color}
                                onEnterPress={onAssetPress}
                                onFocus={onAssetFocus}
                            />
                        ))}
                    </ContentRowScrollingContent>
                </ContentRowScrollingWrapper>
            </ContentRowWrapper>
        </FocusContext.Provider>
    );
}

export { HorizontalMenuRow };
