import { Constants } from "./Constants";
import { setData, getData } from "./Utils";

const ServiceLogin = async (dataUser, isLogin) => {
  const { wsUrl, wsLogin, applicationType, KEY_DATA_USER } = Constants;

  const { uid, password, registrationId } = dataUser;

  const url =
    wsUrl +
    wsLogin +
    "uid=" +
    uid +
    "&password=" +
    password +
    "&registrationId=" +
    registrationId +
    "&isLogin=" +
    isLogin +
    "&applicationtype=" +
    applicationType;
  //const url = 'http://uat-app.mnc-insurance.com/goreact/webservice.asmx/Login?uid=18018651&password=138381813&registrationId=&applicationtype=PORTAL'

  let result = {};

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();

    if (json[0] != null || json != "") {
      result = {
        ...dataUser,
        isLogin: isLogin,
        status: "SUCCESS",
        profile: json[0]
      };
      
      await setData(KEY_DATA_USER, JSON.stringify(result));
    } else {
      result = {
        status: "Invalid NIK and/or Password"
      };
    }
  } catch (error) {
    result = {
      status: "Something went wrong. Please check your NIK/Password"
    };
  }
  console.log("result");
  console.log(result);
  return result;
};

const serviceGetAttendaceList = async (datefrom, dateto) => {
  const {
    wsUrl,
    wsGetAttendanceList,
    applicationType,
    KEY_DATA_USER
  } = Constants;
  const { uid, password } = await getData(KEY_DATA_USER);
  const url =
    wsUrl +
    wsGetAttendanceList +
    "uid=" +
    uid +
    "&password=" +
    password +
    "&datefrom=" +
    datefrom +
    "&dateto=" +
    dateto +
    "&keyword=" +
    "&applicationtype=" +
    applicationType;
  let result;

  // http://uat-app.mnc-insurance.com/goreact/webservice.asmx/GetAttandance?uid=18018651&password=138381813&datefrom=2018-01-01&dateto=2018-01-30&keyword=&applicationtype=PORTAL

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    //setData(KEY_DATA_USER, json[0]);
    result = json;
  } catch (error) {
    console.log(error);
    result = "error";
  }

  return result;
};

const serviceGetNotificationsList = async () => {
  const {
    wsUrl,
    wsGetNotificationsList,
    applicationType,
    KEY_DATA_USER
  } = Constants;
  const { uid, password } = await getData(KEY_DATA_USER);
  console.log("uid");
  console.log(uid);
  const url =
    wsUrl +
    wsGetNotificationsList +
    "uid=" +
    uid +
    "&password=" +
    password +
    "&applicationtype=" +
    applicationType;
  let result;

  // http://uat-app.mnc-insurance.com/goreact/webservice.asmx/GetAttandance?uid=18018651&password=138381813&datefrom=2018-01-01&dateto=2018-01-30&keyword=&applicationtype=PORTAL

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    //setData(KEY_DATA_USER, json[0]);
    result = json;
  } catch (error) {
    console.log(error);
    result = "error";
  }

  return result;
};

const serviceGetStaffContactList = async keyword => {
  const {
    wsUrl,
    wsGetStaffContactList,
    applicationType,
    KEY_DATA_USER
  } = Constants;
  const { uid, password } = await getData(KEY_DATA_USER);
  const url =
    wsUrl +
    wsGetStaffContactList +
    "uid=" +
    uid +
    "&password=" +
    password +
    "&keyword=" +
    keyword +
    "&applicationtype=" +
    applicationType;
  let result;

  // http://uat-app.mnc-insurance.com/goreact/webservice.asmx/GetAttandance?uid=18018651&password=138381813&datefrom=2018-01-01&dateto=2018-01-30&keyword=&applicationtype=PORTAL

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.json();
    //setData(KEY_DATA_USER, json[0]);
    result = json;
  } catch (error) {
    console.log(error);
    result = "error";
  }

  return result;
};

const serviceUpdateNotification = async (id) => {
  const {
    wsUrl,
    wsUpdateNotification,
    applicationType,
    KEY_DATA_USER
  } = Constants;
  const { uid, password } = await getData(KEY_DATA_USER);
  const url =
    wsUrl +
    wsUpdateNotification +
    "uid=" +
    uid +
    "&password=" +
    password +
    "&id_notification=" +
    id +
    "&applicationtype=" +
    applicationType;
  let result;

  // http://uat-app.mnc-insurance.com/goreact/webservice.asmx/GetAttandance?uid=18018651&password=138381813&datefrom=2018-01-01&dateto=2018-01-30&keyword=&applicationtype=PORTAL

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw Error(response.statusText);
    }
    const json = await response.text();
    //setData(KEY_DATA_USER, json[0]);
    result = json;
  } catch (error) {
    console.log(error);
    result = "error";
  }
  console.log("result");
  console.log(result);
  return result;
}

export {
  ServiceLogin,
  serviceGetAttendaceList,
  serviceGetNotificationsList,
  serviceGetStaffContactList,
  serviceUpdateNotification
};
