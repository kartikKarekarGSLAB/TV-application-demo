/**
 * @interface BannerAssetProperties This interface used to represent the properties of
 * banner asset.
 * @property assetDetails {object} this is the object having configuration needed to be displayed for the asset.
 */

interface BannerAssetPreviewProps {
    assetDetails: any;
}

/**
 * This is the functional component used by the vertical menu to display the assets.
 * @param param0 {BannerAssetPreviewProps}
 * @returns functional component to represent the asset from the menu.
 */
function BannerAssetPreview({ assetDetails }: BannerAssetPreviewProps) {
    return assetDetails ? (
        <img
            className="banner-asset-preview-image"
            src={assetDetails && assetDetails.thumbnailUri ? assetDetails.thumbnailUri : ''}
            alt={'Asset Preview Resource Image'}
        />
    ) : (
        <></>
    );
}

export { BannerAssetPreview };
