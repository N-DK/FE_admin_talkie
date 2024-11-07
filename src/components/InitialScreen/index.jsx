import { theme } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgSpinner } from 'react-icons/cg';

export const InitialScreen = ({ isFadeOut = false }) => {
    const { t } = useTranslation();
    const [fadeOut, setFadeOut] = useState(false);
    const [isShow, setIsShow] = useState(true);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        if (isFadeOut) {
            setTimeout(() => {
                setFadeOut(true);
            }, 500);

            setTimeout(() => {
                setIsShow(false);
            }, 1000);
        }
    }, [isFadeOut]);

    if (!isShow) return null;

    return (
        <div
            style={{
                background: colorBgContainer,
            }}
            className={`${
                fadeOut
                    ? `animate__animated animate__fadeOut animate__faster`
                    : ''
            } w-full h-[100vh] flex justify-center items-center fixed top-0 left-0 right-0 bottom-0 z-[9999999]`}
        >
            <div className="flex justify-center items-center gap-2">
                <div className="flex flex-col justify-center items-center gap-3">
                    <CgSpinner size={54} className="animate-spin" />
                    <div className="text-xs">{t('loading_message')}</div>
                </div>

                <div className="h-14">{/* <Logo /> */}</div>
            </div>
        </div>
    );
};
