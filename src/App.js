import React, { useEffect } from "react";
import { ZoomMtg } from "@zoomus/websdk";

let apiKeys = {
  sdkKey: process.env.REACT_APP_ZOOM_API_KEY,
  sdkSecret: process.env.REACT_APP_ZOOM_API_SECRET_KEY,
};

let meetConfig = {
  sdkKey: apiKeys.sdkKey,
  meetingNumber: "85000951723",
  userName: "ghaith ar",
  userEmail: "gaith00cm@gmail.com",
  passWord: "fMby2g",
  role: '0',
};

function App() {

  function joinMeeting(signature, meetConfig) {
    ZoomMtg.init({
      leaveUrl: "https://zoom.us/",
      isSupportAV: true,
      success: function (success) {
        console.log("Init Success ", success);
        ZoomMtg.join({
          meetingNumber: meetConfig.meetingNumber,
          userName: meetConfig.userName,
          signature: signature,
          sdkKey: meetConfig.sdkKey,
          passWord: meetConfig.passWord,

          success: (success) => {
            console.log(success);
          },

          error: (error) => {
            console.log(error);
          },
        });
      },
    });
  }

  useEffect(() => {
    ZoomMtg.setZoomJSLib("https://source.zoom.us/2.13.0/lib", "/av");
    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareWebSDK();

    ZoomMtg.generateSDKSignature({
      meetingNumber: meetConfig.meetingNumber,
      sdkKey: meetConfig.sdkKey,
      sdkSecret: apiKeys.sdkSecret,
      role: meetConfig.role,
      success: function (res) {
        console.log("res", res);

        setTimeout(() => {
          joinMeeting(res.result, meetConfig);
        }, 1000);
      },
    });
  }, []);

  return <div className="App">Zoom Testing</div>;
}

export default App;
