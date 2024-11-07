import React from 'react';
import { Button, Result } from 'antd';
import { useTranslation } from 'react-i18next';
import { history } from '../../helper';
const NotFound = () => {
    const { t } = useTranslation();

    return (
        <Result
            status="404"
            title="404"
            subTitle={t('not_found_message')}
            extra={
                <Button onClick={() => history?.navigate?.('/')} type="primary">
                    {t('btn_back_home')}
                </Button>
            }
        />
    );
};
export default NotFound;
