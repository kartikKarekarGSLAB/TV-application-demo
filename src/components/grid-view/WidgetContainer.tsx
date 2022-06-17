import Image from '../common-components/image/Image';
import { getPrivacyLockImg } from '../../utils/homeUtil';
import { Tooltip, Typography } from '@mui/material';

function WidgetContainer(props: any) {
    const { key, app } = props;
    const getToolTipText = (text: string) => {
        if (text && text.length >= 23) {
            return text;
        }
        return '';
    };
    return (
        <div key={key} id={app.id} className="widget">
            <div className="appImgWrapper">
                <Image src={app.imageURL} alt={`${app.label}-Img`} classes={'appImg homeAppImgBorder'} />
                {app.showPrivacyLock && <Image src={getPrivacyLockImg()} classes={'appPrivacyLock'} />}
            </div>
            <div className="applicationName">
                <Tooltip title={getToolTipText(`${app.label}`)}>
                    <Typography variant="body1" noWrap className="">
                        {app.label}
                    </Typography>
                </Tooltip>
            </div>
        </div>
    );
}

export default WidgetContainer;
