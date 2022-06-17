import { Typography } from '@mui/material';
import './../../../../../assets/styles/common/common-components/video-library/ribbon/RibbonStyle.scss';

/**
 * @interface RibbonAssetBadgeProps This interface used to represent the properties of
 * ribbon asset badging.
 * @property badgeType {string} type of badge.
 * @property badgeContent {any} content of badge used to be added inside the badge icon.
 */

interface RibbonAssetBadgeProps {
    badgeType?: string;
    badgeContent?: any;
}

/**
 * This is the functional component used by the vertical menu to display the assets.
 *
 * Note : Here we have used the Card ot add the layout or the ribbon elements.
 * - https://mui.com/material-ui/react-card/
 * @param param0 {RibbonAssetBadgeProps}
 * @returns functional component to represent the asset from the menu.
 */
function RibbonAssetBadge({ badgeContent }: RibbonAssetBadgeProps) {
    return (
        <div className="asset-badge-success-top-right">
            <Typography variant="body1">{badgeContent}</Typography>
        </div>
    );
}

export { RibbonAssetBadge };
