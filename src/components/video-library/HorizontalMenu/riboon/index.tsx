import {
    FocusableComponentLayout,
    FocusContext,
    FocusDetails,
    KeyPressDetails,
    useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import { useCallback } from 'react';
import { RibbonRowContent } from './ribbonRowContent';
import { RibbonRowWrapper } from './ribbonRowWrapper';

/**
 * @interface RibbonProperties This interface represent the properties needed for any
 * ribbon to display the elements.
 * @property {array} ribbonAssetList Represent the list of asset's we needed to be added inside the
 * respective ribbon.
 * @property {function} onRibbonAssetPress Callback function for the asset form
 * the ribbon is 'Selected'/'Clicked' by 'Enter'/'Ok' key from the input device.
 * @property {function} onRibbonAssetFocus Callback function for the asset from
 * the ribbon when it get focused.
 */
interface RibbonProperties {
    ribbonAssetList: any[] | any;
    onRibbonAssetPress: (props: any, details: KeyPressDetails) => void;
    onRibbonAssetFocus: (
        focusableComponentLayout: FocusableComponentLayout,
        extraProps: any,
        focusDetails: FocusDetails,
    ) => void;
}

/**
 * This is the size of elements inside one ribbon row.
 */
const RIBBON_ROW_SIZE = 4;

/**
 * This function will iterate over the assets list, and based on the 'RIBBON_SIZE'
 * the list will be divided into the smaller chunks. those chunks will be divided
 * added into the ribbon assets chunks list and the list will be returned.
 * @param ribbonAssetsList ribbon assets list
 * @returns {array} Array of chunks or empty
 */
function createRibbonListChunks(ribbonAssetsList: any[]) {
    const ribbonAssetChunksList = [];
    for (let index = 0; index < ribbonAssetsList.length; index += RIBBON_ROW_SIZE) {
        ribbonAssetChunksList.push(ribbonAssetsList.slice(index, index + RIBBON_ROW_SIZE));
    }
    return ribbonAssetChunksList;
}

/**
 * This is the functional component representing the Ribbon Component.
 * This ribbon row has the wrapper that include below section.
 * 1. Scrollable Content.
 * @param param0 {RibbonProperties}
 * @returns ribbon component to view the elements list.
 */
function Ribbon({
    ribbonAssetList = [],
    onRibbonAssetPress: onAssetPress,
    onRibbonAssetFocus: onFocus,
}: RibbonProperties) {
    /**
     * Get the reference and focusKey from the 'useFocusable' hook.
     * 1. ref = Is required to link the DOM element with the hook. (to measure its coordinates, size etc.).
     * 2. focusKey = Is required in order to provide all children components with the focusKey of the Container,
     * which serves as a Parent Focus Key for them
     */
    const { ref: ribbonRowHorizontalScrollingRef, focusKey } = useFocusable({
        onFocus,
    });

    /**
     * This is added to set the scrolling reference for the
     * current ribbon row wrapper. row element.
     */
    // const ribbonRowHorizontalScrollingRef: any = useRef(null);

    /**
     * This is the callback function used when the
     * ribbon element getting scrolled.
     * This will add the horizontal scrolling to the RibbonRowContent.
     */
    const onAssetFocus = useCallback(
        (focusableComponentLayout: FocusableComponentLayout, extraProps: any, focusDetails: FocusDetails) => {
            onFocus(focusableComponentLayout, extraProps, focusDetails);
            console.log(
                'Ribbon : onAssetFocus : focusableComponentLayout : ',
                focusableComponentLayout,
                ', extraProps=',
                extraProps,
                ', focusDetails= ',
                focusDetails,
                ', ref =',
                ribbonRowHorizontalScrollingRef,
            );

            // This will add the left hand side scrolling to the ribbon element.
            // ribbonRowHorizontalScrollingRef.current.scrollTo({
            //     top: 1000,
            //     behavior: 'smooth',
            // });
        },
        [ribbonRowHorizontalScrollingRef],
    );
    // Generate the chunks of asset list with the specified size.
    const ribbonAssetChunksList = createRibbonListChunks(ribbonAssetList);
    return (
        // FocusContext.Provider for ribbon row.
        <FocusContext.Provider value={focusKey}>
            {/* Ribbon row Wrapper */}
            <RibbonRowWrapper ref={ribbonRowHorizontalScrollingRef}>
                {/* Ribbon Row Content. This will add the 'Grid' rows to the content section. */}
                {ribbonAssetChunksList.map((ribbonAssetChunk: any, index: number) => {
                    return (
                        <RibbonRowContent
                            key={index}
                            onAssetFocus={onAssetFocus}
                            onAssetPress={onAssetPress}
                            ribbonContentList={ribbonAssetChunk}
                        />
                    );
                })}
            </RibbonRowWrapper>
        </FocusContext.Provider>
    );
}

export { Ribbon };
