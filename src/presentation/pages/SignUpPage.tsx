import { ProjectLogo } from '@/utils/ProjectLogo';
import { SignupFormContainer } from '../components/organisms/SignUpFormContainer';
import { TopNav } from '@/utils/TopNav';

export default function SignupPage() {
  return (
    <div className="min-h-screen w-screen items-center bg-primary text-gray-800 flex flex-col">
      <div className="absolute top-4 left-4">
          <ProjectLogo />
      </div>
      <div className="pt-6">
          <TopNav />
      </div>

      <div className="flex-grow flex items-center justify-center">
      <SignupFormContainer />
      </div>
    </div>
  );
}