export default function EmptyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-br'>
      <body>{children}</body>
    </html>
  );
}
