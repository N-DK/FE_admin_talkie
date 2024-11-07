import { useEffect } from 'react';
import { history } from '../../helper';
import { routeConfig } from '../../configs/routeConfig';

export const RootPage = () => {
    useEffect(() => {
        history.navigate?.(`${routeConfig?.userManager}`);
    }, []);
    return null;
};
