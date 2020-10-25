import React from 'react';
import { Input, Form, Button, DatePicker, Modal } from 'antd';
import { FormattedMessage, useIntl } from 'umi';
import { TopicParamsType } from '@/services/topic';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  action?: (values: TopicParamsType) => Promise<boolean>;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

const FormItem = Form.Item;
const { TextArea } = Input;

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const intl = useIntl(); // 国际化 如果用formatMessage会报
  // Warning: Using this API will cause automatic refresh when switching languages, please use useIntl or injectIntl.
  // 使用此 api 会造成切换语言的时候无法自动刷新，请使用 useIntl 或 injectIntl。
  const { modalVisible, onCancel } = props;

  return (
    <Modal
      width={1200}
      destroyOnClose
      title='添加毕业设计'
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form onFinish={props.action}>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="topic.addgraduationproject.title.label" />}
          name="title"
          rules={[
            {
              required: true,
              message: intl.formatMessage({
                id: 'topic.addgraduationproject.title.required',
              }),
            },
          ]}
        >
          <Input
            placeholder={intl.formatMessage({
              id: 'topic.addgraduationproject.title.placeholder',
            })}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="topic.addgraduationproject.term.label" />}
          name="term"
          rules={[
            {
              required: true,
              message: intl.formatMessage({ id: 'topic.addgraduationproject.term.required' }),
            },
          ]}
        >
          <DatePicker picker="year" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="topic.addgraduationproject.description.label" />}
          name="description"
        >
          <TextArea
            style={{ minHeight: 32 }}
            placeholder={intl.formatMessage({
              id: 'topic.addgraduationproject.description.placeholder',
            })}
            rows={4}
          />
        </FormItem>
        <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
          <Button type="primary" htmlType="submit">
            <FormattedMessage id="topic.addgraduationproject.submit" />
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
