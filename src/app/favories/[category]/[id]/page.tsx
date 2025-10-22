interface PageProps {
  params: {
    category: string;
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const { category, id } = params;

  return (
    <div>
      Favory {category} {id} 상세 페이지
    </div>
  );
}
