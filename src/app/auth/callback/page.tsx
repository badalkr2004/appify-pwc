import { onAuthenticateUser } from "@/actions/user";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const AuthCallbackPage = async () => {
  const { sessionClaims } = await auth();
  const role = sessionClaims?.metadata?.role;
  const afterSignIn = await onAuthenticateUser();

  if (afterSignIn.status === 200 || afterSignIn.status === 201) {
    if (role === "admin") {
      return redirect(`/admin`);
    }
    return redirect(`/`);
  }

  if (
    afterSignIn.status === 403 ||
    afterSignIn.status === 400 ||
    afterSignIn.status === 500
  )
    return redirect("/auth/sign-in");
};

export default AuthCallbackPage;
