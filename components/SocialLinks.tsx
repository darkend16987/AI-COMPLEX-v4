import React from 'react';
import { Icon } from './icons';

export const SocialLinks: React.FC = () => (
    <div className="mt-4 pt-5 border-t border-slate-700 flex justify-center items-center gap-4">
        <a href="https://www.facebook.com/groups/815479533482926" target="_blank" rel="noopener noreferrer" title="Facebook Group" className="w-10 h-10 flex items-center justify-center bg-slate-800/80 backdrop-blur-sm rounded-full text-slate-300 hover:bg-blue-600/50 transition-all duration-300 shadow-lg">
            <img src="https://raw.githubusercontent.com/Khanhltvpp1a/Media/main/fb.png" alt="Facebook Page" className="w-9 h-9" />
        </a>
        <a href="https://www.youtube.com/watch?v=q-evXtyBtdQ" target="_blank" rel="noopener noreferrer" title="YouTube Channel" className="w-10 h-10 flex items-center justify-center bg-slate-800/80 backdrop-blur-sm rounded-full text-slate-300 hover:bg-red-600/50 transition-all duration-300 shadow-lg">
            <img src="https://raw.githubusercontent.com/Khanhltvpp1a/Media/main/download%20-%202025-10-13T210424.699.png" alt="YouTube Channel" className="w-9 h-9" />
        </a>
        <a href="https://zalo.me/g/pfgvth223" target="_blank" rel="noopener noreferrer" title="Zalo Group" className="w-10 h-10 flex items-center justify-center bg-slate-800/80 backdrop-blur-sm rounded-full text-slate-300 hover:bg-sky-500/50 transition-all duration-300 shadow-lg">
            <img src="https://raw.githubusercontent.com/Khanhltvpp1a/Media/main/2048px-Icon_of_Zalo.svg.png" alt="Zalo Group" className="w-9 h-9" />
        </a>
        <a href="https://raw.githubusercontent.com/Khanhltvpp1a/Media/main/Untitled%20(53).png" target="_blank" rel="noopener noreferrer" title="Donate" className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-900 font-bold rounded-full hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 shadow-lg">
            <Icon name="heart" className="w-5 h-5" />
            <span>Donate</span>
        </a>
    </div>
);