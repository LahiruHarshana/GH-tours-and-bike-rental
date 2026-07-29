import { ContentForm } from "@/components/admin/ContentForm";
import { getWebsiteContent } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const content = await getWebsiteContent();
  return (
    <>
      <div className="admin-page-head">
        <div>
          <span>Website publishing</span>
          <h1>Website content</h1>
          <p>Manage the text, imagery, contact details and homepage story shown to guests.</p>
        </div>
      </div>
      <ContentForm content={content} />
    </>
  );
}

