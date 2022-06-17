import '../../../assets/styles/PageTitle.scss';

function Image(props: any) {
    return (
        <img
            src={props.src}
            className={props.classes}
            alt={props.alt}
            onClick={props.clickCallback}
            onError={(event) => {
                event.preventDefault();
                const defaultImageSrc = props.defaultSrc;
                if (defaultImageSrc) {
                    (event.target as HTMLImageElement).src = `${defaultImageSrc}`;
                } else {
                    (event.target as HTMLImageElement).src = '';
                }
            }}
        />
    );
}

export default Image;
