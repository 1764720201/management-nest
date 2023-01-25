import * as bcrypt from 'bcrypt';
type Data = string | Buffer;
// 加密
const crypt = (data: Data, saltOrRounds: string | number) => {
  return bcrypt.hash(data, saltOrRounds);
};
// 解密
const encrypt = (data: Data, encryptData: string) => {
  return bcrypt.compare(data, encryptData);
};
export { crypt, encrypt };
