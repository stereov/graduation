import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';
import { message, Card } from 'antd';
import Batch from '../components/batch';
import UserInfoTable from '../components/table'
import styles from './index.less';

export default () => {
  const dataChange = (info: any) => {
    const { status, response } = info.file;
    
    /*
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    */
    
    if (status === 'done') {
      if (response.code === 7) {
        message.success(`${info.file.name} 上传成功.`);
      } else {
        message.error(`${info.file.name} 上传失败.`);
      }
    } else if (status === 'error') {
      message.error(`${info.file.name} 上传失败.`);
    }
    
  };

  return (
    <PageHeaderWrapper content="用户管理，添加用户、删除用户、重置密码">
      <Card title="批量添加用户" className={styles.card} bordered={false}>
        <Batch
          name="file"
          method="POST"
          hintMessage="点击或者拖拽添加用户文件"
          action="/gserver/uploadfile"
          onChange={dataChange}
          listType="picture"
        />
      </Card>
      <br/>
      <Card title="当前用户列表" className={styles.card} bordered={false}>
        <UserInfoTable />
      </Card>
    </PageHeaderWrapper>
  );
};
