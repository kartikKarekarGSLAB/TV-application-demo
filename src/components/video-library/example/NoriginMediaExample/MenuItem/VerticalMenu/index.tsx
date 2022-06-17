import styled from 'styled-components';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';

/**
 * @interface MenuItemBoxProps This interface created for the MenuItemBoxProps.
 * This interface used to represent the properties of
 * Menu Item Box. It has focused flag that represent wether the
 * specific item in the list has focus or not.
 * @property focused {boolean} this set as true if the Menu Item element has focused, false otherwise.
 */
interface MenuItemBoxProps {
    focused: boolean;
}

/**
 * This is the styled-component created for the Menu Item Box.
 * The menu item box has border width adjusted using the 'focused'
 * attribute of the MenuItemBoxProps.
 */
const MenuItemBox = styled.div<MenuItemBoxProps>`
    width: 171px;
    height: 51px;
    background-color: #b056ed;
    border-color: white;
    border-style: solid;
    box-sizing: border-box;
    border-radius: 7px;
    margin-bottom: 37px;
    border-width: ${({ focused }) => (focused ? '6px' : 0)};
`;

/**
 * This is the styled-component created for the Menu Item Box Title.
 * The menu item title's font weight is adjusted using the 'focused'
 * attribute of the MenuItemBoxProps.
 */
const MenuItemBoxTitle = styled.div<MenuItemBoxProps>`
    color: white;
    font-family: 'Segoe UI';
    font-size: 24px;
    font-weight: ${({ focused }) => (focused ? '900' : '400')};
    text-align: center;
`;

/**
 * @interface MenuItemProps This interface used to defined the MenuItemProps.
 * It as the required properties needed for the menu item.
 * @property menuItemLabel {string} value used too represent the label.
 */
interface MenuItemProps {
    menuItemLabel?: string;
}

/**
 * This is the functional component used to represent the Menu Item in the
 * list. This will have the Leaf Focusable component. which as the 'focused'
 * used from the useFocusable hook of the library. The 'ref' will be is required
 * to link the DOM element with the hook. (to measure its coordinates, size etc.)
 * @param param0 {MenuItemProps} Menu item configurations.
 * @returns Menu Item Component.
 */
function MenuItem({ menuItemLabel: category }: MenuItemProps) {
    const { ref, focused } = useFocusable();

    return (
        <MenuItemBox ref={ref} focused={focused}>
            <MenuItemBoxTitle focused={focused}>{category}</MenuItemBoxTitle>
        </MenuItemBox>
    );
}

export { MenuItem };
