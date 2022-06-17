import { CSSObject, styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import './../../../../assets/styles/common/common-components/video-library/verticalMenuDrawer/drawerStyling.scss';
import { Home, OndemandVideo, Search, ArrowBack } from '@mui/icons-material';
import { KeyPressDetails } from '@noriginmedia/norigin-spatial-navigation';
import { VerticalMenuDrawerItem } from '../../VerticalMenuDrawer/VerticalMenuDrawerListItem';

export const VERTICAL_DRAWER_LEFT_ARROW_KEY_DIRECTION = 'left';

export const VERTICAL_DRAWER_RIGHT_ARROW_KEY_DIRECTION = 'right';

export const VERTICAL_DRAWER_UP_ARROW_KEY_DIRECTION = 'up';

export const VERTICAL_DRAWER_DOWN_ARROW_KEY_DIRECTION = 'down';

export const VERTICAL_DRAWER_HOME_ITEM_LABEL = 'Home';

export const VERTICAL_DRAWER_SEARCH_ITEM_LABEL = 'Search';

export const VERTICAL_DRAWER_LIBRARY_ITEM_LABEL = 'library';

export const VERTICAL_DRAWER_SEARCH_RESULTS_ITEM_LABEL = 'Search Results';

export const VERTICAL_DRAWER_BACK_ITEM_LABEL = 'Back to ';

export const LIBRARIES_DRAWER_FOCUS_KEY_NAME = 'LIBRARIES_DRAWER_FOCUS_KEY';

export const LIBRARIES_DRAWER_OPEN_STATE = false;

export const DEFAULT_LIBRARIES_ITEMS_LABEL_LIST = [VERTICAL_DRAWER_HOME_ITEM_LABEL, VERTICAL_DRAWER_SEARCH_ITEM_LABEL];

/**
 * The following function will return the icon for the respective label text.
 *
 * @param listItemLabelText {string} label text string.
 * @returns MaterialIcon for the respective label text.
 */
export const getVerticalDrawerMenuItemIcon = (listItemLabelText?: string) => {
    if (listItemLabelText === VERTICAL_DRAWER_HOME_ITEM_LABEL) {
        return <Home />;
    } else if (listItemLabelText === VERTICAL_DRAWER_SEARCH_ITEM_LABEL) {
        return <Search />;
    } else if (listItemLabelText === VERTICAL_DRAWER_BACK_ITEM_LABEL) {
        return <ArrowBack />;
    } else if (listItemLabelText === VERTICAL_DRAWER_LIBRARY_ITEM_LABEL) {
        return <OndemandVideo />;
    }
    return '';
};

/**
 * TODO :: Add documentation.
 */
export const generateListElementDetails = (
    itemLabel: string,
    itemLink: string,
    itemIcon: any,
    isFirstLevelItem: boolean,
    isDrillDownMenuItemsAvailable: boolean,
    drillDownMenuItems: any[] = [],
) => {
    return {
        itemId: itemLabel,
        itemLabel: itemLabel,
        itemLink: itemLink,
        icon: itemIcon,
        isFirstLevelItem: isFirstLevelItem,
        isDrillDownMenuItemsAvailable: isDrillDownMenuItemsAvailable,
        drillDownMenuItems: drillDownMenuItems,
    };
};

/**
 * TODO :: Add documentation.
 */
export const generateVerticalMenuDrawerItem = (
    itemLabel: string,
    itemLink: string,
    itemIcon: any,
    isFirstLevelItem: boolean,
    isDrillDownMenuItemsAvailable: boolean,
    drillDownMenuItems: any[] = [],
    verticalMenuDrawerOpenState: boolean,
    onEnterPress: (props: any, details: KeyPressDetails) => void,
    onArrowPress?: (direction: string, props: any, details: KeyPressDetails) => boolean,
) => {
    return (
        <VerticalMenuDrawerItem
            key={itemLabel}
            menuItemDetails={generateListElementDetails(
                itemLabel,
                itemLink,
                itemIcon,
                isFirstLevelItem,
                isDrillDownMenuItemsAvailable,
                drillDownMenuItems,
            )}
            verticalMenuDrawerOpenState={verticalMenuDrawerOpenState}
            onEnterPress={onEnterPress}
            onArrowPress={onArrowPress}
        ></VerticalMenuDrawerItem>
    );
};

/**
 * TODO :: Add documentation.
 */
export const generateMenuDrawerList = (itemsList: any[]) => {
    if (itemsList && itemsList.length) {
        return itemsList
            .map((item: any) =>
                generateListElementDetails(item.categoryName, '', getVerticalDrawerMenuItemIcon(), false, false, []),
            )
            .sort((a: any, b: any) => (a.itemLabel > b.itemLabel ? 1 : b.itemLabel > a.itemLabel ? -1 : 0));
    }
    return [];
};

/**
 * This the width of outer drawer, when the drawer is in open state.
 */
export const OPEN_DRAWER_WIDTH = 'var(--drawer-outer-open-width, 100vw)';
/**
 * This the width of outer drawer, when the drawer is in close state.
 */
export const CLOSE_DRAWER_WIDTH = 'var(--drawer-outer-close-width, 4vw)';
/**
 * This the style of outer drawer.
 */
export const DRAWER_COMMON_STYLING = {
    background: 'linear-gradient(90deg, rgba(11,44,72,1) 2%, rgba(11,44,72,0) 60%, rgba(0,211,254,0) 100%);',
    color: 'var(--ui-03, #ffffff)',
};

/**
 * This is the mixin created to get the style object when the drawer is in OPEN state.
 * @returns CSSObject
 */
export const openedMixin = (): CSSObject => ({
    ...DRAWER_COMMON_STYLING,
    width: OPEN_DRAWER_WIDTH,
});

/**
 * This is the mixin created to get the style object when the drawer is in CLOSE state.
 * @returns CSSObject
 */
export const closedMixin = (): CSSObject => ({
    ...DRAWER_COMMON_STYLING,
    width: CLOSE_DRAWER_WIDTH,
    backgroundColor: 'var(--selected-ui-background, #203240) !important',
});

/**
 * This is the Custom Component created for Drawer Navigation.
 * This will accept the property as 'open' which determine the styling of the drawer component.
 */
export const CustomDrawerComponent = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ open }) => ({
        ...{
            '& .MuiDrawer-paper': open ? openedMixin() : closedMixin(),
        },
    }),
);

export const MENU_ICON_STYLING = {
    color: 'var(--ui-03, #ffffff)',
};
