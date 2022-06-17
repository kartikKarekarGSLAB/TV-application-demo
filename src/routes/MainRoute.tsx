import { Route, Routes } from 'react-router-dom';
import ApplicationWrapper from '../components/Wrappers/ApplicationWrapper/ApplicationWrapper';
import PrivateRoute from './PrivateRoute';
import Home from '../components/home/Home';
import LogIn from '../components/login/Login';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Main from '../components/app/Main';
import SingleInputKeyboardDemo from '../components/common-components/keyboard/examples/SingleInputKeyboardDemo';
import MultipleInputKeyboardDemo from '../components/common-components/keyboard/examples/MultipleInputKeyboardDemo';
import VirtualKeyboardModalDemo from '../components/common-components/keyboard/examples/modal/VirtualKeyboardModalDemo';
import { VideoLibraryExample } from '../components/video-library/example/NoriginMediaExample';
import { VideoLibrary } from '../components/video-library';

function MainRoute() {
    const pageWithHeaderFooter = (renderPage: any) => {
        return (
            <>
                <Header />
                {renderPage}
                <Footer />
            </>
        );
    };
    return (
        <ApplicationWrapper>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/home" element={<PrivateRoute>{pageWithHeaderFooter(<Home />)}</PrivateRoute>} />
                <Route
                    path="/video-library"
                    element={<PrivateRoute>{pageWithHeaderFooter(<VideoLibrary />)}</PrivateRoute>}
                />
                {/* Added for checking the integration with Keyboard component. Will keep this route as reference. when further we needed to add virtual keyboard*/}
                <Route path="/keyboard/example/single" element={<SingleInputKeyboardDemo />} />
                <Route path="/keyboard/example/multiple" element={<MultipleInputKeyboardDemo />} />
                {/* Modal K/B demo. */}
                <Route path="/keyboard/example/modal" element={<VirtualKeyboardModalDemo />} />
                {/* This route added for the Video Library Component demo. */}
                <Route path="/video-library/example" element={<VideoLibrary />} />
                <Route path="/video-library/example2" element={<VideoLibraryExample />} />
            </Routes>
        </ApplicationWrapper>
    );
}

export default MainRoute;
