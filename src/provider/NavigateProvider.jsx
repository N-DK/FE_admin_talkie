import { useHistory } from '../hooks/useHistory';

export const NavigateProvider = ({ children }) => {
    useHistory();
    return children;
};
