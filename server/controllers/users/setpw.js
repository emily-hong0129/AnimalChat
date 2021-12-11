const crypto = require("crypto");
require("dotenv").config();

const algorithm = 'aes-256-cbc'; //암호화에 사용할 알고리즘
const key = crypto.scryptSync(process.env.PW_KEY, process.env.PW_SALT, 32); //암호화 및 복호화 생성 키 설정
const iv = Buffer.alloc(16, 0);//초기화 백터 

module.exports = {
    encrypto: (data) => {
        if(!data){
            return '';
        }
        const cipher = crypto.createCipheriv(algorithm, key, iv);
        const enresult = cipher.update(data, "utf8", "base64");
        const results = enresult + cipher.final("base64");
        return results;
    },
    decrypto: (data) => {
        if(!data){
            return '';
        }
        const decipher = crypto.createDecipheriv(algorithm, key, iv);
        const deresult = decipher.update(data, "base64", "utf8");
        const output = deresult + decipher.final("utf8");
        return output;
    }
}