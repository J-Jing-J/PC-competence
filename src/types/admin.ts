export interface UserByPage {
  userId: number;
  userNo: number
  idNumber: string
  userName: string
  password: string
  userGroup: number
  authorityId: number
  gender: number
  userState: number
  pageIndex: number
  pageSize: number
  itemCount: number
  pageCount: number
  first: boolean
  last: boolean
  beginIndex: number
}