import { useEffect } from 'react';
import storage from '../../utils/storage';
import { routeConfig } from '../../configs/routeConfig';
import { InitialScreen } from '../../components/InitialScreen';
import { useAppSelector } from '../../app/hooks';
import { _app } from '../../utils/_app';
import { history } from '../../helper';

export const AuthHoc = ({ children }) => {
    const { isAuth } = useAppSelector((state) => state?.user?.access);

    const initData = async () => {
        _app.getInitialData
            ?.all()
            .then((fb) => {
                _app.setUserAuthed(true);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {});
    };

    useEffect(() => {
        const token = storage.getAccessToken();

        if (!token) {
            history?.navigate?.(routeConfig?.login);
        }

        initData();
    }, []);

    if (!isAuth) {
        return <InitialScreen />;
    }

    return (
        <>
            <InitialScreen isFadeOut />
            {children}
        </>
    );
};
