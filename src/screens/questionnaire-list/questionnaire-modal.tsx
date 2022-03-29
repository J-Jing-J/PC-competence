import { Button, Drawer } from "antd"


export const QuestionnaireModal = (props: { questionnaireModalOpen: boolean, onClose: () => void }) => {
  return <Drawer
    width={'100%'}
    visible={props.questionnaireModalOpen}
    onClose={props.onClose}
  >

    <h1>Modal</h1>
    <Button onClick={props.onClose}>关闭</Button>
  </Drawer>
}