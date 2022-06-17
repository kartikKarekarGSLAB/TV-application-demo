import './configurations/initialization';
import VerticalMenuDrawer from './VerticalMenuDrawer';
import { GlobalStyle } from './configurations/styling/GlobalStyle';
import { VideoLibraryContentSection } from './HorizontalMenu';
import './../../assets/styles/common/common-components/video-library/VideoLibrary.scss';
import { useEffect, useState } from 'react';
import { LIBRARIES_LIST } from './configurations/VerticalMenuDrawer/staticDemoData';
import { getVideoAsset } from './configurations/HorizontalMenu/staticVideoList';

const INITIAL_LIBRARIES_LIST_STATE: any[] = LIBRARIES_LIST;
const INITIAL_LIBRARY_STATE = '';
const INITIAL_CATEGORY_STATE = '';
const INITIAL_VIDEOS_LIST_STATE: any[] = [];
// const INITIAL_SELECTED_VIDEO_STATE = {};
// const INITIAL_VIEW_VIDEO_LIBRARY_MODE_STATE = '';

/**
 * This is the functional component created for the video library.
 * @returns Video library Component
 */
function VideoLibrary() {
    /**
     * we needed to have following in the state as values.
     *
     * 1. Top Level libraries list (Home, Search should always be part of this).
     * 2. Selected Top Level category/ library.
     * 3. Selected Sub Category/ category.
     * 4. Current View Video Library Mode (Guest/Patient).
     * 5. Patient Details (If available).
     * 6. Current Video List. (Based on the current library and category selection).
     * 7. CurrentSelectedVideo. (Based on the selection from the library list).
     */

    /**
     *
     *
     * We needed the 'useEffect' for the same.
     *
     * Adding the state value as 'librariesList', that can be used,
     * to store the available libraries list.
     */
    const [librariesList, setLibrariesList] = useState(INITIAL_LIBRARIES_LIST_STATE);

    /**
     * Adding the state value as 'selectedLibrary', that can be used,
     * to store the currently selected library.
     */
    const [selectedLibrary, setSelectedLibrary] = useState(INITIAL_LIBRARY_STATE);

    /**
     * Adding the state value as 'selectedTopLevelLibrary', that can be used,
     * to store the currently selected sub category.
     */
    const [selectedCategory, setSelectedCategory] = useState(INITIAL_CATEGORY_STATE);

    /**
     * Adding the state value as 'videoLibraryList', that can be used,
     * to store the video library list based in the selected library and sub category.
     */
    const [videoLibraryList, setVideoLibraryList] = useState(INITIAL_VIDEOS_LIST_STATE);

    /**
     * TODO :: this list needed to be calculated and we needed to integrate it with the API calls.
     * 1. we needed to check the App configurations for adding items like 'Education', 'Relaxation' based on the App config.
     * 2. we needed to check the 'CurrentMode' to add the options like 'Recommended', 'Suggested', etc.
     *
     * Note: Since we needed the needed the list to be get only once we passed the second argument as []
     * to useEffect.
     * - refer,
     *
     */
    useEffect(() => {
        // TODO :: needed to add logic here for libraries details list.
        setLibrariesList(INITIAL_LIBRARIES_LIST_STATE);
    }, []);

    /**
     * TODO :: This needed a 'useEffect' call to set those values. from the below API call.
     * - 1. required the selected library.
     * - 2. required the selected category. (if applicable).
     * - 3. required other params.
     * - API : https://px.demo.extendedcaresolutions.com/v2/content/content/videos?locale=en_US&libraries=EDUCATION&category=Allergy&userId=EC1609368&includeAllLanguages=true
     */
    useEffect(() => {
        console.log(
            'Inside UseEffect for Updating the video library list. selectedLibrary=',
            selectedLibrary,
            ', selectedCategory=',
            selectedCategory,
        );
        /**
         * TODO :: add here code to get the video list for the respective 'library' and 'category'
         * This will be called when we have change in selectedLibrary or selected Category value.
         */
        const updatedVideoList = getVideoAsset(selectedLibrary, selectedCategory);
        setVideoLibraryList(updatedVideoList);
    }, [selectedLibrary, selectedCategory]);

    // /**
    //  * Adding the state value as 'selectedVideoItem', that can be used,
    //  * to store the currently selected video from the available video library list.
    //  */
    // const [selectedVideoItem, setSelectedVideoItem] = useState(INITIAL_SELECTED_VIDEO_STATE);
    // /**
    //  * Adding the state value as 'currentVideoLibraryMode', that can be used,
    //  * to store the currently viewing video library view.
    //  */
    // const [currentVideoLibraryMode, setCurrentVideoLibraryMode] = useState(INITIAL_VIEW_VIDEO_LIBRARY_MODE_STATE);
    return (
        <div className="video-library-main-page">
            <GlobalStyle />
            {/* This is the "Vertical Menu Drawer" Component. */}
            <VerticalMenuDrawer
                drawerLibrariesItemsList={librariesList}
                selectedLibrary={selectedLibrary}
                setSelectedLibrary={setSelectedLibrary}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            ></VerticalMenuDrawer>
            <VideoLibraryContentSection
                librariesDrawerSelectedItem={selectedLibrary}
                categoriesDrawerSelectedItem={selectedCategory}
                videoList={videoLibraryList}
            />
        </div>
    );
}

export { VideoLibrary };
