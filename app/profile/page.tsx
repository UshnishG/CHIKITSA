// app/profile/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import PatientProfile from "@/components/patient"
import DoctorProfile from '@/components/doctor';
import { AdminProfile } from '@/components/admin';
import { Settings } from 'lucide-react';

interface ProfileData {
  role: 'doctor' | 'patient' | 'admin';
  [key: string]: any;
}

const ProfilePage = () => {
  const { user, loading: authLoading } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data() as ProfileData);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };
    if (!authLoading) fetchProfile();
  }, [authLoading, user]);

  const handleSave = async () => {
    if (!user || !profileData) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), profileData);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const roleColors: Record<string, string> = {
    doctor: 'from-blue-500 to-blue-700',
    patient: 'from-green-500 to-green-700',
    admin: 'from-purple-500 to-purple-700'
  };

  const roleColor = roleColors[profileData?.role as string] || 'from-gray-500 to-gray-700';

  if (authLoading || loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto p-6">
        {profileData?.role === 'patient' && (
          <PatientProfile
            profileData={profileData}
            setProfileData={setProfileData}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        )}
        {profileData?.role === 'doctor' && (
          <DoctorProfile
            profileData={profileData}
            setProfileData={setProfileData}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        )}
        {profileData?.role === 'admin' && (
          <AdminProfile
            profileData={profileData}
            setProfileData={setProfileData}
            editMode={editMode}
            setEditMode={setEditMode}
          />
        )}

        {editMode && (
          <div className="mt-6 text-right">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
