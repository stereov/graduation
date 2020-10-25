import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useRef, FC } from 'react';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Dispatch } from 'umi';
import { Card, Button, Menu, Dropdown, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { fetchTopicData, TopicParamsType, addTopic, delTopic, updateTopic } from '@/services/topic';
import moment from 'moment';
import { TopicActionStateType } from '@/models/topic';
import cookie from 'react-cookies';
import CreateForm from './components/CreaterForm';
import CreateUpdateForm from './components/CreateUpdateForm';
import { TopicTableListItem, InitialValuesProps } from './data.d';

interface TopicFormProps {
  dispatch: Dispatch;
  topicAction: TopicActionStateType;
  submitting?: boolean;
}

const TopicForm: FC<TopicFormProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [createUpdateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [initialValues, setInitialValues] = useState<InitialValuesProps>();

  const [updateItemKey, setUpdateItemKey] = useState<number>(0);

  // console.log(props);

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TopicTableListItem>[] = [
    {
      title: 'ID',
      key: 'key',
      dataIndex: 'key',
      hideInSearch: true,
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
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: { text: '未选', status: 'Error' },
        1: { text: '已选', status: 'Success' },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      hideInSearch: true,
      render: (_: any, record: TopicTableListItem) => (
        <>
          <a
            onClick={() => {
              if (record.status === 1) {
                message.warning('该课题已选，禁止修改');
                return;
              }
              setUpdateItemKey(record.key);
              // console.log(updateItemKey);
              const oldValues = {
                title: record.title,
                term: moment(record.term, 'YYYYY'),
                description: record.description,
              };
              setInitialValues(oldValues);
              handleUpdateModalVisible(true);
            }}
          >
            修改
          </a>
        </>
      ),
    },
  ];

  const onAddFinish = async (values: TopicParamsType) => {
    const payload = {
      id: 0,
      title: values.title,
      term: Number(moment(values.term).format('YYYY')),
      description: values.description === 'undefined' ? '' : values.description,
      status: 0,
      studentid: 0,
      teacherid: cookie.load('userid'),
    };
    const hide = message.loading('正在添加');
    try {
      let result = false;
      const response = await addTopic(payload);
      hide();
      message.success(response.msg);
      if (response.code === 9) {
        handleModalVisible(false);
        if (actionRef.current) {
          // console.log('refresh');
          actionRef.current.reload();
        }
        result = true;
      }
      return result;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };

  const onUpdateFinish = async (values: any) => {
    let updateCondition = '';
    const conditionSet: Array<string> = [];
    if (JSON.stringify(values) === '{}') {
      message.warning('没有选中要修改的项目');
      return false;
    }
    Object.keys(values).forEach((key) => {
      if (key === 'term') {
        const term = Number(moment(values[key]).format('YYYY'));
        conditionSet.push(`${key} = ${term}`);
      } else {
        conditionSet.push(`${key} = '${values[key]}'`);
      }
      updateCondition = conditionSet.join(',');
    });

    const updateConditionFull = `${updateCondition} where id = ${updateItemKey}`;
    const hide = message.loading('正在修改');
    try {
      let result = false;
      const response = await updateTopic(updateConditionFull);
      if (response.code === 15) {
        handleUpdateModalVisible(false);
        if (actionRef.current) {
          // console.log('refresh');
          actionRef.current.reload();
        }
        result = true;
      }
      return result;
    } catch (error) {
      hide();
      message.error('添加失败请重试！');
      return false;
    }
  };

  return (
    <PageContainer content="课题管理，教师可以进行增删改查">
      <Card>
        <ProTable<TopicTableListItem> // 表格Pro组件
          headerTitle="课题列表" // 表头
          actionRef={actionRef} // 用于触发刷新操作等，看api
          // rowKey={record => record.id} // 表格行 key 的取值，可以是字符串或一个函数 dataSource中包含key关键字，则无需设置
          toolBarRender={(action, { selectedRows }) => [
            <Button
              type="primary"
              onClick={() => {
                handleModalVisible(true);
              }}
            >
              <PlusOutlined /> 添加毕业设计
            </Button>,
            selectedRows && selectedRows.length > 0 && (
              <Dropdown
                overlay={
                  <Menu selectedKeys={[]}>
                    <Menu.Item
                      key="remove"
                      onClick={async () => {
                        const delTopicSet: Array<number> = [];
                        for (let i: number = 0; i < selectedRows.length; i += 1) {
                          delTopicSet.push(selectedRows[i].key);
                        }
                        const response = await delTopic(delTopicSet);
                        message.success(response.msg);
                        if (actionRef.current) {
                          // console.log('refresh');
                          actionRef.current.reload();
                        }
                      }}
                    >
                      批量删除
                    </Menu.Item>
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

        <CreateForm
          onCancel={() => handleModalVisible(false)}
          modalVisible={createModalVisible}
          action={onAddFinish}
        />

        <CreateUpdateForm
          onCancel={() => handleUpdateModalVisible(false)}
          modalVisible={createUpdateModalVisible}
          initialValues={initialValues}
          action={onUpdateFinish}
        />
      </Card>
    </PageContainer>
  );
};

export default TopicForm;
