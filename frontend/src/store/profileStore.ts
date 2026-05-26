import { create } from 'zustand';
import { getProfileFromStorage, saveProfileToStorage, generateRandomProfile, type Profile } from '../utils/profile';

interface ProfileStore {
    profile: Profile;
    crtEnabled: boolean;
    setProfile: (newProfile: Profile) => void;
    updateEmoji: (emoji: string) => void;
    updateName: (name: string) => void;
    setCrtEnabled: (enabled: boolean) => void;
}

export const useProfileStore = create<ProfileStore>((set, get) => {
    let initialProfile = getProfileFromStorage();
    
    if (!initialProfile.name || !initialProfile.emoji) {
        initialProfile = generateRandomProfile();
        saveProfileToStorage(initialProfile);
    }

    const savedCrt = localStorage.getItem('crtEnabled');
    const crtEnabled = savedCrt === null ? true : savedCrt === 'true';

    return {
        profile: initialProfile,
        crtEnabled,
        
        // 2. Global update functions
        setProfile: (newProfile) => {
            saveProfileToStorage(newProfile);
            set({ profile: newProfile });
        },
        
        updateEmoji: (emoji) => {
            const updated = { ...get().profile, emoji };
            saveProfileToStorage(updated);
            set({ profile: updated });
        },
        
        updateName: (name) => {
            const updated = { ...get().profile, name };
            saveProfileToStorage(updated);
            set({ profile: updated });
        },

        setCrtEnabled: (enabled) => {
            localStorage.setItem('crtEnabled', String(enabled));
            set({ crtEnabled: enabled });
        }
    };
});