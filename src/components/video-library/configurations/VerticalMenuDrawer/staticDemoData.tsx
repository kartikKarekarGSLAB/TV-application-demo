import { OndemandVideo } from '@mui/icons-material';

/**
 * The following constants added for Demo purpose only.
 * Later once the API will be integrated then these constants
 * will be removed.
 * Note the structure of the library element needed to be formed by the client side.
 * Since this structure will be used by the Drawer to generate the list.
 */
export const LIBRARIES_LIST = [
    {
        itemId: 'Recommended',
        itemLabel: 'Recommended',
        itemLink: '',
        icon: <OndemandVideo />,
        isFirstLevelItem: true,
        isDrillDownMenuItemsAvailable: false,
        drillDownMenuItems: [],
    },
    {
        itemId: 'Suggested',
        itemLabel: 'Suggested',
        itemLink: '',
        icon: <OndemandVideo />,
        isFirstLevelItem: true,
        isDrillDownMenuItemsAvailable: false,
        drillDownMenuItems: [],
    },
    {
        itemId: 'Education',
        itemLabel: 'Education',
        itemLink: '',
        icon: <OndemandVideo />,
        isFirstLevelItem: true,
        isDrillDownMenuItemsAvailable: true,
        drillDownMenuItems: [],
    },
    {
        itemId: 'Relaxation',
        itemLabel: 'Relaxation',
        itemLink: '',
        icon: <OndemandVideo />,
        isFirstLevelItem: true,
        isDrillDownMenuItemsAvailable: true,
        drillDownMenuItems: [],
    },
    {
        itemId: 'Hospital',
        itemLabel: 'Hospital',
        itemLink: '',
        icon: <OndemandVideo />,
        isFirstLevelItem: true,
        isDrillDownMenuItemsAvailable: true,
        drillDownMenuItems: [],
    },
];

/**
 * The following will be added for demo purpose.
 * Later once STUB integration is done, then these values be removed.
 */
export const SUB_CATEGORIES_DATA: any = {
    Education: [
        {
            categoryName: 'Allergy',
            id: 'Allergy',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Cardiology',
            id: 'Cardiology',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Dermatology',
            id: 'Dermatology',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Ears-Nose-Throat',
            id: 'Ears-Nose-Throat',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Sports Medicine',
            id: 'Sports Medicine',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: "Women's Health",
            id: "Women's Health",
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Health & Wellness',
            id: 'Health & Wellness',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Oncology',
            id: 'Oncology',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Emergency Medicine',
            id: 'Emergency Medicine',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Ophthalmology',
            id: 'Ophthalmology',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Nutrition',
            id: 'Nutrition',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'General Surgery',
            id: 'General Surgery',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Imaging',
            id: 'Imaging',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Vascular',
            id: 'Vascular',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Senior Health',
            id: 'Senior Health',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Primary Care',
            id: 'Primary Care',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Neurology',
            id: 'Neurology',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Urology',
            id: 'Urology',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Pulmonary',
            id: 'Pulmonary',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Pediatrics',
            id: 'Pediatrics',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Nephrology',
            id: 'Nephrology',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Orthopedics',
            id: 'Orthopedics',
            topLevelCategories: ['EDUCATION'],
        },

        {
            categoryName: 'Mental Health',
            id: 'Mental Health',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Radiology',
            id: 'Radiology',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Gastroenterology',
            id: 'Gastroenterology',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'OB/GYN',
            id: 'OB/GYN',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Respiratory',
            id: 'Respiratory',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Rheumatology',
            id: 'Rheumatology',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Endocrinology',
            id: 'Endocrinology',
            topLevelCategories: ['EDUCATION'],
        },
        {
            categoryName: 'Wellness',
            id: 'Wellness',
            topLevelCategories: ['EDUCATION'],
        },
    ],
    Relaxation: [
        {
            categoryName: 'Mind Fullness',
            id: 'Mind Fullness',
            topLevelCategories: ['RELAXATION'],
        },
        {
            categoryName: 'Deep Muscles Relaxation',
            id: 'Deep Muscles Relaxation',
            topLevelCategories: ['RELAXATION'],
        },
    ],
    Hospital: [
        {
            categoryName: 'General',
            id: 'General',
            topLevelCategories: ['Hospital'],
        },
    ],
};

/**
 * The following will be added for demo purpose.
 * Later once STUB integration is done, then these values be removed.
 *
 * This will return the list of sub-categories with respective category.
 */
export const getSubCategories = (subCategoryName: any) => {
    return SUB_CATEGORIES_DATA[subCategoryName];
};
