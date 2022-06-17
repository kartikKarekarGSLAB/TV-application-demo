import '../../assets/styles/Header.scss';
import Image from './../common-components/image/Image';

function HeaderStatusIcons({ state }: { state: any }) {
    const { iconSrc, isEnabled, stateFor } = state;
    return isEnabled ? (
        <Image classes="header-statusbar-container-icon" src={iconSrc} alt={`${stateFor}-status`} defaultSrc="" />
    ) : (
        <></>
    );
}

export default HeaderStatusIcons;
