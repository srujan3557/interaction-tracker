

/**
 * WELCOME TO OMNIPRO TRACKER JS
 * GLOBAL OBJECTS
 * * */

window._TRACKER = {};
let _PAYLOAD = {};
let _HEADER = {};
let _BODY = {};
let _DEVICE = {};
let _ENDPOINT = '';
let _EXCLUDE_USERS = [];
let _USER_PPR = '';

/***
 * LAUNCHES TRACKER LIBRARY AT A PAGE LOAD
 * fn TrackerInit()
 * @param Authorization: String - access token
 * @param ppr: String - ppr number
 * @param deltaId: String - deltaId/username
 * @param deltamatic: String - deltamatic ID
 * @param channelId: String - channelId
 * @param appId: String - appId
 * @param sessionId: String - User Session
 * @return void
 * ***/
export function TrackerInit(
  Authorization = '',
  ppr = '',
  deltaId = '',
  deltamatic = '',
  channelId = '',
  appId = '',
  sessionId = '',
  endpoint = '',
  commId = '',
  commTyp = '',
  excludePPRs = []){

  console.log('Tracker Service Starts >>> ');
   Authorization = Authorization || randomStr(1024);
  _ENDPOINT = endpoint || '';
  _BODY.commId = commId;
  _BODY.commTyp = commTyp;
  _EXCLUDE_USERS = excludePPRs;
  _USER_PPR = ppr;

  TrackerSetHeader(Authorization, ppr, deltaId, deltamatic, channelId, appId, sessionId);

  _DEVICE = {
    cntPg: window.location.href,
    dvId: getOS() + '-' + isMobileTablet() + '-' + randomStr(16),
    dvTyp: `${isMobileTablet()}|${deviceHasTouchScreen()}`,
    dvRes: `${window.screen.width}x${window.screen.height}|${window.screen.availWidth}x${window.screen.availHeight}|${window.screen.colorDepth}|${window.screen.pixelDepth}`,
    dvBwsr: `${browserNameVersion()}|${window.navigator.cookieEnabled}`,
    dvCfg: `${getOS()}|${window.navigator.deviceMemory}|${window.navigator.hardwareConcurrency}`,
  };

  window._TRACKER = _DEVICE;
  // console.log('_TRACKER >>> _DEVICE: ', window._TRACKER);
  console.log('_TRACKER >>> _HEADER: ', _HEADER);

  /***
   * SUCCESS METHOD SETS TRACKER LAT LNG
   * fn geoSuccess()
   * @param position
   * @return void
   * ***/
  function showPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(geoSuccess);
    }
  }

  /***
   * SUCCESS METHOD SETS TRACKER LAT LNG
   * fn geoSuccess()
   * @param position
   * @return void
   * ***/
  function geoSuccess(position) {
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      window._TRACKER.geo = `${lat}|${lng}`;
  }

  /***
   * CHECK IS MOBILE/TABLET OR LAPTOP/DESKTOP
   * fn isMobileTablet()
   * @param NO
   * @return Device Type
   * ***/
  function isMobileTablet(){
    let check = false;
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))
            check = true;
    })(navigator.userAgent||navigator.vendor||window.opera);
    return check ? 'Mobile/Tablet' : 'Laptop/Desktop';
  }

  /***
   * - GET OS OPERATING SYSTEM -
   * This function identifies OS
   * @param NO
   * @return <OS NAME>
   * ***/
  function getOS() {
    let userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'Linux';
    }
    return os;
  }

   /***
   * - IS DEVICE TOUCH SCREEN -
   * fn deviceHasTouchScreen
   * @param NO
   * @return <BOOLEAN>
   * ***/
  function deviceHasTouchScreen() {
    let hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            hasTouchScreen = (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }
    return hasTouchScreen;
  }

  /***
   * - GET BROWSER NAME|VERSION -
   * fn browserNameVersion
   * @param NO
   * @return <BROWSER NAME | VERSION>
   * ***/
  function browserNameVersion(){
    let ua = window.navigator.userAgent, tem,
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [window.navigator.appName, window.navigator.appVersion, '-?'];
    if((tem = ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join('|');
  };
}


/***
 * COLLECT USER ACTIONS - EVENT INFORMATION -
 * fn TrackerReport()
 * @param url: String - Endpoint URL
 * @return void
 * ***/
export function TrackerService(
  custId = '',
  custSkyM = '',
  cstTkt = '',
  evtCtg = '',
  evttyp = '',
  cnttyp = '',
  data = {}
  ) {

  setHeaderProp('txnId', randomStr(16));
  _BODY = {
    date: Date.now(),
    uid: randomStr(16),
    custId: custId,
    custSkyM: custSkyM,
    cstTkt: cstTkt,
    evtCtg: evtCtg,
    evttyp: evttyp,
    cnttyp: cnttyp,
    data: data
  };

  _PAYLOAD = { ..._DEVICE, ..._BODY };
  console.log('_TRACKER >>> _PAYLOAD: ', _PAYLOAD);
  TrackerReport();
}

/***
 * XHR EVENT TO CALL ANALYTICS API ENDPOINT
 * fn TrackerReport()
 * @return void
 * ***/
function TrackerReport() {
  
  console.log('TRACKER >>> _CURRENT_USER: ', _USER_PPR);
  console.log('TRACKER >>> _EXCLUDE_USERS: ', _EXCLUDE_USERS);

  let noReport = _EXCLUDE_USERS.indexOf(_USER_PPR) != -1 ? false : true;
  if(noReport){
    let xhr = new XMLHttpRequest();
    xhr.open('POST', _ENDPOINT);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", _HEADER.Authorization);
    xhr.setRequestHeader("Trk-User-Agent", _HEADER.UserAgent);
    xhr.setRequestHeader("Trk-Channel-Id", _HEADER.channeId);
    xhr.setRequestHeader("Trk-App-Id", _HEADER.appId);
    xhr.setRequestHeader("Trk-Sess-Id", _HEADER.sessId);
    xhr.setRequestHeader("Trk-Txn-Id", _HEADER.txnId);

    xhr.send(JSON.stringify(_PAYLOAD));
    xhr.onload = function() {
      if (xhr.status != 200) { // analyze HTTP status of the response
        console.warn(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        console.log(`TRACKER >>> _EVENT SENT [${xhr.response}]`); // responseText in the server
      }
    };
    // xhr.onprogress = function(event) {
    //   if (event.lengthComputable) {
    //     console.info(`Received ${event.loaded} of ${event.total} bytes`);
    //   } else {
    //     console.info(`Received ${event.loaded} bytes`); // no Content-Length
    //   }
    // };
    xhr.onerror = function() {
      console.warn("Request failed");
    };
  }
}

/***
 * GENERATE A RANDOM ALPHANUMERIC STRING
 * fn randomStr()
 * @param len: String - length
 * @param charSet: String - charSet
 * @return randomString
 * ***/
function randomStr(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < len; i++) {
      let randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
}

/***
 * SET THE HEADER FOR ANALYTICS CALL
 * fn TrackerSetHeader()
 * @param Authorization: String - access token
 * @param ppr: String - ppr number
 * @param deltaId: String - deltaId/username
 * @param deltamatic: String - deltamatic ID
 * @param channelId: String - channelId
 * @param appId: String - appId
 * @param sessionId: String - User Session
 * @return void
 * ***/
function TrackerSetHeader(
    Authorization = '',
    ppr = '',
    deltaId = '',
    deltamatic = '',
    channelId = '',
    appId = '',
    sessionId = ''
  ) {
  _HEADER = {
    Authorization: Authorization,
    UserAgent: `PPR|${ppr}, DL|${deltaId}, DLM|${deltamatic}`,
    channeId: channelId,
    appId: appId,
    sessId: sessionId
  }
}

/***
 * SET ONE HEADER PROP TO REFRESH TOKEN OR UPDATE HEADER INFO
 * fn setHeaderProp()
 * @param name: String - prop name
 * @param value: String - prop value
 * @return void
 * ***/
function setHeaderProp(name, value) {
  _HEADER[name] = value;
}
