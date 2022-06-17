import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import './../../../assets/styles/common/common-components/video-library/categoryBreadcrumb/CategoryBreadcrumb.scss';

/**
 * This is the callback function when the element form the breadcrumb will be
 * selected.
 * @param event {React.MouseEvent} mouse event object.
 */
function handleClickCallback(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

/**
 * @interface BreadcrumbElementProps This is the type used for the elements
 * inside the breadcrumb.
 * @property isUnderlineRequired {boolean} this is flag used to identify it is the current node or not.
 * @property breadcrumbLabel {string} this is the label used for the breadcrumb element.
 * @property breadcrumbLink {string} this is link used by the href for navigation.
 * @property stylingClasses {string} this is string of classes needed for the breadcrumb element.
 */
interface BreadcrumbElementProps {
    isUnderlineRequired: boolean;
    breadcrumbLabel: string;
    breadcrumbLink: string;
    stylingClasses?: string;
}

/**
 * @interface BreadcrumbProps This is the interface used by the breadcrumb.
 * @property breadcrumbElementsList {BreadcrumbElementProps[]} this is the array of elements need
 * to be added inside the breadcrumb.
 */
interface BreadcrumbProps {
    breadcrumbElementsList: BreadcrumbElementProps[];
}

/**
 * This is the functional component used to display the breadcrumb of category
 * used to display inside the video library page.
 * @param param0 {BreadcrumbProps} this is used to add the breadcrumb elements.
 * @returns
 */
function VideoLibraryBreadcrumb({ breadcrumbElementsList }: BreadcrumbProps) {
    return (
        <div role="presentation" onClick={handleClickCallback}>
            <Breadcrumbs aria-label="breadcrumb" className="">
                {breadcrumbElementsList &&
                    breadcrumbElementsList.map((element: BreadcrumbElementProps) =>
                        element.isUnderlineRequired ? (
                            <Link
                                underline="hover"
                                href={element.breadcrumbLink}
                                variant="body1"
                                className="navigable-element"
                                key={element.breadcrumbLabel}
                            >
                                {element.breadcrumbLabel}
                            </Link>
                        ) : (
                            <Typography variant="body1" className="current-element" key={element.breadcrumbLabel}>
                                {element.breadcrumbLabel}
                            </Typography>
                        ),
                    )}
            </Breadcrumbs>
        </div>
    );
}

export { VideoLibraryBreadcrumb };
