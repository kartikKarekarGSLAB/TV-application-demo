import '../../assets/styles/Header.scss';
import Image from './../common-components/image/Image';

function HeaderStatusToggleIcons({ state }: { state: any }) {
    const { onIconSrc, offIconSrc, isEnabled, stateFor } = state;
    return (
        <Image
            classes="header-statusbar-container-icon"
            src={isEnabled ? onIconSrc : offIconSrc}
            alt={`${stateFor}-status`}
            defaultSrc=""
        />
    );
}

export default HeaderStatusToggleIcons;
