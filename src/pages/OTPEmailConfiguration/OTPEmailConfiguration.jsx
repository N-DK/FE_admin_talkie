import React, { useEffect, useState } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../helper';
import { Button, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { setSystem } from '../../features/system/systemSlice';
import { store } from '../../app/store';
import { updateSystem } from '../../services/systemService.service';
import { SaveOutlined } from '@ant-design/icons';

function OTPEmailConfiguration() {
    const { t } = useTranslation();
    const { system } = useSelector((state) => state.system);
    const dispatch = store.dispatch;
    const [content, setContent] = useState(system?.content_email);
    const [isFlagSave, setIsFlagSave] = useState(false);

    const handleModelChange = (model) => {
        setContent(model);
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
                updateSystem({ content_email: content })
                    .then((fb) => {
                        dispatch(setSystem({ content_email: content }));
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

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 's') {
                event.preventDefault();
                if (!isFlagSave) {
                    handleSave();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFlagSave, content]);

    return (
        <div className="h-[100%] overflow-auto">
            <FroalaEditor
                tag="textarea"
                model={content}
                onModelChange={handleModelChange}
                config={{
                    placeholderText: 'Nhập nội dung...',
                    charCounterCount: true,
                    toolbarButtons: [
                        'bold',
                        'italic',
                        'underline',
                        'strikeThrough',
                        '|',
                        'formatOL',
                        'formatUL',
                        '|',
                        'insertLink',
                        'undo',
                        'redo',
                    ],
                }}
            />
            <Tooltip title="Ctrl + S">
                <Button
                    className="mt-3 float-end mr-2"
                    type="primary"
                    icon={<SaveOutlined />}
                    onClick={handleSave}
                >
                    Lưu
                </Button>
            </Tooltip>
        </div>
    );
}

export default OTPEmailConfiguration;
