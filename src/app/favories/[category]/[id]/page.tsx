export default function Page({
  params,
}: {
  params: { category: string; id: string };
}) {
  const { category, id } = params;

  return (
    <div>
      Favory {category} {id} 상세 페이지
    </div>
  );
}
