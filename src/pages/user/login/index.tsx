import { Alert } from 'antd';
import React from 'react';
import { Dispatch, connect } from 'umi';
import { LoginParamsType } from '@/services/login';
import { StateType } from '@/models/login';
import styles from './style.less';
import LoginFrom from './components/Login';

const { UserName, Password, Role, Submit } = LoginFrom;
interface LoginProps {
  dispatch: Dispatch;
  userAndlogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  // console.log(props);
  const { userAndlogin = {}, submitting } = props;
  const { code } = userAndlogin;

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'userAndlogin/login',
      payload: {
        ...values,
      },
    });
  };

  let loginMessage: any = null;

  if (!submitting) {
    switch (code) {
      case 1:
        loginMessage = <LoginMessage content="账户不存在" />;
        break;
      case 2:
        loginMessage = <LoginMessage content="密码错误" />;
        break;
      default:
        loginMessage = null;
    }
  }

  return (
    <div className={styles.main}>
      <LoginFrom onSubmit={handleSubmit}>
        {loginMessage}
        <UserName
          name="userName"
          placeholder="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="密码"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <Role
          name="role"
          placeholder="登录类型"
          rules={[
            {
              required: true,
              message: '请选择登录类型！',
            },
          ]}
        />
        <Submit loading={submitting}>登录</Submit>
      </LoginFrom>
    </div>
  );
};

export default connect(
  ({
    userAndlogin,
    loading,
  }: {
    userAndlogin: StateType;
    loading: {
      effects: {
        [key: string]: boolean;
      };
    };
  }) => ({
    userAndlogin,
    submitting: loading.effects['userAndlogin/login'],
  }),
)(Login);
