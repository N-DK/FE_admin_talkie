import { useNavigate } from 'react-router-dom';
import { history } from '../helper';

export const useHistory = () => {
    const navigate = useNavigate();
    history.navigate = navigate;

    return null;
};
