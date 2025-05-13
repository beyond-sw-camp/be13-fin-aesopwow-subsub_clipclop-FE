import { ProjectLogo } from '../components/atoms/ProjectLogo';
import { SignupCard } from '../components/organisms/SignupCard';
import { TopNav } from '../components/atoms/TopNav';
import { useState } from 'react';

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "", 
    password: "",
    confirmPassword: "",
    agree: false,
  });

  return (
    <div className="min-h-screen w-screen items-center bg-primary text-gray-800 flex flex-col">
      <div className="absolute top-4 left-4">
        <ProjectLogo />
      </div>
      <div className="pt-6">
        <TopNav />
      </div>
      <div className="flex-grow flex items-center justify-center">
        <SignupCard form={form} setForm={setForm}/>
      </div>
    </div>
  );
};