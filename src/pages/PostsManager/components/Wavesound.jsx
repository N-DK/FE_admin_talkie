import WavesurferPlayer from '@wavesurfer/react';
import { useState } from 'react';
import { FaRegPauseCircle } from 'react-icons/fa';
import { FaRegCirclePlay } from 'react-icons/fa6';

function WaveSound({ audio }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState('00:00');
    const [wavesurfer, setWavesurfer] = useState(null);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${secs
            .toString()
            .padStart(2, '0')}`;
    };

    const onReady = (ws) => {
        setWavesurfer(ws);
        setIsPlaying(false);
    };

    const onAudioprocess = (ws) => {
        setDuration(formatTime(ws.getCurrentTime()));
    };

    const onPlayPause = () => {
        wavesurfer && wavesurfer.playPause();
    };

    return (
        <div className="w-full flex flex-col mr-4">
            <div className="flex items-center mb-4 justify-between">
                {duration && <span className=" mr-4">{duration}</span>}
                <button onClick={onPlayPause} className="">
                    {isPlaying ? (
                        <FaRegPauseCircle size={32} />
                    ) : (
                        <FaRegCirclePlay size={32} />
                    )}
                </button>
            </div>
            <WavesurferPlayer
                waveColor="linear-gradient(to right, #FF5722, #FFEB3B)"
                progressColor="#3186FE"
                cursorWidth={2}
                height={50}
                width="100%"
                url={audio}
                normalize={true}
                backend="WebAudio"
                barWidth={6}
                barRadius={99999999}
                cursorColor="transparent"
                onReady={onReady}
                onAudioprocess={onAudioprocess}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
        </div>
    );
}

export default WaveSound;
