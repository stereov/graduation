import React, { useState } from 'react';
import { Input, Form, Button, DatePicker, Modal, Checkbox, Row, Col } from 'antd';
import { FormattedMessage, useIntl } from 'umi';
import { InitialValuesProps } from '../data.d';

interface CreateFormProps {
  modalVisible: boolean;
  onCancel: () => void;
  initialValues?: InitialValuesProps;
  action: (values: any) => Promise<boolean>;
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

  const [checkSet, setCheckSet] = useState({
    title: false,
    term: false,
    description: false,
  });

  return (
    <Modal
      width={1200}
      destroyOnClose
      title="添加毕业设计"
      visible={modalVisible}
      onCancel={() => {
        setCheckSet({
          title: false,
          term: false,
          description: false,
        });
        onCancel();
      }}
      footer={null}
    >
      <Form onFinish={props.action} initialValues={props.initialValues}>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="tipic,updategraduationproject.selectupdateitem" />}
        >
          <Row align="middle">
            <Col span={8}>
              <Checkbox
                onChange={(e) => {
                  setCheckSet({
                    ...checkSet,
                    title: e.target.checked,
                  });
                }}
              >
                课题题目
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                onChange={(e) => {
                  setCheckSet({
                    ...checkSet,
                    term: e.target.checked,
                  });
                }}
              >
                学期
              </Checkbox>
            </Col>
            <Col span={8}>
              <Checkbox
                onChange={(e) => {
                  setCheckSet({
                    ...checkSet,
                    description: e.target.checked,
                  });
                }}
              >
                课题描述
              </Checkbox>
            </Col>
          </Row>
        </FormItem>
        {checkSet.title ? (
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="topic.addgraduationproject.title.label" />}
            name="title"
            rules={[
              {
                required: checkSet.title,
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
        ) : null}
        {checkSet.term ? (
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="topic.addgraduationproject.term.label" />}
            name="term"
            rules={[
              {
                required: checkSet.term,
                message: intl.formatMessage({ id: 'topic.addgraduationproject.term.required' }),
              },
            ]}
          >
            <DatePicker picker="year" />
          </FormItem>
        ) : null}
        {checkSet.description ? (
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="topic.addgraduationproject.description.label" />}
            name="description"
            rules={[
              {
                required: checkSet.description,
                message: intl.formatMessage({
                  id: 'topic.addgraduationproject.description.required',
                }),
              },
            ]}
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder={intl.formatMessage({
                id: 'topic.addgraduationproject.description.placeholder',
              })}
              rows={4}
            />
          </FormItem>
        ) : null}
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
