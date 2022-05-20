type sex = '未知' | '男' | '女'

export interface User {
  id: number;
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

export interface UserTask {
  endTime: string
  groupId: number
  id: number
  questionnaireIdList: Array<number>
  questionnaireIds: string
  questionnaireNameList: Array<string>
  startTime: string
  status: number
  taskName: string
}

