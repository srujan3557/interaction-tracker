const _TRACKER_ACTIVATION = 'ON'; // ON/OFF
const TrackerInit = _TRACKER_ACTIVATION === 'ON' ? require('./tracker').TrackerInit : require('./tracker.shadow').TrackerInit;
const TrackerService = _TRACKER_ACTIVATION === 'ON' ? require('./tracker').TrackerService : require('./tracker.shadow').TrackerService;
export { TrackerInit, TrackerService };
