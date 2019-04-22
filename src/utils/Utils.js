import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

const setData = async (key, value) => {
  try {
    const isExist = await AsyncStorage.getItem(key);
    let checkData = JSON.parse(isExist);
    if (!checkData) {
      await AsyncStorage.setItem(key, value)
        .then(() => {
          console.log("It was saved successfully");
        })
        .catch(() => {
          console.log("There was an error saving the product");
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const getData = async key => {
  try {
    const Data = await AsyncStorage.getItem(key);
    const DataJSON = JSON.parse(Data)
    return DataJSON;
  } catch (error) {
    console.log(error);
  }
};

const clearData = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

const toDateTime = (date) => {
  let result = "-"
  if(date !== null){
    result = moment(date).format("D-MMM-YYYY, H:mm:ss")
  }
  return result
}

const toDate = (date) => {
  let result = "-"
  if(date !== null){
    result = moment(date).format("D-MMM-YYYY")
  }
  return result
}

const toTime = (date) => {
  let result = "-"
  if(date !== null){
    result = moment(date).format("H:mm:ss")
  }
  return result
}

export { setData, getData, clearData, toDateTime, toDate, toTime };
