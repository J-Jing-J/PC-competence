import { Button, InputNumber, Form, Input, Select, Spin, Checkbox } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useMemo, useState } from "react"
import { TestTypeSelect } from "../../components/type-select";
import { useAddTest } from "../../utils/questionnaireEdit";
import { TestItemCard } from "../test/test-item";
import { useQuestionnaireIdInUrl, useTestQueryKey } from "../test/util";
import {
  CloseOutlined
} from '@ant-design/icons';
import styled from "@emotion/styled";
import { scrollToBottom } from "../../utils/scroll";

const { Option } = Select;

interface CreateTestProps {
  addType: number;
  setAddType: (typeId: number) => void;
  finishAddTest: boolean;
  setFinishAddTest: (finishAddTest: boolean) => void
}

export const CreateTest = (props: CreateTestProps) => {
  const { addType, setAddType, finishAddTest, setFinishAddTest } = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // const [type, setType] = useState(0);
  const [score, setScore] = useState(0);
  const [isRequired, setIsRequired] = useState(true);
  const [gaugeType, setGaugeType] = useState(0);
  const [gaugeRange, setGaugeRange] = useState(5);
  const [options, setOptions] = useState(['', '']);

  useEffect(() => {
    if (addType > 9) {
      setTitle('');
      setDescription('');
      setAddType(0);
      setScore(0);
      setIsRequired(true);
      setGaugeType(0);
      setGaugeRange(5);
    }
  }, [addType]);

  const questionnaireId = useQuestionnaireIdInUrl();
  const { mutateAsync: addTest } = useAddTest(useTestQueryKey());

  const [form] = useForm();

  const onFinish = async (values: any) => {
    const optionsResult = JSON.stringify(options);
    await addTest({ questionnaireId, title, description, type: addType, score, isRequired, gaugeType, gaugeRange, options: optionsResult });
    setFinishAddTest(!finishAddTest)
    form.resetFields();
    console.log(values);
    form.resetFields();
    setAddType(10);

    setTitle('');
    setDescription('');
    setAddType(0);
    setScore(0);
    setIsRequired(true);
    setGaugeType(0);
    setGaugeRange(5);

    window.location.reload();
  }


  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  return (
    <TestItemCard>
      <Form
        style={{ width: '40rem' }}
        onFinish={onFinish}
        form={form}
        size={"small"}
        {...formItemLayout}
      >
        <Form.Item
          label={'名称'}
          name={'title'}
          rules={[{ required: true, message: '请输入问题名称' }]}
        // colon={false}
        >
          <Input
            placeholder={'新建问题名称'}
            autoFocus={true}
            value={title}
            onChange={evt => setTitle(evt.target.value)}
          />
        </Form.Item>
        <Form.Item
          label={'备注'}
          name={'description'}
        >
          <Input
            placeholder={'新建问题描述/备注'}
            value={description}
            onChange={evt => setDescription(evt.target.value)}
          />
        </Form.Item>
        <Form.Item
          label={'分值'}
          name={'score'}
        >
          <InputNumber
            min={1}
            max={100}
            defaultValue={10}
            onChange={value => setScore(value)}
          />
        </Form.Item>
        <Form.Item
          label={'是否必填'}
          name={'isRequired'}
        >
          <Checkbox
            checked={isRequired}
            onChange={evt => setIsRequired(evt.target.value)}
          />
        </Form.Item>
        <CustomTest
          addType={addType}
          gaugeType={gaugeType}
          setGaugeType={setGaugeType}
          gaugeRange={gaugeRange}
          setGaugeRange={setGaugeRange}
          options={options}
          setOptions={setOptions}
        />
        <Form.Item>
          <Button
            style={{ marginLeft: '30rem' }}
            size="large"
            type={'primary'}
            htmlType={"submit"}
          >提交</Button>
        </Form.Item>
      </Form>
    </TestItemCard>)
}



interface CustomTestProps {
  addType: number;
  gaugeType: number;
  setGaugeType: (range: number) => void;
  gaugeRange: number;
  setGaugeRange: (range: number) => void;
  options: string[];
  setOptions: (options: string[]) => void;
}

const CustomTest = (props: CustomTestProps) => {
  const {
    addType, gaugeType, setGaugeType, gaugeRange, setGaugeRange, options, setOptions
  } = props;

  return <>
    {
      addType === 0 ? (
        <>
          <Form.Item
            label={'量表类型'}
            name={'gaugeType'}
          >
            <Select
              placeholder={"请选择"}
              value={gaugeType}
              onChange={value => setGaugeType(value)}
              style={{ width: 300 }}
            >
              <Option value={1}>认同度</Option>
              <Option value={2}>满意度</Option>
              <Option value={3}>重要度</Option>
              <Option value={4}>意愿度</Option>
              <Option value={5}>符合度</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label={'量表范围'}
            name={'gaugeRange'}
          >
            <InputNumber
              value={gaugeRange}
              defaultValue={5}
              min={1}
              max={100}
              onChange={value => setGaugeRange(value)}
            />
          </Form.Item>
        </>
      ) : addType === 1 || addType === 2 || addType === 5 ? (
        <CreateOptions options={options} setOptions={setOptions} />
      ) : null
    }
  </>
}


interface CreateOptionsProps {
  options: string[];
  setOptions: (options: string[]) => void;
}

const CreateOptions = (props: CreateOptionsProps) => {

  const { options, setOptions } = props;

  const addOption = () => {
    setOptions([...options, ''])
    console.log(options);
  }

  const deleteOption = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions([...newOptions]);
    console.log(options);
  }

  return <>
    {
      options.map((option, index) => <Form.Item key={option}
        label={`选项${index + 1}`}
        name={'options'}
      >
        <InputFormItem>
          <Input defaultValue={option} placeholder="选项" />
          <CloseOutlined onClick={() => deleteOption(index)} style={{ marginLeft: '2rem' }} />
        </InputFormItem>
      </Form.Item>)
    }
    <Button style={{ marginLeft: '10rem' }} type='link' onClick={addOption}>添加选项</Button>
  </>
}

const InputFormItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

