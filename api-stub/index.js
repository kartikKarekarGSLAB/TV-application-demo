const express = require('express');
const app = express();
const port = 8000;
const { PATIENT_ROOM } = require('./appList.json');
const { weatherInformation, iepToken, autologinData } = require('./weather.json');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Token, iep-tenant-id'
  );
  res.header('Access-Control-Expose-Headers', 'Access-Token, iep-auth-methods');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/v2/mes/apps/config', function (req, res) {
  var locationType = req.query.locationType;
  var appList = {
    payload: {
      apps: [],
      locationType: locationType,
    },
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  if (locationType) {
    appList.payload.apps = PATIENT_ROOM;
  }
  setTimeout(() => {
    return res.send(appList);
  }, 500);
});

// STUB api response for Location details by device serial number.
app.get('/v2/mes/locations/devices/:serial_number', function (req, res) {
  const serial_number = req.params.serial_number;
  const locationDetails = require('./location-details-by-serialID.json');
  var weatherResponse = {
    payload: locationDetails,
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  res.status(200);
  setTimeout(() => {
    return res.send(weatherResponse);
  }, 500);
});

//STUB api response for location details by token
app.get('/v2/mes/locations/by/token', function (req, res) {
  const locationDetails = require('./location-details-by-serialID.json');
  var weatherResponse = {
    payload: locationDetails,
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  res.status(200);
  setTimeout(() => {
    return res.send(weatherResponse);
  }, 500);
});

// STUB api response for Weather information.
app.get('/v2/mes/locations/weather', function (req, res) {
  var weatherResponse = {
    payload: weatherInformation,
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  setTimeout(() => {
    return res.send(weatherResponse);
  }, 500);
});

// STUB api response for images list by locale and ageCategory.
app.get('/v2/content/images', function (req, res) {
  const imageList = require('./images.json');
  var response = {
    payloadList: imageList,
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  setTimeout(() => {
    return res.send(response);
  }, 500);
});

// STUB api response for profile data by serial_number.
app.get('/v2/mes/patients/devices/:serial_number/profile', function (req, res) {
  const serial_number = req.params.serial_number;
  const userDetails = require('./profileData.json');
  var profileData = {
    payload: userDetails,
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  setTimeout(() => {
    return res.send(profileData);
  }, 500);
});

// STUB api response for external app list
app.get('/v2/mes/configregistry/configs', function (req, res) {
  const extList = require('./externalAppList.json');
  var configKey = req.query.startsWithConfigKey;
  var extAppListRes = {
    payload: {},
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  if (configKey == 'patientapp.extapp.') {
    extAppListRes.payload = extList;
  }
  setTimeout(() => {
    return res.send(extAppListRes);
  }, 500);
});

// STUB api response for Tenant specific custimization props.
app.get('/v2/mes/apps/customize/PATIENT_APP', function (req, res) {
  const {tenantProp} = require('./customProp.json');
  var profileData = {
    payload: tenantProp,
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  setTimeout(() => {
    return res.send(profileData);
  }, 500);
});

// STUB api response for admin specific props.
app.get('/v2/mes/configregistry/configList', function (req, res) {
  const {adminProp} = require('./customProp.json');
  var profileData = {
    payload: adminProp,
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  setTimeout(() => {
    return res.send(profileData);
  }, 500);
});

//STUB API response for video app list
app.get('/v2/content/content/videos', function (req, res) {
  const {home} = require('./videoApps.json');
  var screenName = req.query.screenName;
  var profileData = {
    payloadList: [],
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  if(screenName == 'HOME') {
    profileData.payloadList = home
  }
  setTimeout(() => {
    return res.send(profileData);
  }, 500);
});

//STUB API response for theme json response.
app.get('/v2/content/themes', function (req, res) {
  var themeData = {
    payload: require('./theme.json'),
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  setTimeout(() => {
    return res.send(themeData);
  }, 500);
});

//STUB API response for login form field's
app.get('/v2/mes/locations/format', function(req, res) {
  var loginField = {
    payload: {
      locationIdFormatKeys: ["room","bed"]
    },
    status: {
      statusCode: 200,
      errorKey: '',
      errorMessage: 'SUCCESS',
    },
  };
  setTimeout(() => {
    return res.send(loginField);
  }, 500);
})

//STUB OPATIONS API pmeVersion.text
app.options('/pmeVersion.txt', function (req, res) {
  res.setHeader('iep-auth-methods', 'oauth2')
  res.status(200)
  setTimeout(() => {
    return res.send();
  }, 500);
})

//STUB POST API for genrate token
app.post('/v2/iep/token/generate', function (req, res) {
  setTimeout(() => {
    return res.send(iepToken);
  }, 500);
})

//STUB GET API to check whther user is auto login or guest or need login
app.get('/v2/mes/rooms/:locationId/password', function(req, res) {
  var tempObj = {
    payload: autologinData,
    status: {
      statusCode: 401,
      errorKey: '',
      errorMessage: 'SUCCESS',
    }
  };
  res.status(401);
  setTimeout(() => {
    return res.send(tempObj);
  }, 500);
})

app.listen(port, () => {
  console.log(`api stub server listening at http://localhost:${port}`);
});
