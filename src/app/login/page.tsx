// import { LoginForm } from "@/features/auth/components/LoginForm";

// export default function LoginPage() {
//   return <LoginForm />;
// }
import dynamic from "next/dynamic";

// Disable SSR for the login form to prevent Error #418 completely
const LoginForm = dynamic(
  () => import("@/features/auth/components/LoginForm").then((mod) => mod.LoginForm),
  { ssr: false }
);

export default function LoginPage() {
  return <LoginForm />;
}