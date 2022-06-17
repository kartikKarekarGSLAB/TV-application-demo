import styled from 'styled-components';

/**
 * @interface MenuWrapperProps This interface used to
 * for the wrapper for the menu. It has the property
 * 'hasFocusedChild' which helped to identify weather the
 * menu list has any focused item or not.
 *
 */
interface MenuWrapperProps {
    hasFocusedChild: boolean;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
    flex: 1;
    max-width: 246px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${({ hasFocusedChild }: any) => (hasFocusedChild ? '#4e4181' : '#362C56')};
    padding-top: 37px;
`;

export { MenuWrapper };
