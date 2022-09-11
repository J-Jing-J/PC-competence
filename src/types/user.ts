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
  sex: sex
  userGroup: number

  // 管理员
  adminGroup: number
  adminId: number
  adminName: string
  adminNo: number
  adminState: number
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

export interface TestRecord {
  id: 5010
  userId: 141
  taskId?: null
  createTime: string
  factorE: 2  //内外向
  factorL: 1  //掩饰质
  factorN: 1  //情绪的稳定性 精神质
  factorP: 1  //精神质
}

