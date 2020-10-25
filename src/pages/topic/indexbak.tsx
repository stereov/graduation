import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useRef, FC } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { FormattedMessage, useIntl, Dispatch, connect } from 'umi';
import { Input, Form, Card, Button, Menu, Dropdown, DatePicker, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { fetchTopicData, TopicParamsType } from '@/services/topic';
import moment from 'moment';
import { TopicActionStateType } from '@/models/topic';
import CreateForm from './components/CreaterForm';
import { TopicTableListItem } from './data';

const FormItem = Form.Item;
const { TextArea } = Input;

interface TopicFormProps {
  dispatch: Dispatch;
  topicAction: TopicActionStateType;
  submitting?: boolean;
}

const TopicForm: FC<TopicFormProps> = (props) => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const intl = useIntl(); // 国际化 如果用formatMessage会报
  // Warning: Using this API will cause automatic refresh when switching languages, please use useIntl or injectIntl.
  // 使用此 api 会造成切换语言的时候无法自动刷新，请使用 useIntl 或 injectIntl。

  // console.log(props);
  const { topicAction = {}, submitting } = props;
  const { result, msg } = topicAction;

  const actionRef = useRef<ActionType>();

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

  const columns: ProColumns<TopicTableListItem>[] = [
    {
      title: 'ID',
      key: 'key',
      dataIndex: 'key',
    },
    {
      title: '课题题目', // 表头显示的名称
      key: 'title',
      dataIndex: 'title', // 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
    },
    {
      title: '学期',
      key: 'term',
      dataIndex: 'term',
    },
    {
      title: '课题说明',
      key: 'description',
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: '学生学号',
      key: 'studentnumber',
      dataIndex: 'studentnumber',
    },
    {
      title: '选题学生',
      key: 'student',
      dataIndex: 'student',
    },
  ];

  const onFinish = (values: TopicParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'topicAction/addTopic',
      payload: {
        title: values.title,
        term: moment(values.term).format('YYYY'),
        description: values.description === 'undefined' ? '' : values.description,
      },
    });
  };

  return (
    <PageContainer content="课题管理，教师可以进行增删改查">
      <Card title="添加毕业设计" bordered={false}>
        <Form onFinish={onFinish}>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="topic.addgraduationproject.title.label" />}
            name="title"
            rules={[
              {
                required: true,
                message: intl.formatMessage({ id: 'topic.addgraduationproject.title.required' }),
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
      </Card>
      <br />
      <Card>
        <ProTable<TopicTableListItem> // 表格Pro组件
          headerTitle="课题列表" // 表头
          actionRef={actionRef} // 用于触发刷新操作等，看api
          // rowKey={record => record.id} // 表格行 key 的取值，可以是字符串或一个函数 dataSource中包含key关键字，则无需设置
          toolBarRender={(action, { selectedRows }) => [
            <Button type="primary" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> 添加毕业设计
            </Button>,
            selectedRows && selectedRows.length > 0 && (
              <Dropdown
                overlay={
                  <Menu selectedKeys={[]}>
                    <Menu.Item key="remove">批量删除</Menu.Item>
                  </Menu>
                }
              >
                <Button>
                  批量操作 <DownOutlined />
                </Button>
              </Dropdown>
            ),
          ]}
          request={(params) => fetchTopicData(params)}
          columns={columns} // 上面定义的
          rowSelection={{}}
        />
        <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
          <Card title="添加毕业设计" bordered={false}>
            <Form onFinish={onFinish}>
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
          </Card>
        </CreateForm>
      </Card>
    </PageContainer>
  );
};

export default connect(
  ({
    topicAction, // 要与model的namespace对应
    loading,
  }: {
    topicAction: TopicActionStateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    topicAction,
    submitting: loading.effects['topicAction/addTopic'],
  }),
)(TopicForm);
