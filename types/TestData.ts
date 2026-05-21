export interface LoginTestData {
  username: string;
  password: string;
  expectedMessage: string;
}

export interface TestDataFile {
  validUsers: LoginTestData[];
  invalidUsers: LoginTestData[];
}
