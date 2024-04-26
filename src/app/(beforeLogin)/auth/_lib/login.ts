"use server";

import { signIn } from "@/auth";

const onSubmit = async (prevState: any, formData: FormData) => {
  // console.log(formData);

  if (
    !formData.get("username") ||
    !(formData.get("username") as string)?.trim()
  ) {
    return { message: "NO_EMAIL_OR_USER_ID" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "NO_PASSWORD" };
  }

  try {
    await signIn("credentials", {
      userIdOrEmail: formData.get("username") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    return { message: "SUCCESS" };
  } catch (error) {
    // console.error(error);
    return { message: "INVALID_DATA" };
  }
};

export default onSubmit;
