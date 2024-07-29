import { createContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import { Session } from "@supabase/supabase-js";

export interface LoginStateContextType {
  session: Session | null;
}

export const LoginStateContext = createContext<LoginStateContextType | null>(null);

export default function LoginStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <LoginStateContext.Provider value={{ session }}>
      {children}
    </LoginStateContext.Provider>
  );
}
