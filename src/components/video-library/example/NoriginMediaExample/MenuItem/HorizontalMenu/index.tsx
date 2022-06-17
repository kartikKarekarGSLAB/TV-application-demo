import {
    FocusableComponentLayout,
    FocusDetails,
    KeyPressDetails,
    useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import styled from 'styled-components';

/**
 * This styled-component used  by the Asset as wrapper.
 */
const VerticalAssetWrapper = styled.div`
    margin-right: 22px;
    display: flex;
    flex-direction: column;
`;

/**
 * @VerticalAssetBoxProps This interface is used to manage the styling of
 * vertical row assets styling. This will have 2 properties 'color' and 'focused'
 * @property focused {boolean} used by the component to set the focused.
 * Note : further if we needed any properties we can use as needed.
 */
interface VerticalAssetBoxProps {
    focused: boolean;
    color: string;
}

/**
 * This is the styled-component used to represent the Asset.
 * The asset will be the element from the vertical row.
 */
const VerticalAssetBox = styled.div<VerticalAssetBoxProps>`
    width: 225px;
    height: 127px;
    background-color: ${({ color }) => color};
    border-color: white;
    border-style: solid;
    border-width: ${({ focused }) => (focused ? '6px' : 0)};
    box-sizing: border-box;
    border-radius: 7px;
`;

/**
 * This is the styled-component used to represent the Asset title.
 * The asset will be the element from the vertical row.
 */
const AssetTitle = styled.div`
    color: white;
    margin-top: 10px;
    font-family: 'Segoe UI';
    font-size: 24px;
    font-weight: 400;
`;

/**
 * @interface VerticalAssetProps This interface used to represent the properties of
 * vertical asset.
 * @property title {string} title used to represent the title of the asset shown.
 * @property color {string} color used be filled inside the asset wrapper.
 * @property onEnterPress {function} this will be the callback function when the enter key pressed on the asset.
 * @property onFocus {function} this will be the callback function when the asset component has focus.
 */

interface VerticalAssetProps {
    title: string;
    color: string;
    onEnterPress: (props: any, details: KeyPressDetails) => void;
    onFocus: (layout: FocusableComponentLayout, props: any, details: FocusDetails) => void;
}

/**
 * This is the functional component used by the vertical menu to display the assets.
 * @param param0 {VerticalAssetProps}
 * @returns functional component to represent the asset from the menu.
 */
function VerticalAsset({ title, color, onEnterPress, onFocus }: VerticalAssetProps) {
    const { ref, focused } = useFocusable({
        onEnterPress,
        onFocus,
        extraProps: {
            title,
            color,
        },
    });

    return (
        <VerticalAssetWrapper ref={ref}>
            <VerticalAssetBox color={color} focused={focused} />
            <AssetTitle>{title}</AssetTitle>
        </VerticalAssetWrapper>
    );
}

export { VerticalAsset };
