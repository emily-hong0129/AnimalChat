module.exports = (req, res) => {
  res.clearCookie("jwt").status(205).send('로그아웃 되었습니다.')
};