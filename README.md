# ResOmniPro-InteractionTracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.2.1.
Run `npm i` to install dependencies.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running API server

Run `npm run api:serve` to run the API server. The API will serve the folowing endpoint `http://localhost:3000/analytics`

## Build 

Run `npm run build:webpack` to build the Tracker. The build artifacts will be stored in the `dist/_tracker/v{version_#}` directory.

## NG Usage

This section serve the purpose of an Angular application usage, please refer to plain javascript usage for non Angular applications.

### Library Import

You can import the library directly to your code OR refer to an outsource location such as `DAM` OR `CDN`.

```javascript
// You can specify the path to the TRACKER snippet <PATH>
import { TrackerInit, TrackerService } from '../assets/js/_tracker/tracker.snippet.js';
```

### Turn Switch On

Turn on Tracker from the snippet file.

```javascript
// You can turn ON/OFF from this variable.
const _TRACKER_ACTIVATION = 'ON';
```

### Exclude List

Need for this list is to exclude a particular users from sending event.

```javascript
// You can exclude a list of users. EX: testing team users PPR# 
const exludeList = ['1865277', '1965588'] // should come from hosting APP config
```

### Service .init

Initiate the Tracker service by calling `fn`: `TrackerInit`

```javascript
// Please replace the example below params with your application information dynamically
ngOnInit() {
    const Authorization = '<ACCESS_TOKEN>';
    const ppr = '<PPR_#>';
    const deltaId = '<DELTA_ID>';
    const deltamatic = '<DELTAMATIC_ID>';
    const channelId = '<CHANNEL_ID>';
    const appId = '<APP_ID>';
    const sessionId = '<USER_SESSION>';
    const endpoint = '<ENDPOINT_URL>';
    const commId = '<COMM_ID>';
    const commTyp = '<COMM_TYPE>';
    const exludeList = ['1865277', '1965588'] // should come from hosting APP config
    TrackerInit(
      Authorization,
      ppr,
      deltaId,
      deltamatic,
      channelId,
      appId,
      sessionId,
      endpoint,
      commId,
      commTyp,
      exludeList
    );
  }
```

### Consumption

Utilize the service tracker by calling the following `fn`: `TrackerService` 

```javascript
toggleClickEvent() {
    const data = {
      description: '<DESCRIPTION>',
      otherInfo: '<OTHER INFO>',
      ...
    };
    TrackerService('<CUSTOMER_ID>', '<SKYMILES_#>', '<TICKET_NUM>', '<EVENT_CATEORY>', '<EVENT_TYPE>', '<CONTENT_TYPE>', JSON.stringify(data));
  }
 ```
 
## Plain Javascript Usage

Import Snippet.js from source location

```javascript
<script src="<PATH>/tracker.snippet.js"></script>
```

Make sure the Tracker switch in ON

```javascript
// You can turn ON/OFF from this variable.
const _TRACKER_ACTIVATION = 'ON';
```

Initialize the Tracker Service

```javascript
const Authorization = '<ACCESS_TOKEN>';
const ppr = '<PPR_#>';
const deltaId = '<USER_ID>';
const deltamatic = '<DELTAMATIC_ID>';
const channelId = '<CHANNEL_ID>';
const appId = '<APP_ID>';
const sessionId = '<USER_SESSION>';
const endpoint = '<API_ENDPOINT_URL>';
const commId = '<COMM_ID>';
const commTyp = '<COMM_TYPE>';
const exludeList = ['1865277', '1965588']; // should come from hosting APP config
TrackerInit(
  Authorization,
  ppr,
  deltaId,
  deltamatic,
  channelId,
  appId,
  sessionId,
  endpoint,
  commId,
  commTyp,
  exludeList
);
```

Utilize the service tracker by calling the following `fn`: `TrackerService` 

```javascript
function toggleClickEvent() {
    const data = {
      description: '<DESCRIPTION>',
      otherInfo: '<OTHER INFO>',
      ...
    };
    TrackerService('<CUSTOMER_ID>', '<SKYMILES_#>', '<TICKET_NUM>', '<EVENT_CATEORY>', '<EVENT_TYPE>', '<CONTENT_TYPE>', JSON.stringify(data));
  }
 ```

**Note:** Draft version numbers should always prefix with a zero. Final version numbers should always prefix with a number.  

# 1.Objective

The objective is to provide a loosely coupled design to allow the Consumer apps (Axis, OmniPro) to integrate with Amazon backend services and push user web interaction data for analytics.

# 2.Functional requirements

Below are the references for functional requirements from Business team.

- [Place](https://flydelta.atlassian.net/wiki/spaces/RTO/pages/685506625/Seat+for+OmniPro+-+Business+Expectation+and+IT+Recommendation) Holder for Functional requirements document.
  
# 3.Technical Requirements

- Capture user interaction details from OmniPro application and send to backend AWS repository.

- Keep the payload small for quick async webhook call and high volumes.

- Nulls should be blank strings. The &quot;field&quot; in JSON should exist and be populated with blank strings.

- Timestamps should be in epoch time.

# 4.Solution Considerations

- The payload needs to be smaller as the volumes will be higher as each user action will be captured. Moreover, every character on the network can take 1-4 bytes depending on whether its ASCII or Non ASCII character and encoding type (UTF-8, 16, 32 etc). Further, every integer takes 4 bytes on the network. Hence, an attempt has been made to abbreviate field names and keep the payload size low so as to give more room to data capture.

- The JSON structure has been flattened for simplicity, avoiding data type mapping complexities and easy sorting &amp; searching for different applications.

# 5.JSON Request API Structure

The consumer apps must send messages complying to below json structure to the Integration micro service.

## 5.1. URL and Operation

Below is reference URL only and will be finalized based on design and AWS deployment.

Base URL: swaggerhub.delta.com/virts/r98278/InteractiveUserTrackingAPI/1.0.0
Operation: **post****/ENDPOINT**

## 5.2. Header Definition

These fields could be printed in Access\HTTP logs of the backend application and fed into AWS cloud watch for a quick inspection.

| Name | Optional/ Mandatory | Description | Remarks |
| --- | --- | --- | --- |
| Authorization \*string_(header)_ | Mandatory | _This header contains a token used within the consuming application for authorization._ | |
| UserAgent string_(header)_ | Optional | _Captures any of the PPR Number, Deltamatic Number and Delta Number. Other user info can be appended here, if required. Eg: PPR|001735279, DL|12345, DLM|456789_ | Maps to Employee ID (PPR) |
| txnId \*string_(header)_ | Mandatory | _A unique id for each request generated by each application_ | |
| channelId string_(header)_ | Optional | _Channel Id of the consuming application_ | |
| appId string_(header)_ | Optional | _App Id of the consuming application_ | |
| sessId string_(header)_ | Optional | Session Id of the user. | Maps to User Session ID | |

## 5.3. Payload Definition

Request body elements and description for usage.

Delimiter – Pipe is used for multiple info separation as it is not commonly used.

| Name | Data Type | Optional/ Mandatory | Description | Remarks |
| --- | --- | --- | --- | --- |
| date | **String** | Mandatory | _GMT date and time when this user action was captured. Sample epoch time 1095379198.75 maps to 2004-09-16T23:59:58.75._ | GMT Epoch time in milliseconds as required by backend. |
| commId | **String** | Optional | _Communication/Interaction Id such as Call ID, Message ID, Case Number etc_ | Maps to Interaction ID (Call ID, Message ID, Case Number, etc) |
| commTyp | **String** | Optional | _Type of communication/interaction user had with the customer._ | Maps to Interaction Type/Source (Call, Message, Social, Email, Complaint, etc) |
| custId | **String** | Optional | _Persistent Id of the customer_ | Maps to Customer Persistent ID (once available) |
| custSkyM | **String** | Optional | _Sky Miles number of the customer._ | Maps Customer SkyMiles Number |
| custTkt | **String** | Optional | _PNR or Ticket number of the customer._ | Maps to Transaction ID (PNR or Ticket #) |
| uid | **String** | Mandatory | _Random number generated to avoid browser caching_ | Random number generated to avoid browser caching |
| evtCtg | **String** | Optional | _Category of the action being tracked for eg Booking._ | Category of the action being tracked for eg Booking. |
| evtTyp | **String** | Optional | _Name of the event performed like click, scroll, double click, hover etc._ | Name of the event performed like click, scroll, double click, hover etc. |
| cntTyp | **String** | Optional | _Name of the content like left scroll bar, bottom scroll bar etc._ | Name of the content like left scroll bar, bottom scroll bar etc. |
| cntPg | **String** | Optional | _Target web page url of the content._ | Target web page url of the content. |
| dvId | **String** | Optional | _Unique Id given to the user&#39;s device._ | Unique Id given to the user&#39;s device. |
| dvTyp | **String** | Optional | _Type of device such as phone, tablet, desktop and features available etc. Format – Device Type|isTouchScreenEnabled. Eg Laptop|true_ | Type of device such as phone, tablet, desktop etc. |
| dvRes | **String** | Optional | _Screen resolution of the device. Format - Available|Used|Color Depth|Pixel Depth. Eg: 1523X92|958X655|24|24_ | Screen resolution of the device. |
| dvBwsr | **String** | Optional | _Browser used on the device. Format-Browser|Version|isCookieEnabled. Eg. Chrome|5.0|true_ | Browser version used on the device |
| dvCfg | **String** | Optional | _Device configuration info like Operating system &amp; Version, RAM and hardware concurrency of the device. OS|Version|RAM|Hardware Concurrency -Windows|10.8.2|8|4_ | Operating system version of the device |
| data | **String** | Optional | _Any additional custom data captured in JSON format._ |

## 5.4. Request Header

Sample HEADER `HTTP Request Header`

```javascript

Authorization: 0lB6wWzjSR1CCkHZxGADEd7GYEUMWQA1DqsR1qTkPRKinfoU331q7dOE8MQ2mIBpN...
Content-Type: application/json
User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36
appId: 01
channelId: OMP
sessId: <USER_SESSION>
txnId: wKlwfLVlbOJZFTKE
UserAgent: PPR|1865277, DL|s65277, DLM|01865277
...

```

## 5.5. Request Payload

Sample BODY `JSON Payload` structure.

```javascript
{
  "date": "1095379198.75",
  "commId": "456732",
  "commTyp": "Call",
  "custId": "S67534525",
  "custSkyM": "1234567891",
  "cstTkt": " 2150030834",
  "uid": "6c025f35-91cf-4170-b515-cdbb15297052",
  "evtCtg": "Booking",
  "evtTyp": "Click",
  "cntTyp": "Left-Scroll",
  "cntPg": "https://omnipro.delta.com/Dashboard",
  "dvId": "D103542",
  "dvTyp": "Laptop|true",
  "dvRes": "1523X92|958X655|24|24",
  "dvBwsr": "Chrome|74.0.3729.131|true",
  "dvCfg": "Windows|10.8.2|8|4",
  "data": {
    "errCode": "OmniPro_125",
    "desc": "Clicking when search modal is open.",
    "cntUrl": "https://delta.com/source-image.gif",
  }
}

