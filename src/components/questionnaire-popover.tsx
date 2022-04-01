import styled from "@emotion/styled";
import { Button, Divider, List, Popover, Typography } from "antd"
import { Content } from "antd/lib/layout/layout"
import { useAuth } from "../context/auth-context";
import { useQuestionnaireModal } from "../screens/questionnaire-list/util";
import { useQuestionnaires } from "../utils/questionnaire"
import { ButtonNoPadding } from "./lib";

export const QuestionnairePopover = () => {

  const { user } = useAuth()
  const { open } = useQuestionnaireModal()

  const { data: questionnaires, isLoading } = useQuestionnaires();
  const pinnedQuestionnaires = questionnaires?.filter((questionnaire) => questionnaire.pin)

  const content = <ContentContainer>
    <Typography.Text>收藏问卷</Typography.Text>
    <List>
      {
        pinnedQuestionnaires?.map((pinned) => <List.Item>
          <List.Item.Meta title={pinned.title} />
        </List.Item>)
      }
    </List>
    {
      user?.identity === 1 ? (
        <>
          <Divider />
          <ButtonNoPadding
            onClick={open}
            type={"link"}>
            创建量表
          </ButtonNoPadding>
        </>) : null
    }
  </ContentContainer>

  return <Popover
    placement={"bottom"}
    content={content}
  >
    <span>心理量表</span>
  </Popover>

}


const ContentContainer = styled.div`
  min-width: 30rem;
`