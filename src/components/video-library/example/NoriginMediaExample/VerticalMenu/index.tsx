import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useEffect } from 'react';
import { MenuItem } from '../MenuItem/VerticalMenu';
import { MenuWrapper } from '../Wrappers/VerticalMenu';
import { VerticalMenuOptions } from './../configurations/VerticalMenu';

/**
 * @interface VerticalMenuProps This interface is used to
 * represent the Vertical Menu Properties.
 * @property focusKey {string} used by the focused containers, which serves as a
 * Parent Focus Key for them. This way your focusable children components can be
 * deep in the DOM tree while still being able to know who is their Focusable Parent.
 */
interface VerticalMenuProps {
    focusKey?: string;
}

/**
 * This is the functional component used for the vertical menu.
 * @param param0 {VerticalMenuProps} properties required for the vertical menu.
 * @returns functional component with the vertical menu.
 */
function VerticalMenu({ focusKey: focusKeyParam }: VerticalMenuProps) {
    const { ref, focusSelf, hasFocusedChild, focusKey } = useFocusable({
        focusable: true,
        saveLastFocusedChild: false,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        focusKey: focusKeyParam,
        preferredChildFocusKey: '',
        onEnterPress: () => {
            console.log('default implementation for onEntrePress');
        },
        onEnterRelease: () => {
            console.log('default implementation for onEntreRelease');
        },
        onArrowPress: () => true,
        onFocus: () => {
            console.log('default implementation for onFocus');
        },
        onBlur: () => {
            console.log('default implementation for onBlur');
        },
        extraProps: { foo: 'bar' },
    });

    useEffect(() => {
        focusSelf();
    }, [focusSelf]);

    return (
        <FocusContext.Provider value={focusKey}>
            <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}>
                {VerticalMenuOptions.map((menuItemLabel: string) => {
                    return <MenuItem menuItemLabel={menuItemLabel} key={menuItemLabel} />;
                })}
            </MenuWrapper>
        </FocusContext.Provider>
    );
}

export { VerticalMenu };
