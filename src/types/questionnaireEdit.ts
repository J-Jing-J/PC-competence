export interface QuestionnaireEdit {
  id: number;
  name: string;
  processorId: number;
  questionnaireId: number;
  // 任务组
  // epicId: number
  testId: number;
  typeId: number; //题型
  description: string;
}