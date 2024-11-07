import LoginForm from './components/LoginForm';
import logo from '../../assets/talkie-logo.png';

import { Avatar, theme, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

function Login() {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <section
            style={{
                background: colorBgContainer,
            }}
            className="flex justify-center items-center h-[100vh]"
        >
            <div className="w-[380px] mx-auto">
                <div className="mb-4 ">
                    <figure className="flex justify-center items-center mb-2">
                        <Avatar src={logo} size={80} />
                    </figure>
                    <Title className="text-center">{t('btn_login')}</Title>
                    <div className="text-center">
                        <Text className="text-center">
                            {t('welcome_message')}
                        </Text>
                    </div>
                </div>
                <LoginForm />
            </div>
        </section>
    );
}

export default Login;
