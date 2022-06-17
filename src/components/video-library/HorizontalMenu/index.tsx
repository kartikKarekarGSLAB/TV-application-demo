import {
    FocusableComponentLayout,
    FocusContext,
    FocusDetails,
    useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import { useCallback, useEffect, useState } from 'react';
import { ContentBannerSection } from './bannerSection';
import { Ribbon } from './riboon';
import './../../../assets/styles/common/common-components/video-library/Content.scss';
import { RibbonRowScrollingWrapper } from './riboon/ribbonRowScrollingWrapper';

/**
 * @interface VideoLibraryContentProperties This interface is used to
 * represent the Horizontal Menu Properties.
 */
interface VideoLibraryContentProperties {
    librariesDrawerSelectedItem?: string;
    categoriesDrawerSelectedItem?: string;
    videoList?: any[];
    currentFocusItem?: any;
    currentSelectedItem?: any;
}

/**
 * This is the functional component added for the vide library content
 * section. It has below sections.
 * 1. Breadcrumb, search section.
 * 2. Banner Section
 * 3. Ribbon Section
 * @param param0 {VideoLibraryContentProperties} this is the
 * @returns
 */
function VideoLibraryContentSection({
    librariesDrawerSelectedItem = '',
    categoriesDrawerSelectedItem = '',
    videoList = [],
}: VideoLibraryContentProperties) {
    console.log(
        'VideoLibraryContentSection : librariesDrawerSelectedItem=',
        librariesDrawerSelectedItem,
        ', categoriesDrawerSelectedItem=',
        categoriesDrawerSelectedItem,
    );
    /**
     * The selected asset from the ribbon section is added into the local
     * state of this content component. When the asset is selected form ribbon
     * it will use the 'onAssetPress' callback from the below. and it will load the
     * selected asset into the state variable.
     *
     * Note:
     * When the 'enter key' pressed it will trigger the 'onAssetPress' function.
     * the onEnterPress bind function for asset will then pass the extraProps
     * object to this function as parameter, which will be stored into state.
     */
    const [selectedAssetDetails, setSelectedAssetDetails]: any = useState(null);

    const initializeSelectedAssetDetails = () => {
        console.log('---------------->> ', videoList);
        if (videoList && videoList.length && videoList[0]) {
            console.log(
                'initializeSelectedAssetDetails : The video content list of the main section is been updated. setting the preview element as first element from the list as, ',
                videoList[0],
            );
            setSelectedAssetDetails(videoList[0]);
        } else {
            setSelectedAssetDetails(null);
        }
    };

    /**
     * Please refer the below for checking how to set the configurations
     * for the 'useFocusable' hook.
     * - https://github.com/NoriginMedia/Norigin-Spatial-Navigation#usefocusable-hook
     */
    const { ref: verticalScrollingRef, focusKey } = useFocusable({
        focusable: true,
        saveLastFocusedChild: false,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        preferredChildFocusKey: '',
        onArrowPress: () => true,
        onFocus: () => {
            console.log('VideoLibraryContentSection :: default implementation for onFocus');
            initializeSelectedAssetDetails();
        },
        onBlur: () => {
            console.log('VideoLibraryContentSection :: default implementation for onBlur');
        },
    });

    useEffect(() => {
        initializeSelectedAssetDetails();
    }, [videoList]);

    /**
     * For the function definition added for the
     * on asset press callback please refer the below,
     * - https://github.com/NoriginMedia/Norigin-Spatial-Navigation#onenterrelease-function
     */
    const onAssetPress = useCallback((selectedAssetDetails) => {
        // Updating the selected asset from ribbon.
        setSelectedAssetDetails(selectedAssetDetails);
    }, []);

    /**
     * For the function definition added for the
     * on asset focus callback please refer the below,
     * - https://github.com/NoriginMedia/Norigin-Spatial-Navigation#onfocus-function
     */
    const onRowFocus = useCallback(
        (focusableComponentLayout: FocusableComponentLayout, extraProps: any, focusDetails: FocusDetails) => {
            console.log(focusableComponentLayout, ', ', extraProps, ', ', focusDetails);
            verticalScrollingRef.current.scrollTo({
                top: focusableComponentLayout.y,
                behavior: 'smooth',
            });
            setSelectedAssetDetails(extraProps);
        },
        // Updating the selected asset from ribbon.
        [verticalScrollingRef],
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <div className="video-library-content-wrapper">
                <ContentBannerSection
                    selectedAssetDetails={selectedAssetDetails}
                    librariesDrawerSelectedItem={librariesDrawerSelectedItem}
                    categoriesDrawerSelectedItem={categoriesDrawerSelectedItem}
                />
                <RibbonRowScrollingWrapper ref={verticalScrollingRef}>
                    {/**
                     * TODO:: Added below static value for initial demo.
                     * 1. Ribbon asset list.
                     *  */}
                    <Ribbon
                        ribbonAssetList={videoList}
                        onRibbonAssetFocus={onRowFocus}
                        onRibbonAssetPress={onAssetPress}
                    />
                </RibbonRowScrollingWrapper>
            </div>
        </FocusContext.Provider>
    );
}

export { VideoLibraryContentSection };
