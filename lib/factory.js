import Device from './device';


/**
 * @return {?Device}
 */
export default function create() {
	const isTVIPPlatform = Device.detect();

	if (isTVIPPlatform) {
		return new Device();
	}

	return null;
};
