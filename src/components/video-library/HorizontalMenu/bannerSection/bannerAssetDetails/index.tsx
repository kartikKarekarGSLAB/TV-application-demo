import { Rating, Tooltip, Typography } from '@mui/material';
import { getDurationFormat } from '../../../../../utils/videoLibraryUtil';
import { ContentProgressBar } from '../../../contentProgressBar';
import './../../../../../assets/styles/common/common-components/video-library/banner/BannerSection.scss';

/**
 * @interface BannerAssetProperties This interface used to represent the properties of
 * banner asset.
 * @property assetDetails {object} this is the object having configuration needed to be displayed for the asset.
 * @property assetTitle {string} this is the title of selected asset from the resources.
 * @property assetDescription {string} this is the description of selected asset from the resources.
 * @property assetRating {string} this is the rating of selected asset from the resources.
 * @property assetAgeCategory {string} this is the Age category of selected asset from the resources.
 * @property assetDuration {string} this is the Duration of selected asset from the resources.
 *
 * Note :: Later if we have any additional property needed to be added then we should update the
 * following interface.
 */
interface BannerAssetDetailsProps {
    assetDetails: any;
    assetTitle?: string;
    assetDescription?: string;
    assetRating?: string;
    assetAgeCategory?: string;
    assetDuration?: string;
}

/**
 * This is the functional component used by the content section
 * to display the selected asset details.
 * @param param0 {BannerAssetDetailsProps}
 * @returns functional component to represent the asset from the menu.
 */
function BannerAssetDetails({
    assetDetails,
    assetTitle = '',
    assetDescription = '',
    assetRating = '0.00',
    assetDuration = '00:00',
    assetAgeCategory = '',
}: BannerAssetDetailsProps) {
    // Here we assign the value for the respective value from the selected asset.
    // Later if there is any change in any attribute for respective attribute from response,
    // then we needed to update the same.
    // 1. Title.
    if (assetDetails && assetDetails.title) {
        assetTitle = assetDetails.title;
    }
    // 2. Description.
    if (assetDetails && assetDetails.description) {
        assetDescription = assetDetails.description;
    }
    // 3. Rating.
    if (assetDetails && assetDetails.overallRating) {
        assetRating = assetDetails.overallRating;
    }
    // 4. Age Category.
    if (assetDetails && assetDetails.ageCategory) {
        assetAgeCategory = assetDetails.ageCategory;
    }
    // 5. Video Progress Details.
    if (assetDetails && assetDetails.duration) {
        assetDuration = assetDetails.duration;
    }
    const showVideoProgress =
        assetDetails &&
        assetDetails.contentVideoProgressVO &&
        assetDetails.contentVideoProgressVO.viewedPercentage &&
        assetDetails.contentVideoProgressVO.viewedPercentage !== 100;
    return assetDetails ? (
        <div className="banner-asset-details-wrapper">
            {/* Asset "Title" */}
            <Typography aria-label={assetTitle} className="banner-asset-details-title" variant="subtitle1">
                {assetTitle}
            </Typography>
            {/* Asset.
                    1. Rating.
                    2. Age Category.
                    3. Duration.
                */}
            <div className="banner-asset-details-rating-age-duration-wrapper">
                <Rating
                    size="small"
                    className="banner-asset-details-ratings"
                    value={parseInt(assetRating)}
                    readOnly
                ></Rating>
                <p className="banner-asset-details-age-category" aria-label={assetAgeCategory}>
                    {assetAgeCategory}
                </p>
                <Typography
                    variant="body1"
                    className="banner-asset-details-duration"
                    aria-label={getDurationFormat(assetDuration)}
                >
                    {getDurationFormat(assetDuration)}
                </Typography>
            </div>
            {showVideoProgress ? (
                <ContentProgressBar
                    wrapperStyleClass="banner-asset-details-progress-bar-wrapper"
                    progressBarStyleClass="banner-asset-details-progress-bar"
                    progressComplete={
                        assetDetails.contentVideoProgressVO && assetDetails.contentVideoProgressVO.viewedPercentage
                            ? assetDetails.contentVideoProgressVO.viewedPercentage
                            : 0
                    }
                    showProgressPercentage={true}
                />
            ) : (
                ''
            )}
            <Tooltip title={assetDescription}>
                <Typography variant="body1" className="banner-asset-details-description">
                    {assetDescription}
                </Typography>
            </Tooltip>
        </div>
    ) : (
        <></>
    );
}

export { BannerAssetDetails };
