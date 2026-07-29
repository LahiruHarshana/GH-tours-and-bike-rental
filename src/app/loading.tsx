export default function Loading() {
  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="page-loader__sun" aria-hidden="true"><span>GH</span></div>
      <p>Opening the island</p>
      <small>Please wait a moment</small>
    </div>
  );
}
