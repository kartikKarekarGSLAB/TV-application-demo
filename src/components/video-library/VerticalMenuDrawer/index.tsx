import {
    CustomDrawerComponent,
    DEFAULT_LIBRARIES_ITEMS_LABEL_LIST,
    generateMenuDrawerList,
    generateVerticalMenuDrawerItem,
    getVerticalDrawerMenuItemIcon,
    LIBRARIES_DRAWER_FOCUS_KEY_NAME,
    LIBRARIES_DRAWER_OPEN_STATE,
    VERTICAL_DRAWER_BACK_ITEM_LABEL,
    VERTICAL_DRAWER_HOME_ITEM_LABEL,
    VERTICAL_DRAWER_LEFT_ARROW_KEY_DIRECTION,
    VERTICAL_DRAWER_RIGHT_ARROW_KEY_DIRECTION,
    VERTICAL_DRAWER_SEARCH_ITEM_LABEL,
    VERTICAL_DRAWER_SEARCH_RESULTS_ITEM_LABEL,
} from '../configurations/VerticalMenuDrawer';
import { FocusContext, KeyPressDetails, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useCallback, useEffect, useState } from 'react';
import './../../../assets/styles/common/common-components/video-library/verticalMenuDrawer/drawerStyling.scss';
import List from '@mui/material/List/List';
import { VerticalMenuDrawerItem } from './VerticalMenuDrawerListItem';
import { getSubCategories } from '../configurations/VerticalMenuDrawer/staticDemoData';

/**
 * TODO :: Add the documentation.
 */
interface VerticalMenuDrawerProperties {
    drawerLibrariesItemsList?: any[];
    drawerCategoriesItemsList?: any[];
    drawerFocusKey?: string;
    drawerOpen?: boolean;
    selectedLibrary?: string;
    selectedCategory?: string;
    setSelectedLibrary?: (selectedLibrary: string | any) => void;
    setSelectedCategory?: (selectedCategory: string | any) => void;
}

/**
 * This is the vertical menu drawer component used for the navigation of Video Library.
 * @param param0 {VerticalMenuDrawerProperties} this holds the properties for the vertical menu drawer.
 * @returns Navigation component for the application
 */
export default function VerticalMenuDrawer({
    drawerFocusKey = LIBRARIES_DRAWER_FOCUS_KEY_NAME,
    drawerOpen = LIBRARIES_DRAWER_OPEN_STATE,
    drawerLibrariesItemsList = [],
    selectedLibrary = '',
    setSelectedLibrary = (library: string): void => {
        console.log(
            'VerticalMenuDrawer :  default implementation for the setSelectedLibrary method, library =',
            library,
        );
    },
    setSelectedCategory = (category: string): void => {
        console.log(
            'VerticalMenuDrawer :  default implementation for the setSelectedCategory method, category =',
            category,
        );
    },
}: VerticalMenuDrawerProperties) {
    // This is the 'OPEN' state for the 'Drawer' component.
    const [librariesDrawerOpenState, setLibrariesDrawerOpenState] = useState(drawerOpen);
    const [drawerCurrentListElements, setDrawerCurrentListElements] = useState(drawerLibrariesItemsList);
    const [drawerCurrentSelectedLibrary, setDrawerCurrentSelectedLibrary] = useState(selectedLibrary);
    const [drawerShowBackButton, setDrawerShowBackButton] = useState(false);

    /**
     * Making the 'VerticalMenuDrawer' component as focusable.
     * Using the 'Norgin-spatial-navigation' library.
     */
    const { ref, focusKey, focusSelf } = useFocusable({
        focusKey: drawerFocusKey,
        focusable: true,
        saveLastFocusedChild: true,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        preferredChildFocusKey: '',
        onArrowPress: () => true,
        onFocus: () => {
            console.log('VerticalMenuDrawer :: default implementation for onFocus');
            openDrawerCallback();
        },
        onBlur: () => {
            console.log('VerticalMenuDrawer :: default implementation for onBlur');
            closeDrawerCallback();
        },
    });

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    /**
     * This will load the libraries again in the Drawer.
     */
    const goBackToLibrariesList = () => {
        setDrawerCurrentListElements(drawerLibrariesItemsList);
        // Reset the category selection.
        setSelectedCategory('');
        // Hide the Back Button.
        setDrawerShowBackButton(false);
    };

    /**
     * This is the callback function used to close the Drawer.
     */
    const closeDrawerCallback = () => {
        setLibrariesDrawerOpenState(false);
    };

    /**
     * This is the callback function used to open the Drawer.
     */
    const openDrawerCallback = () => {
        setLibrariesDrawerOpenState(true);
    };

    /**
     * For the function definition added for the
     * on asset press callback please refer the below,
     * - https://github.com/NoriginMedia/Norigin-Spatial-Navigation#onenterrelease-function
     *
     * Possible options from the asset list.
     *
     * 1. Home.
     * 2. Search.
     * 3. Search Result.
     * -----------------
     * 4. Back to 'XXXX' ('XXX' is selected library).
     * -----------------
     * 3. Library with categories.
     * 4. Library without categories.
     * 5. Categories.
     *
     * What will happened when clicked on resp. element from the drawer list.
     * 1. Home - It should come out from the video library.
     * 2. Search - It should open the search content in main section.
     * 3. Library with categories.
     * - It should load the resp. categories list. and a Back to 'XXX' selected library option will be added.
     * - None of the category is selected by default. Focus should remain on the Back to 'XXX',
     *   and then when user selected any specific category then it should load the resp. view in Main content section.
     * 4. Library without categories.
     * - It should load the resp. video list in Main content section.
     * 5. Categories.
     * - It should load the resp. video list in Main content section.
     */
    const onVerticalDrawerItemSelected = useCallback(
        (selectedMenuItemDetails: any, keyPressedDetails: KeyPressDetails) => {
            console.info(
                'VerticalMenuDrawer :: onVerticalDrawerItemSelected selectedMenuItemDetails =',
                selectedMenuItemDetails,
                ', keyPressedDetails=',
                keyPressedDetails,
                ', librariesDrawerOpenState=',
                librariesDrawerOpenState,
            );
            // Open the Drawer.
            openDrawerCallback();

            if (selectedMenuItemDetails) {
                const selectedMenuItemLabel: string = selectedMenuItemDetails.itemLabel;
                /**
                 * Here implies the library will be selected.
                 * The possible libraries are as below,
                 * 1. The library with sub categories. [ Education, Relaxation, Hospital, etc.]
                 * 2. The library without sub categories. [ Recommended, Suggested ]
                 *  */
                if (
                    selectedMenuItemDetails.isFirstLevelItem &&
                    !selectedMenuItemLabel.includes(VERTICAL_DRAWER_HOME_ITEM_LABEL) &&
                    !selectedMenuItemLabel.includes(VERTICAL_DRAWER_SEARCH_ITEM_LABEL) &&
                    !selectedMenuItemLabel.includes(VERTICAL_DRAWER_SEARCH_RESULTS_ITEM_LABEL)
                ) {
                    if (selectedMenuItemLabel.includes(VERTICAL_DRAWER_BACK_ITEM_LABEL)) {
                        goBackToLibrariesList();
                        return;
                    }
                    // Set the selected library label.
                    setSelectedLibrary((previousSelectedLibrary: string) => {
                        if (previousSelectedLibrary !== selectedMenuItemLabel) {
                            return selectedMenuItemLabel;
                        }
                        return previousSelectedLibrary;
                    });
                    // Reset the category selection.
                    setSelectedCategory('');
                    if (selectedMenuItemDetails.isDrillDownMenuItemsAvailable) {
                        /**
                         * TODO :: Later this will be updated with the API call that will get the list of libraries based on the
                         * selected 'library' and the resp. 'sub-category'.
                         *
                         * - Here we needed to assign the sub categories list.
                         */
                        const subCategoriesList = generateMenuDrawerList(getSubCategories(selectedMenuItemLabel));
                        if (subCategoriesList && subCategoriesList.length) {
                            // Set the selected sub categories
                            setDrawerCurrentSelectedLibrary(selectedMenuItemLabel);
                            // Show the Back Button.
                            setDrawerShowBackButton(true);
                            // Load the current Drawer list with resp. sub categories.
                            setDrawerCurrentListElements(subCategoriesList);
                        } else {
                            //TODO :: show tost error message as not categories available for the same.
                        }
                    }
                }
                /**
                 * Here implies the item is sub category item.
                 * We needed to only set the sub category of the parent state.
                 */
                if (!selectedMenuItemDetails.isFirstLevelItem) {
                    setSelectedCategory((previousSelectedMenuItemLabel: string) => {
                        if (previousSelectedMenuItemLabel !== selectedMenuItemLabel) {
                            return selectedMenuItemLabel;
                        }
                        return previousSelectedMenuItemLabel;
                    });
                }
                /**
                 * Home navigation.
                 */
                if (
                    selectedMenuItemDetails.isFirstLevelItem &&
                    selectedMenuItemLabel.includes(VERTICAL_DRAWER_HOME_ITEM_LABEL)
                ) {
                    console.info(
                        'VerticalMenuDrawer :: onVerticalDrawerItemSelected : Here implies exits from the video library, move to application grid.',
                    );
                }
                /**
                 * Search and Search Result Navigation.
                 */
                if (
                    selectedMenuItemDetails.isFirstLevelItem &&
                    (selectedMenuItemLabel.includes(VERTICAL_DRAWER_SEARCH_ITEM_LABEL) ||
                        selectedMenuItemLabel.includes(VERTICAL_DRAWER_SEARCH_RESULTS_ITEM_LABEL))
                ) {
                    console.info(
                        'VerticalMenuDrawer :: onVerticalDrawerItemSelected : Here implies Search from the video library.',
                    );
                    // TODO :: needed to work on the search navigation.
                }
            } else {
                console.error(
                    'VerticalMenuDrawer :: onVerticalDrawerItemSelected NO details available for selected item.',
                );
            }
        },
        [],
    );

    /**
     * This is the callback function for the item when there is navigation taken place using,
     * the navigation keys.
     *
     * 1. The drawer will get closed when, user navigate to main content section with right arrow.
     * 2. The drawer will get open when, user navigate to main content section with left arrow.
     */
    const onVerticalDrawerItemArrowKeysCallback = useCallback(
        (direction: string, selectedMenuItemDetails: any, keyPressedDetails: KeyPressDetails) => {
            console.info(
                'VerticalMenuDrawer :: onVerticalDrawerItemArrowKeysCallback direction=',
                direction,
                ', selectedMenuItemDetails =',
                selectedMenuItemDetails,
                ', details=',
                keyPressedDetails,
            );
            /**
             * The drawer will get closed when, user navigate to main content section with right arrow.
             * From any item of the drawer.
             *  */
            if (direction === VERTICAL_DRAWER_RIGHT_ARROW_KEY_DIRECTION) {
                closeDrawerCallback();
            }
            if (selectedMenuItemDetails) {
                // Go back to libraries section, if we click left arrow on category list element.
                const isCategoryMenuItem = selectedMenuItemDetails.isFirstLevelItem;
                if (!isCategoryMenuItem && direction === VERTICAL_DRAWER_LEFT_ARROW_KEY_DIRECTION) {
                    goBackToLibrariesList();
                }
            }
            /**
             * This callback HAS to return true if you want to proceed with the default directional navigation behavior,
             * or false if you want to block the navigation in the specified direction.
             */
            return true;
        },
        [],
    );

    return (
        // The Material Drawer Component is made custom to handle the required results.
        <CustomDrawerComponent className="drawer-menu-root" variant="permanent" open={librariesDrawerOpenState}>
            {/* Since the component is getting focused, we needed to wrap this into the "FocusContext". */}
            <FocusContext.Provider value={focusKey}>
                <List ref={ref}>
                    {/*
                        This is the Section1 of Drawer.
                        1. Search
                        2. Search [Optional Added if search text added].
                        3. Home.
                    */}
                    {DEFAULT_LIBRARIES_ITEMS_LABEL_LIST.map((defaultItemLabel: string) => {
                        return generateVerticalMenuDrawerItem(
                            defaultItemLabel,
                            defaultItemLabel,
                            getVerticalDrawerMenuItemIcon(defaultItemLabel),
                            true,
                            false,
                            [],
                            librariesDrawerOpenState,
                            onVerticalDrawerItemSelected,
                            onVerticalDrawerItemArrowKeysCallback,
                        );
                    })}
                    {/* 
                        This is the Section2 of Drawer.
                        - Item for "Back to XXXX" option shown when a item will have further categories available.
                    */}
                    {drawerShowBackButton
                        ? generateVerticalMenuDrawerItem(
                              VERTICAL_DRAWER_BACK_ITEM_LABEL + drawerCurrentSelectedLibrary,
                              drawerCurrentSelectedLibrary,
                              getVerticalDrawerMenuItemIcon(VERTICAL_DRAWER_BACK_ITEM_LABEL),
                              true,
                              false,
                              [],
                              librariesDrawerOpenState,
                              onVerticalDrawerItemSelected,
                              onVerticalDrawerItemArrowKeysCallback,
                          )
                        : ''}
                    {/*
                        This is the Section3 of Drawer.
                        This will display the currently available libraries/categories.
                    */}
                    {drawerCurrentListElements.map((drawerListElement: any) => (
                        <VerticalMenuDrawerItem
                            key={drawerListElement.itemLabel}
                            menuItemDetails={drawerListElement}
                            verticalMenuDrawerOpenState={librariesDrawerOpenState}
                            onEnterPress={onVerticalDrawerItemSelected}
                            onArrowPress={onVerticalDrawerItemArrowKeysCallback}
                        ></VerticalMenuDrawerItem>
                    ))}
                </List>
            </FocusContext.Provider>
        </CustomDrawerComponent>
    );
}
