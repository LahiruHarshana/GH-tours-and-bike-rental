import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { BrandMark } from "@/components/ui/BrandMark";
import { getAdminSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  const session = await getAdminSession();
  if (session) redirect("/admin");

  return (
    <main className="admin-login-page">
      <div className="admin-login-art">
        <div className="admin-login-art__pattern" />
        <div className="admin-login-art__content">
          <span>GH OPERATIONS</span>
          <h1>Run every journey<br />from one calm place.</h1>
          <p>Manage airport transfers, private tours, the bike fleet and guest communication.</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/train-hills.jpg" alt="A train crossing Sri Lanka's green hill country" />
      </div>
      <section className="admin-login-panel">
        <div className="admin-login-panel__inner">
          <BrandMark dark />
          <div className="admin-login-copy"><span>Secure administrator access</span><h2>Welcome back.</h2><p>Sign in with the account created by the database seed command.</p></div>
          <LoginForm />
          <Link href="/">← Return to website</Link>
        </div>
      </section>
    </main>
  );
}
