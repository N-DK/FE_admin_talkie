import { useLocation } from 'react-router-dom';
import { HEADER } from '../items/ITEMS';

export const useBreadcrumb = () => {
    const { pathname } = useLocation();
    const hisArr = [];

    const findBreadcrumbPath = (items, path) => {
        for (const item of items) {
            if (path.includes(item.key)) {
                hisArr.push(item);
                if (item.children) {
                    findBreadcrumbPath(item.children, path);
                }
                break;
            }
        }
    };

    // Bắt đầu tìm kiếm breadcrumb
    findBreadcrumbPath(HEADER(), pathname);

    return hisArr;
};
