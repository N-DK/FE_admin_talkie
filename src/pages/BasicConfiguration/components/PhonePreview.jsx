import { Avatar } from 'antd';
import { IPhoneMockup } from 'react-device-mockup';
import { AiOutlineLock } from 'react-icons/ai';

const LANGUAGE = {
    2: {
        name: 'Welcome to',
        continue: 'Continue with phone',
        continueEmail: 'Continue with email',
    },
    1: {
        name: 'Chào mừng đến với',
        continue: 'Tiếp tục với số điện thoại',
        continueEmail: 'Tiếp tục với email',
    },
};

function PhonePreview({ system }) {
    return (
        <IPhoneMockup screenWidth={320}>
            <div
                className={`w-full relative ${
                    system?.mode_default ? 'bg-[#1E293B]' : 'bg-white'
                }`}
            >
                <div className="flex justify-center w-full flex-col items-center mt-4">
                    <Avatar src={system.logo} size={60} />
                    <h1
                        className={`text-base mt-1 ${
                            system?.mode_default ? 'text-white' : 'text-black'
                        }`}
                    >
                        {LANGUAGE[system?.language_default]?.name} {system.name}
                    </h1>
                </div>
                <div className="absolute bottom-5 left-0 w-full">
                    {system?.switch_phone && (
                        <div className="w-[80%] bg-black text-white text-center rounded-full mx-auto p-3 mb-2">
                            {LANGUAGE[system?.language_default]?.continue}
                        </div>
                    )}
                    {system?.switch_email && (
                        <div className="w-[80%] bg-white text-black shadow-xl text-center rounded-full mx-auto p-3 mb-2">
                            {LANGUAGE[system?.language_default]?.continueEmail}
                        </div>
                    )}
                </div>
            </div>
            {!!system?.block_app && (
                <div
                    className={`absolute bottom-0 left-0 right-0 top-0 bg-black/20 backdrop-blur-sm rounded-[45px]`}
                >
                    <div className="w-full h-full flex justify-center items-center">
                        <AiOutlineLock className="text-white" size={100} />
                    </div>
                </div>
            )}
        </IPhoneMockup>
    );
}

export default PhonePreview;
