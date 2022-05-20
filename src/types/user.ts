type sex = '未知' | '男' | '女'

export interface User {
  id: number;
  name: string;
  createAt: string;
  updateAt: string;
  email: string;
  avatar_url: string;
  identity: number;
  token: string;
  usageTime: number
  grade: number,
  score: number,

  authorityId: number
  userId: number
  userName: string
  gender: number
  groupName: string
  idNumber: string
  sex: sex
  userGroup: number
}


