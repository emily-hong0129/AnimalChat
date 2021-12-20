module.exports = {
  auth: require("./users/auth"),
  postlist: require("./users/postlist"),
  userinfo: require("./users/userinfo"),

  sendcomment: require("./users/sendcomment"),
  like: require("./users/like"),
  commentlist: require("./users/commentlist"),
  signin: require("./users/signin"),
  checkpw:require("./users/checkpw"),
  signout: require("./users/signout"),
  signup: require("./users/signup"),
  readlike: require("./users/readlike"),
  sendpost: require("./users/sendpost"),
  profilephoto: require("./users/profilephoto"),
  animalphoto: require("./users/animalphoto"),
  
  editpw: require("./users/editpw"),
  editpost: require("./users/editpost"),
  edituserinfo: require("./users/edituserinfo"),
  
  deletecomment: require("./del/deletecomment"),
  deletepost: require("./del/deletepost"),
  removeuser: require("./del/removeuser"),
  deleteanimal: require("./del/deleteanimal"),
}
