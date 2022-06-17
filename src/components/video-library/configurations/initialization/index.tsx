import { init } from '@noriginmedia/norigin-spatial-navigation';

/**
 * Initialization.
 *
 * Here we initialize the navigation component,
 * Please refer the following document for more details.
 * https://github.com/NoriginMedia/Norigin-Spatial-Navigation#init-options
 */
export default init({
    debug: false,
    visualDebug: false,
    nativeMode: false,
    throttle: 0,
    throttleKeypresses: false,
});

/**
 * Method to set custom key codes.
 * i.e. when the device key codes differ
 * from a standard browser arrow key codes.
 * Here we should add the key configurations for the
 * Pillow Speaker. please consider the below values added
 * for supported navigation 'left', 'right', 'up', 'down',
 * and 'enter'.
 */
// setKeyMap({ left: 9001, up: 9002, right: 9003, down: 9004, enter: 9005 });

export { init };
