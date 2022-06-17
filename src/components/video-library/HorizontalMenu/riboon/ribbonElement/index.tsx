import { ImageListItem, ImageListItemBar, Typography } from '@mui/material';
import {
    FocusableComponentLayout,
    FocusDetails,
    KeyPressDetails,
    useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import styled from 'styled-components';
import { RibbonAssetBadge } from '../ribbonElementBadge';
import './../../../../../assets/styles/common/common-components/video-library/ribbon/RibbonStyle.scss';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/**
 * This styled-component used  by the Asset as wrapper.
 */
const RibbonAssetWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

/**
 * @interface RibbonAssetProperties This interface used to represent the properties of
 * ribbon asset.
 * @property assetDetails {object} this is the object having configuration needed to be displayed for the asset.
 * @property onEnterPress {function} this will be the callback function when the enter key pressed on the asset.
 * @property onFocus {function} this will be the callback function when the asset component has focus.
 */

interface RibbonAssetProperties {
    assetDetails: any;
    onEnterPress?: (props: any, details: KeyPressDetails) => void;
    onFocus?: (layout: FocusableComponentLayout, props: any, details: FocusDetails) => void;
}

/**
 * This is the functional component used by the vertical menu to display the assets.
 *
 * Note : Here we have used the Card ot add the layout or the ribbon elements.
 * - https://mui.com/material-ui/react-card/
 * @param param0 {RibbonAssetProperties}
 * @returns functional component to represent the asset from the menu.
 */
function RibbonAsset({ assetDetails, onEnterPress, onFocus }: RibbonAssetProperties) {
    const { ref, focused } = useFocusable({
        onEnterPress,
        onFocus,
        /**
         * NOTE.
         * This structure is more important,
         * since this value will be passed to callback function.
         * where the current focus element's properties will be passed to upper layer.
         *  */
        extraProps: {
            ...assetDetails,
        },
    });

    // TODO:: considering currently we showing badge for completed videos only.
    const showBadge =
        assetDetails &&
        assetDetails.contentVideoProgressVO &&
        assetDetails.contentVideoProgressVO.viewedPercentage &&
        assetDetails.contentVideoProgressVO.viewedPercentage === 100;
    // TODO:: considering currently we showing badge for completed videos only.
    // TODO:: needed to update the badge content wrt type.
    const badgeContent = <CheckCircleIcon />;

    return (
        <RibbonAssetWrapper ref={ref}>
            <ImageListItem
                className={focused ? 'ribbon-asset ribbon-asset-focused' : 'ribbon-asset'}
                style={{ height: 173 }}
            >
                <img
                    src={assetDetails.thumbnailUri ? assetDetails.thumbnailUri : ''}
                    alt={assetDetails.title ? assetDetails.title : ''}
                    loading="lazy"
                />
                {/* Note :: Add the badge only when needed. */}
                {showBadge ? <RibbonAssetBadge badgeContent={badgeContent} /> : ''}
                <Typography gutterBottom variant="body2" component="div" sx={{ padding: 0 }}>
                    <ImageListItemBar
                        className="ribbon-asset-title"
                        title={
                            assetDetails.title ? (
                                <Typography gutterBottom variant="body2">
                                    {assetDetails.title}
                                </Typography>
                            ) : (
                                ''
                            )
                        }
                    />
                </Typography>
            </ImageListItem>
        </RibbonAssetWrapper>
    );
}

export { RibbonAsset };
