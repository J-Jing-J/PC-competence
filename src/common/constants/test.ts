export const testTypes = [
  {
    id: 0,
    name: "量表题",
    icon: "Gauge"
  },
  {
    id: 1,
    name: "单选题",
    icon: "Radio"
  },
  {
    id: 2,
    name: "多选题",
    icon: "MultiRadio"
  },
  {
    id: 3,
    name: "单行输入题",
    icon: "Input"
  },
  {
    id: 4,
    name: "多行输入题",
    icon: "Textarea"
  },
  {
    id: 5,
    name: "下拉题",
    icon: "Select"
  }
]

export type testTypesType = {
  id: number,
  name: string,
  icon?: string
}