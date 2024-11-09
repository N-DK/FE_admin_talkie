import { useSelector } from 'react-redux';

function SendEmailConfiguration() {
    const { system } = useSelector((state) => state.system);

    return <div>send email</div>;
}

export default SendEmailConfiguration;
