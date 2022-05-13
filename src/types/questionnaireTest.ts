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