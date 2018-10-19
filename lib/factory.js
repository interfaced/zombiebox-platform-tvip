goog.provide('zb.device.platforms.tvip.factory.createDevice');
goog.require('zb.device.platforms.tvip.Device');


/**
 * @return {?zb.device.platforms.tvip.Device}
 */
zb.device.platforms.tvip.factory.createDevice = () => {
	const isTVIPPlatform = zb.device.platforms.tvip.Device.detect();

	if (isTVIPPlatform) {
		const videoContainer = app.getVideoContainer();

		return new zb.device.platforms.tvip.Device(videoContainer);
	}

	return null;
};
