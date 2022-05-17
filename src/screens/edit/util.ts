import { useCallback } from "react";
import { useTest } from "../../utils/questionnaireEdit";
import { useUrlQueryParam } from "../../utils/url";

export const useEditTestModal = () => {
  const [{ editingTestId }, setEditTestId] = useUrlQueryParam(['editingTestId']);
  const { data: editingTest, isLoading } = useTest(Number(editingTestId))
  const startEdit = useCallback((id: number) => {
    setEditTestId({ editingTestId: id })
  }, [setEditTestId]);
  const close = useCallback(() => {
    setEditTestId({ editingTestId: '' })
  }, [setEditTestId])
  return {
    editingTestId,
    editingTest,
    startEdit,
    close,
    isLoading
  }
}