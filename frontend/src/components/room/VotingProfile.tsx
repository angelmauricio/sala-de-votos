import type { Profile } from '../../utils/profile';

export function VotingProfile(profile: Profile) {
    return (
        <div key={profile.id} className="flex flex-col items-center w-24">
            <div className="w-16 h-16 flex items-center justify-center text-4xl shadow-inner">
                {profile.emoji}
            </div>
            <span className="text-xs text-gray-300 bg-black/60 px-2 py-1 border border-gray-800">
                {profile.name}
            </span>
        </div>
    );
};;
