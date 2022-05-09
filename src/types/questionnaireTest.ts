export interface QuestionnaireTest {
  id: number;
  title: string;
  discription: string;
  type: number;
  score: number;  //该题分数
  // 负责人
  processorId: number;
  questionnaireId: number;
}