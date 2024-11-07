import { useEffect, useState } from 'react';
import { routeConfig } from '../../../configs/routeConfig';
import { api, history } from '../../../helper';
import storage from '../../../utils/storage';

import React from 'react';

import { Button, ConfigProvider, Form, Input, theme } from 'antd';

import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { loginService } from '../../../services/userService.service';
import { useTranslation } from 'react-i18next';

function LoginForm() {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { message } = await loginService(values);
            api?.message?.success(message);
            gotoApp();
        } catch (error) {
            api?.message?.error(error?.message);
        } finally {
            setLoading(false);
        }
    };

    const gotoApp = () => {
        history?.navigate?.(`${routeConfig?.userManager}`);
    };

    useEffect(() => {
        const token = storage?.getAccessToken();

        if (token) {
            gotoApp();
        }
    });

    return (
        <Form
            form={form}
            name="normal_login"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
            style={{}}
        >
            <Form.Item
                name="email"
                rules={[
                    {
                        type: 'email',
                        required: true,
                        message: t('form_warning_invalid', {
                            field: 'Email',
                        }),
                    },
                ]}
            >
                <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[
                    {
                        required: true,
                        message: t('form_warning_empty', {
                            field: t('form_login_password'),
                        }),
                    },
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder={t('form_login_password')}
                />
            </Form.Item>
            {/* <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a style={styles.forgotPassword} href="">
                    Forgot password?
                </a>
            </Form.Item> */}
            <Form.Item style={{ marginBottom: '0px' }}>
                <Button
                    block="true"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                >
                    {t('btn_login')}
                </Button>
                {/* <div style={styles.footer}>
                    <Text style={styles.text}>Don't have an account?</Text>{' '}
                    <Link href="">Sign up now</Link>
                </div> */}
            </Form.Item>
        </Form>
    );
}

export default LoginForm;
