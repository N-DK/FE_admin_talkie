import React, { useState, useEffect } from 'react';
import {
    Input,
    Select,
    Checkbox,
    Button,
    Tooltip,
    Form,
    Avatar,
    Switch,
    Row,
    Col,
} from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import PhonePreview from './components/PhonePreview';
import { SwitchDarkMode } from './components/SwtichDarkMode';
import { SwitchLock } from './components/SwitchLock';
import { AiOutlineMail, AiOutlinePhone, AiOutlineTool } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { setSystem } from '../../features/system/systemSlice';
import { updateSystem } from '../../services/systemService.service';
import { api } from '../../helper';
import { store } from '../../app/store';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const BasicConfiguration = () => {
    const dispatch = store.dispatch;
    const { t } = useTranslation();
    const { system } = useSelector((state) => state.system);
    const [config, setConfig] = useState(system);
    const [isFlagSave, setIsFlagSave] = useState(false);

    const handleInputChange = (field, value) => {
        setConfig((prevConfig) => ({
            ...prevConfig,
            [field]: value,
        }));
    };

    const handleSave = () => {
        setIsFlagSave(true);
        api.modal?.confirm({
            title: t('confirm_save_title'),
            icon: <SaveOutlined />,
            content: t('confirm_save_content'),
            okText: t('btn_save'),
            cancelText: t('btn_cancel'),
            onOk: () => {
                const loadingApiClose = api.message?.loading(
                    t('confirm_save_loading'),
                    20,
                );
                updateSystem(config)
                    .then((fb) => {
                        dispatch(setSystem(config));
                        api.message?.success(t('confirm_save_success'));
                    })
                    .catch((error) => {
                        api.message?.error(t('confirm_save_error'));
                    })
                    .finally(() => {
                        loadingApiClose?.();
                        setIsFlagSave(false);
                    });
            },
            centered: true,
            onCancel: () => {
                setIsFlagSave(false);
            },
        });
    };

    // Sự kiện phím tắt Ctrl + S
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                if (!isFlagSave) {
                    handleSave();
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [config, isFlagSave]);

    return (
        <div className="flex justify-center overflow-x-hidden">
            <div className="w-[40%] px-24">
                <div className="flex flex-col items-center justify-center mb-4">
                    <Avatar src={config.logo} size={100} />
                    <Form.Item>
                        <Input
                            value={config.name}
                            onChange={(e) =>
                                handleInputChange('name', e.target.value)
                            }
                            className="w-max mt-2 text-center"
                        />
                    </Form.Item>
                </div>
                <Form layout="vertical">
                    <Row justify="space-between" gutter={16}>
                        <Col>
                            <Form.Item label="Chế độ mặc định">
                                <SwitchDarkMode
                                    initialValue={config.mode_default}
                                    handleChange={(value) =>
                                        handleInputChange(
                                            'mode_default',
                                            value ? 1 : 0,
                                        )
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item label="Khóa ứng dụng">
                                <SwitchLock
                                    initialValue={config.block_app}
                                    handleChange={(value) =>
                                        handleInputChange(
                                            'block_app',
                                            value ? 1 : 0,
                                        )
                                    }
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Ngôn ngữ mặc định">
                        <Select
                            value={config.language_default}
                            onChange={(value) =>
                                handleInputChange('language_default', value)
                            }
                            style={{ width: '100%' }}
                        >
                            <Option value={1}>Tiếng Việt</Option>
                            <Option value={2}>English</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <div className="flex items-center">
                            <label className="mr-2 inline-flex items-center">
                                <AiOutlineMail className="mr-2" size={20} />
                                Kích hoạt email
                            </label>
                            <Switch
                                checked={config.switch_email}
                                onChange={(checked) =>
                                    handleInputChange('switch_email', checked)
                                }
                            />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div className="flex items-center">
                            <label className="mr-2 inline-flex items-center">
                                <AiOutlinePhone className="mr-2" size={20} />
                                Kích hoạt số điện thoại
                            </label>
                            <Switch
                                checked={config.switch_phone}
                                onChange={(checked) =>
                                    handleInputChange('switch_phone', checked)
                                }
                            />
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div className="flex items-center">
                            <label className="mr-2 inline-flex items-center">
                                <AiOutlineTool className="mr-2" size={20} />
                                Bảo trì
                            </label>
                            <Switch
                                checked={config.maintenance}
                                onChange={(checked) =>
                                    handleInputChange('maintenance', checked)
                                }
                            />
                        </div>
                    </Form.Item>

                    <Tooltip title="Ctrl + S">
                        <Button
                            type="primary"
                            icon={<SaveOutlined />}
                            onClick={handleSave}
                            style={{ width: '100%' }}
                        >
                            Lưu
                        </Button>
                    </Tooltip>
                </Form>
            </div>
            <PhonePreview system={config} />
        </div>
    );
};

export default BasicConfiguration;
