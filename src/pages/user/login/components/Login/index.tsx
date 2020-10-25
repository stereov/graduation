import { Form } from 'antd';
import React from 'react';

import classNames from 'classnames';
import { FormInstance } from 'antd/es/form';
import { LoginParamsType } from '@/services/login';
import LoginItem, { LoginItemProps } from './LoginItem';

import LoginSubmit from './LoginSubmit';
import LoginTab from './LoginTab';
import styles from './index.less';


export interface LoginProps {
  activeKey?: string;
  onTabChange?: (key: string) => void;
  style?: React.CSSProperties;
  onSubmit?: (values: LoginParamsType) => void;
  className?: string;
  form?: FormInstance;
  children: React.ReactElement<typeof LoginTab>[];
}

interface LoginType extends React.FC<LoginProps> {
  Tab: typeof LoginTab;
  Submit: typeof LoginSubmit;
  UserName: React.FunctionComponent<LoginItemProps>;
  Password: React.FunctionComponent<LoginItemProps>;
  Role: React.FunctionComponent<LoginItemProps>;
  Mobile: React.FunctionComponent<LoginItemProps>;
  Captcha: React.FunctionComponent<LoginItemProps>;
}

const Login: LoginType = (props) => {
  const { className } = props;
 
  return (
    <div className={classNames(className, styles.login)}>
      <Form
        form={props.form}
        onFinish={(values) => {
          if (props.onSubmit) {
            props.onSubmit(values as LoginParamsType);
          }
        }}
      >
        {props.children}
      </Form>
    </div>
  );
};

Login.Tab = LoginTab;
Login.Submit = LoginSubmit;

Login.UserName = LoginItem.UserName;
Login.Password = LoginItem.Password;
Login.Role = LoginItem.Role;
Login.Mobile = LoginItem.Mobile;
Login.Captcha = LoginItem.Captcha;

export default Login;
