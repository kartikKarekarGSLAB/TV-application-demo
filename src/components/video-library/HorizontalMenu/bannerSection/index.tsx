import Grid from '@mui/material/Grid';
import { BannerAssetPreview } from './bannerAssetPreview';
import { BannerAssetDetails } from './bannerAssetDetails';
import { VideoLibraryBreadcrumb } from '../../videoLibraryBreadcrumb';
import { useEffect, useState } from 'react';

/**
 * @interface ContentBannerSectionProps this is the type used for the banner asset.
 * @property selectedAssetDetails {any} this hold the details needed for the banner section.
 */
interface ContentBannerSectionProps {
    librariesDrawerSelectedItem?: string;
    categoriesDrawerSelectedItem?: string;
    selectedAssetDetails: any;
}

/**
 * This is the functional component created for the banner section
 * from the horizontal navigation.
 * @param param0 {ContentBannerSectionProps} banner asset section properties
 * @returns banner section component.
 */
function ContentBannerSection({
    selectedAssetDetails,
    librariesDrawerSelectedItem,
    categoriesDrawerSelectedItem,
}: ContentBannerSectionProps) {
    /**
     * TODO : the breadcrumb will be populated using the both parameters.
     * 1. librariesDrawerSelectedItem
     * 2. categoriesDrawerSelectedItem
     * 3. Needed the name of currently playing video title to be added.
     *
     */
    const [breadcrumbDetails, setBreadcrumbDetails]: any = useState([]);
    const updateBreadCrumbDetails = (level?: number, breadCrumbLabel?: string) => {
        const currentBreadcrumbData = [...breadcrumbDetails];
        const removeIndex = currentBreadcrumbData.findIndex((element) => {
            return element.level === level;
        });
        currentBreadcrumbData.splice(removeIndex, 1);
        currentBreadcrumbData.push({
            breadcrumbLabel: breadCrumbLabel,
            isUnderlineRequired: true,
            breadcrumbLink: '',
            stylingClasses: '',
            level: level,
        });
        currentBreadcrumbData.sort((a: any, b: any) => (a.level > b.level ? 1 : b.level > a.level ? -1 : 0));
        setBreadcrumbDetails(currentBreadcrumbData);
    };

    useEffect(() => {
        console.log(
            'Inside UseEffect for breadcrumb details for librariesDrawerSelectedItem=',
            librariesDrawerSelectedItem,
        );
        updateBreadCrumbDetails(1, librariesDrawerSelectedItem);
    }, [librariesDrawerSelectedItem]);

    useEffect(() => {
        console.log(
            'Inside UseEffect for breadcrumb details. for categoriesDrawerSelectedItem=',
            categoriesDrawerSelectedItem,
        );
        updateBreadCrumbDetails(2, categoriesDrawerSelectedItem);
    }, [categoriesDrawerSelectedItem]);

    useEffect(() => {
        console.log('Inside UseEffect for breadcrumb details. for vide asset item=', selectedAssetDetails);
        if (selectedAssetDetails && selectedAssetDetails.title) {
            updateBreadCrumbDetails(3, selectedAssetDetails.title);
        }
    }, [selectedAssetDetails]);

    return (
        <div>
            <div className="banner-wrapper-cover"></div>
            <Grid container className="banner-wrapper">
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        zIndex: 1,
                    }}
                    className="video-library-breadcrumb-search-wrapper"
                >
                    {/* 1. Breadcrumb section & search section. */}
                    <VideoLibraryBreadcrumb breadcrumbElementsList={breadcrumbDetails}></VideoLibraryBreadcrumb>
                </Grid>
                {/* This section hold the details of selected asset. */}
                <Grid
                    item
                    xs={6}
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        zIndex: 1,
                    }}
                >
                    <BannerAssetDetails assetDetails={selectedAssetDetails} />
                </Grid>
                {/* This section hold the image/preview of selected asset. */}
                <Grid
                    item
                    xs={6}
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                    }}
                >
                    <BannerAssetPreview assetDetails={selectedAssetDetails} />
                </Grid>
            </Grid>
        </div>
    );
}

export { ContentBannerSection };
