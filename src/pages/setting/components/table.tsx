import { Button, Dropdown, Menu } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useRef } from 'react';
import { fetchData } from '@/services/user';

const UserInfoTable: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns[] = [
    {
      title: '用户名', // 表头显示的名称
      key: 'username',
      dataIndex: 'username', // 列数据在数据项中对应的路径，支持通过数组查询嵌套路径
    },
    {
      title: '角色',
      key: 'role',
      dataIndex: 'role',
    },

  ];

  return (
    <ProTable // 表格Pro组件
      headerTitle="查询表格" // 表头
      actionRef={actionRef} // 用于触发刷新操作等，看api
      // rowKey={record => record.id} // 表格行 key 的取值，可以是字符串或一个函数 dataSource中包含key关键字，则无需设置
      toolBarRender={(action, { selectedRows }) => [
        <Button icon={<PlusOutlined />} type="primary" onClick={() => {}}>
          新建
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
      request={(params) => fetchData(params)} // 请求数据的地方，例子是用mock模拟数据，我是在后台请求的数据
      columns={columns} // 上面定义的
      rowSelection={{}}
    />
  );
};

export default UserInfoTable;
