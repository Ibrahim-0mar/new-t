'use client';

import { useRouter } from '@/navigation';
// import { eventsOnLoginComplete, eventsOnSignUpComplete } from '@/utils/events/common';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import { useEffect } from 'react';

const PopUpWindow = ({
  children,
  session,
  method,
}: {
  children: React.ReactNode;
  session: Session | null;
  method: string;
}) => {
  const router = useRouter();

  // useEffect(() => {
  //   if (session?.user?.isNewUser) {
  //     // eventsOnSignUpComplete(session?.user?.provider);
  //     eventsOnSignUpComplete(method);
  //   } else {
  //     // eventsOnLoginComplete(session?.user?.provider);
  //     eventsOnLoginComplete(method);
  //   }
  // }, [session, method]);

  useEffect(() => {
    if (session) {
      window?.opener?.postMessage('signed-in', window.location.origin);
      router.replace('/');
      window.close();
    } else {
      signIn(method, { redirect: false });
    }
  }, [session]);

  return (
    <section className="fixed inset-0 z-[9999] flex h-full w-full items-center justify-center overflow-hidden bg-white">
      {children}
    </section>
  );
};

export default PopUpWindow;
