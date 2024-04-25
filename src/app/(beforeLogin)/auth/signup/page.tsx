import SignupForm from "./_component/SignupForm";
import style from "./page.module.css";

export default function SignUpPage() {
  return (
    <div className={style.main}>
      <SignupForm />
    </div>
  );
}
