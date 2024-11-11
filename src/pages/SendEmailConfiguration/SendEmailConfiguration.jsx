import { Avatar, Button, TreeSelect } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TagsInput } from 'react-tag-input-component';
import TagInput from './components/TagInput';
import FroalaEditor from 'react-froala-wysiwyg';
import { getAllUserService } from '../../services/userService.service';
import { adminSendEmail } from '../../services/systemService.service';
import { useTranslation } from 'react-i18next';
import { api } from '../../helper';

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;

function SendEmailConfiguration() {
    const [options, setOptions] = useState([]);
    const [content, setContent] = useState('');
    const [email, setEmail] = useState([]);
    const { t } = useTranslation();

    const fetchData = async () => {
        const res = await getAllUserService(0, 999999);

        setOptions([
            {
                title: t('select_all'),
                value: 'all',
                key: 'all',
                children: res.data
                    ?.filter((item) => item.email)
                    ?.map((item) => ({
                        value: item.email,
                        title: (
                            <div className="flex items-center">
                                <Avatar
                                    className="mr-2 w-5 h-5"
                                    src={`${SERVER_DOMAIN}/${item.avatar}`}
                                />
                                <span>
                                    {item.name} ({item.email})
                                </span>
                            </div>
                        ),
                    })),
            },
        ]);
    };

    const handleModelChange = (model) => {
        setContent(model);
    };

    const handleChange = (value) => {
        setEmail(value);
    };

    const handleSendEmail = () => {
        const loadingApiClose = api.message?.loading(
            t('confirm_send_email_loading'),
            20,
        );
        adminSendEmail({
            email,
            content,
        })
            .then((fb) => {
                api.message?.success(t('confirm_send_email_success'));
            })
            .catch((error) => {
                api.message?.error(t('confirm_send_email_error'));
            })
            .finally(() => {
                loadingApiClose?.();
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="h-[100%] overflow-auto">
            <div className="h-full relative">
                <TreeSelect
                    treeCheckable
                    showSearch
                    style={{ width: '100%' }}
                    onChange={handleChange}
                    treeData={options}
                    placeholder="Người nhận"
                    maxTagCount="responsive"
                />
                <div className="mt-3 h-[100px]">
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
                                'fontSize',
                                'textColor',
                                'backgroundColor',
                                '|',
                                'formatOL',
                                'formatUL',
                                '|',
                                'align',
                                'outdent',
                                'indent',
                                '|',
                                'insertLink',
                                'insertImage',
                                '|',
                                'undo',
                                'redo',
                            ],
                            editorClass: `editor-send-email `,
                        }}
                    />
                    <div className="mt-20">
                        <Button
                            size="large"
                            type="primary"
                            className="rounded-full"
                            onClick={handleSendEmail}
                        >
                            Gửi email
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SendEmailConfiguration;
