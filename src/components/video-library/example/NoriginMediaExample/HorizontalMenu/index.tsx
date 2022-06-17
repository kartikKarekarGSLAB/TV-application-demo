import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { VIDEO_SUB_CATEGORY } from '../configurations/HorizontalMenu';
import { HeroMenuSelection } from './HeroMenuSelection';
import { HorizontalMenuRow } from './MenuRow';

const ContentWrapper = styled.div`
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

const ContentTitle = styled.div`
    color: white;
    font-size: 48px;
    font-weight: 600;
    font-family: 'Segoe UI';
    text-align: center;
    margin-top: 52px;
    margin-bottom: 37px;
`;

const ScrollingRows = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    flex-shrink: 1;
    flex-grow: 1;
`;

/**
 * @interface HorizontalMenuProps This interface is used to
 * represent the Horizontal Menu Properties.
 * @property focusKey {string} used by the focused containers, which serves as a
 * Parent Focus Key for them. This way your focusable children components can be
 * deep in the DOM tree while still being able to know who is their Focusable Parent.
 */
interface HorizontalMenuProps {
    focusKey?: string;
}

function Content({ focusKey: focusKeyParameter }: HorizontalMenuProps) {
    const { ref, focusKey, focusSelf } = useFocusable({
        focusable: true,
        focusKey: focusKeyParameter,
        saveLastFocusedChild: false,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        preferredChildFocusKey: '',
        onEnterPress: () => {
            console.log('default implementation for onEntrePress');
        },
        onEnterRelease: () => {
            console.log('default implementation for onEntreRelease');
        },
        onArrowPress: () => true,
        onFocus: () => {
            console.log('default implementation for onFocus');
        },
        onBlur: () => {
            console.log('default implementation for onBlur');
        },
        extraProps: { foo: 'bar' },
    });

    const [selectedAsset, setSelectedAsset]: any = useState(null);

    const onAssetPress = useCallback((asset) => {
        setSelectedAsset(asset);
    }, []);

    const onRowFocus = useCallback(
        ({ y }) => {
            ref.current.scrollTo({
                top: y,
                behavior: 'smooth',
            });
        },
        [ref],
    );

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    return (
        <FocusContext.Provider value={focusKey}>
            <ContentWrapper>
                <ContentTitle>Patient Connect Video Library</ContentTitle>
                <HeroMenuSelection
                    color={selectedAsset ? selectedAsset.color : '#565b6b'}
                    title={selectedAsset ? selectedAsset.title : `Press 'Enter' to select the menu`}
                />
                <ScrollingRows ref={ref}>
                    <div>
                        {VIDEO_SUB_CATEGORY.map(({ title }) => (
                            <HorizontalMenuRow
                                key={title}
                                title={title}
                                onAssetPress={onAssetPress}
                                onFocus={onRowFocus}
                            />
                        ))}
                    </div>
                </ScrollingRows>
            </ContentWrapper>
        </FocusContext.Provider>
    );
}

export { Content };
