import { Avatar } from 'antd';
import talkieLogo from '../../assets/talkie-logo.png';

function Logo() {
    return (
        <div className="flex items-center justify-center my-4">
            <Avatar src={talkieLogo} alt="logo" size={54} />
        </div>
    );
}

export default Logo;
