// let URL = "https://atom-io.onrender.com/api/";
let URL = "http://localhost:8000/api/";

// APIs for Users
export const API_SIGNUP = URL + "signup";
export const API_LOGIN = URL + "login";
export const API_LOGOUT = URL + "logout";
export const API_ACTIVEUSER = URL + "getactiveuser";
export const API_GETUSERS = URL + "getusers";
export const API_ADDCONNECTION = URL + "addconnection";
export const API_REMOVE_CONNECTION = URL + "removeconnection";
export const API_UPDATE_USERPROFILE = URL + "updateprofile";
export const API_ADDSKILLS = URL + "addskills";
export const API_UPDATE_AVATAR = URL + "changeavatar";

// APIs for Posts
export const API_FEEDPOST = URL + "feedposts";
export const API_CREATEPOST = URL + "createpost";
export const API_UPDATEPOST_ACTIVITY = URL + "updateinteraction";
export const API_ACTIVITY_COUNT = URL + "likesavecount";
export const API_DELTEPOST = URL + "deletepost";
export const API_UPDATEPOST = URL + "updatepost";
// export const API_USERPOSTS = URL + "userposts";
// export const API_GETPOSTBY_ID = URL + "/getpost/:id";
