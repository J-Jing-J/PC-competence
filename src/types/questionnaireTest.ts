export const gaugeType = [
  {
    id: 1,
    name: "认同"
  },
  {
    id: 2,
    name: "满意"
  },
  {
    id: 3,
    name: "重要"
  },
  {
    id: 4,
    name: "愿意"
  },
  {
    id: 5,
    name: "符合"
  }
]

export interface QuestionnaireTest {
  id: number;
  title: string;
  description: string;
  type: number;
  score: number;  //该题分数
  isRequired: boolean;
  processorId: number;  // 负责人
  questionnaireId: number;
  gaugeType?: number;   //满意度 认同度
  gaugeRange?: number,
  gaugeDefaultValue?: number;
  options?: string;
}

export interface fixedTest {
  instruction: EPQInstruction
  list: FixedList[]
}

export interface FixedList {
  categoryId?: number
  id: number
  point1?: number
  point2?: number
  point3?: number
  point4?: number
  point5?: number
  point6?: number
  point7?: number
  option1: string
  option2: string
  option3?: string
  option4?: string
  option5?: string
  option6?: string
  option7?: string
  questionName?: string
}

export interface EPQInstruction {
  id: number,
  testName: string,
  testDescription?: string
}
