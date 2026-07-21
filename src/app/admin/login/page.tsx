import Link from "next/link";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { BrandMark } from "@/components/public/media/BrandMark";
import { getAdminSession } from "@/lib/auth";
import Image from "next/image";

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
                <Image src="/images/train-hills.webp" alt="A train crossing Sri Lanka's green hill country"  width={1920} height={1280} sizes="(max-width: 1024px) 100vw, 50vw"/>
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
