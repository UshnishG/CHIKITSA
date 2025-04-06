// components/admin.tsx
'use client';

import { useState, useRef } from 'react';
import { Shield, Mail, Phone, User, FileText, Calendar, Clock, Building, Upload, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface ProfileData {
  [key: string]: any;
}

interface AdminProfileProps {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AdminProfile = ({ profileData, setProfileData, editMode, setEditMode }: AdminProfileProps) => {
  const [sectionIndex, setSectionIndex] = useState<number>(0);
  const { user } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const update = (field: string, value: any) => setProfileData((prev: ProfileData) => ({ ...prev, [field]: value }));

  const handleImageUpload = async (file: File) => {
    if (!user || !file) return;
    const storageRef = ref(storage, `avatars/${user.uid}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    update('photoURL', url);
    await updateDoc(doc(db, 'users', user.uid), { photoURL: url });
  };

  const sections: { title: string; fields: [keyof ProfileData, string, JSX.Element][] }[] = [
    {
      title: 'Admin Info',
      fields: [
        ['name', 'Full Name', <User />],
        ['email', 'Email', <Mail />],
        ['contactNumber', 'Phone Number', <Phone />],
        ['adminRole', 'Admin Role', <Shield />],
        ['adminBio', 'Admin Bio', <FileText />],
        ['assignedInstitutions', 'Assigned Institutions', <Building />]
      ]
    },
    {
      title: 'System Access (Read Only)',
      fields: [
        ['dateJoined', 'Date Joined', <Calendar />],
        ['lastLogin', 'Last Login', <Clock />],
        ['adminId', 'Admin ID', <Shield />]
      ]
    }
  ];

  const handleNext = () => setSectionIndex((prev: number) => (prev + 1) % sections.length);
  const handlePrev = () => setSectionIndex((prev: number) => (prev - 1 + sections.length) % sections.length);

  return (
    <motion.div className="bg-white shadow rounded-lg p-6 relative">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <img
              src={profileData.photoURL || '/images/default-avatar.png'}
              className="w-24 h-24 rounded-full object-cover border-4 border-purple-500 shadow"
              alt="avatar"
            />
            {editMode && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full text-white opacity-0 group-hover:opacity-100 transition"
              >
                <Upload className="w-5 h-5" />
              </button>
            )}
            <input
              type="file"
              ref={fileInputRef}
              hidden
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files?.[0] as File)}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
            <p className="text-sm text-gray-600">{profileData.email}</p>
          </div>
        </div>
        <button onClick={() => router.push('/settings')} className="text-purple-600 hover:text-purple-800">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={sections[sectionIndex].title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-purple-700 mb-4">
            {sections[sectionIndex].title}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sections[sectionIndex].fields.map(([key, label, icon]) => (
              <div key={String(key)} className="flex flex-col">
                <label className="text-sm text-gray-600 font-medium flex items-center gap-2 mb-1">
                  {icon} {label}
                </label>
                {editMode && sectionIndex === 0 ? (
                  <input
                    type="text"
                    value={profileData[key] || ''}
                    onChange={(e) => update(key, e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <div className="bg-gray-100 px-3 py-2 rounded text-gray-800 font-medium">
                    {profileData[key] || 'Not specified'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center mt-8">
        <div className="flex gap-3">
          <button onClick={handlePrev} className="text-purple-700 hover:underline">Previous</button>
          <button onClick={handleNext} className="text-purple-700 hover:underline">Next</button>
        </div>
        <button
          onClick={() => setEditMode((prev: boolean) => !prev)}
          className="bg-purple-600 text-white text-sm px-4 py-2 rounded hover:bg-purple-700 shadow"
        >
          {editMode ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>
    </motion.div>
  );
};
