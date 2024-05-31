import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function SocialRedirectPage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("AccessToken")?.value;
  const refreshToken = cookieStore.get("RefreshToken")?.value;
  const pk = cookieStore.get("Pk")?.value;

  // console.log({ accessToken, refreshToken, pk });

  redirect(
    `/auth/social/c?accessToken=${accessToken}&refreshToken=${refreshToken}&pk=${pk}`
  );
}
