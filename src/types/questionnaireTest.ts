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
  discription: string;
  type: number;
  score: number;  //该题分数
  // 负责人
  processorId: number;
  questionnaireId: number;
  gaugeType?: number;   //满意度 认同度
  gaugeMin?: number,
  gaugeMax?: number,
  gaugeDefaultValue?: number
}