import React from 'react';
import type { ActiveTab } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const Tab: React.FC<{ label: string; active: boolean; onClick: () => void; disabled?: boolean }> = ({ label, active, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-3 md:px-5 py-2 text-xs md:text-sm font-semibold transition-all duration-200 rounded-md whitespace-nowrap ${
      active ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20' : 'text-slate-300 hover:bg-slate-700/50'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    {label}
  </button>
);

export const TopNavBar: React.FC<{
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}> = ({ activeTab, onTabChange }) => {
  const { t } = useLanguage();
  return (
    <nav className="max-w-[1800px] mx-auto mb-6 flex justify-center">
      <div className="flex items-center space-x-1 bg-slate-800/80 border border-slate-700 p-1.5 rounded-xl shadow-lg overflow-x-auto thin-scrollbar">
          <Tab label={t('tabCreate')} active={activeTab === 'create'} onClick={() => onTabChange('create')} />
          <Tab label={t('tabCameraAngle')} active={activeTab === 'cameraAngle'} onClick={() => onTabChange('cameraAngle')} />
          <Tab label={t('tabEdit')} active={activeTab === 'edit'} onClick={() => onTabChange('edit')} />
          <Tab label={t('tabPlanTo3D')} active={activeTab === 'planTo3d'} onClick={() => onTabChange('planTo3d')} />
          <Tab label={t('tabCanvaMix')} active={activeTab === 'canva'} onClick={() => onTabChange('canva')} />
          <Tab label={t('tabCreatePrompt')} active={activeTab === 'prompt'} onClick={() => onTabChange('prompt')} />
          <Tab label={t('tabCreateVideo')} active={activeTab === 'video'} onClick={() => onTabChange('video')} />
          <Tab label={t('tabUtilities')} active={activeTab === 'utilities'} onClick={() => onTabChange('utilities')} />
      </div>
    </nav>
  );
};