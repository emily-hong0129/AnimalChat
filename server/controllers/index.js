module.exports = {

  auth: require("./users/auth"),
  commentlist: require("./users/commentlist"),
  sendcomment: require("./users/sendcomment"),
  editpost: require("./users/editpost"),
  postlist: require("./users/postlist"),
  sendpost: require("./users/sendpost"),
  profilephoto: require("./users/profilephoto"),
  editpw: require("./users/editpw"),
  signin: require("./users/signin"),
  signout: require("./users/signout"),
  signup: require("./users/signup"),
  userinfo: require("./users/userinfo"),
  edituserinfo: require("./users/edituserinfo"),
  like: require("./users/like"),
  readlike: require("./users/readlike"),
  animalphoto: require("./users/animalphoto"),
  deletecomment: require("./del/deletecomment"),
  deletepost: require("./del/deletepost"),
  deleteanimal: require("./del/deleteanimal"),
  removeuser: require("./del/removeuser"),
  
}
