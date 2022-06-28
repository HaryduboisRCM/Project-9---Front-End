import axios from "axios";
const url = "http://localhost:3001/";

export class ApiClient {

  constructor(token, logoutHandler) {
    this.token = token;
    this.logoutHandler = logoutHandler;
  }

  authenticatedCall(method, url, data) {
    return axios({
      method,
      url,
      headers: {
        authorization: this.token
      },
      data,
    }).catch((error) => {
      console.log("api error" , this.token);
      if(error.response.status == 403) {
        //logout the user
        this.logoutHandler();
        return Promise.reject();
      } else {
        throw error;
      }      
    });
  }

  apiCall(method, url, data) {
    return axios({
      method,
      url,
      data,
    }).catch((error) => {
      throw error;
    });
  }

  login(userName,password) {
    console.log(userName, password);
    return this.apiCall("post", `${url}auth`, {userName: userName, password: password});
   
  }

  getEvents() {
    console.log(this.token);
    return this.authenticatedCall("get", url);
  }

  addEvent(eventName, eventLocation, eventDetails, eventDate, price) {
    return this.authenticatedCall("post", url, { eventName, eventLocation, eventDetails, eventDate, price });
  }

  removeEvent(id) {
    return this.authenticatedCall("delete", `${url}${id}`);
  }

  updateEvent(id, eventName, eventLocation, eventDetails, eventDate, price) {
    return this.authenticatedCall("put", `${url}${id}`, { eventName, eventLocation, eventDetails, eventDate, price });
  }
}
