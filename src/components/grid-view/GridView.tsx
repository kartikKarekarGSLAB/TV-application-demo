import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/styles/GridView.scss';
import Slider from 'react-slick';
import WidgetContainer from './WidgetContainer';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IHomeGridApp } from '../../types/homeTypes';
import { Grid } from '@mui/material';
import { appConfigTV } from '../../config/appConfigTV';

function PrevArrow(props: { className: string; style: any; onClick: any }) {
    const { className, style, onClick } = props;
    return <ArrowBackIosIcon onClick={onClick} style={style} className={className} />;
}

function NextArrow(props: { className: string; style: any; onClick: any }) {
    const { className, style, onClick } = props;
    return <ArrowForwardIosIcon onClick={onClick} style={style} className={className} />;
}

function GridView({ appList }: { appList: IHomeGridApp[] }) {
    const settings = {
        arrows: true,
        dots: true,
        infinite: false,
        speed: 500,
        rows: 2,
        adaptiveHeight: true,
        nextArrow: <NextArrow className={''} style={undefined} onClick={undefined} />,
        prevArrow: <PrevArrow className={''} style={undefined} onClick={undefined} />,
        responsive: appConfigTV.applicationResponsiveConfig,
    };

    return (
        <Grid className="main-container" sx={{ margin: 'auto 0' }}>
            <Slider {...settings}>
                {appList.map((app, i) => {
                    return <WidgetContainer key={i} app={app} />;
                })}
            </Slider>
        </Grid>
    );
}

export default GridView;
