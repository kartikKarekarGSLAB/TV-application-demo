import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import {
    KeyPressDetails,
    FocusableComponentLayout,
    FocusDetails,
    useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import { useCallback } from 'react';
import { MENU_ICON_STYLING } from '../../configurations/VerticalMenuDrawer';
import './../../../../assets/styles/common/common-components/video-library/verticalMenuDrawer/drawerStyling.scss';

/**
 * TODO :: Add documentation.
 */
interface VerticalMenuDrawerItemDetailsProps {
    itemId: string;
    itemLabel: string;
    itemLink: string;
    icon: any;
    isFirstLevelItem?: boolean;
    isDrillDownMenuItemsAvailable?: boolean;
    drillDownMenuItems?: any[];
}

/**
 * @interface VerticalMenuDrawerItemProps This interface used to defined the VerticalMenuDrawerItemProps.
 * It as the required properties needed for the menu item inside the drawer.
 * @property menuItemLabel {string} value used too represent the label.
 * @property verticalMenuDrawerOpenState {boolean} this is the boolean value used to open/close the menu drawer.
 * @property onEnterPress {function} this will be the callback function when the enter key pressed on the asset.
 * @property onFocus {function} this will be the callback function when the asset component has focus.
 */
interface VerticalMenuDrawerItemProps {
    menuItemDetails: VerticalMenuDrawerItemDetailsProps | any;
    verticalMenuDrawerOpenState: boolean;
    onEnterPress?: (props: any, details: KeyPressDetails) => void;
    onArrowPress?: (direction: string, props: any, details: KeyPressDetails) => boolean;
    onFocus?: (layout: FocusableComponentLayout, props: any, details: FocusDetails) => void;
}

/**
 * This is the functional component used to represent the Menu Item in the
 * Drawer. This will have the Leaf Focusable component. which as the 'focused'
 * used from the useFocusable hook of the library. The 'ref' will be is required
 * to link the DOM element with the hook. (to measure its coordinates, size etc.)
 * @param param0 {VerticalMenuDrawerItemProps} Menu item configurations.
 * @returns Menu Item Component.
 */
export function VerticalMenuDrawerItem({
    verticalMenuDrawerOpenState,
    menuItemDetails,
    onEnterPress,
    onArrowPress,
    onFocus,
}: VerticalMenuDrawerItemProps) {
    const { ref, focused } = useFocusable({
        onEnterPress: useCallback((selectedMenuDetails: any, details: KeyPressDetails) => {
            onEnterPress ? onEnterPress(selectedMenuDetails, details) : '';
            console.log(details);
        }, []),
        onArrowPress,
        onFocus,
        extraProps: { ...menuItemDetails },
    });
    const verticalMenuDrawerItemClassList = '';
    return (
        <ListItem key={menuItemDetails.itemId} ref={ref} disablePadding className="vertical-menu-drawer-item-wrapper">
            <ListItemButton className={focused ? 'vertical-menu-drawer-item-focused' : verticalMenuDrawerItemClassList}>
                <ListItemIcon sx={MENU_ICON_STYLING}>{menuItemDetails.icon}</ListItemIcon>
                <ListItemText
                    primary={menuItemDetails.itemLabel}
                    sx={{ opacity: verticalMenuDrawerOpenState ? 1 : 0 }}
                />
            </ListItemButton>
        </ListItem>
    );
}
