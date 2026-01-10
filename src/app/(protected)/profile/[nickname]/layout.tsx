export async function generateMetadata({
  params,
}: {
  params: Promise<{ nickname: string }>;
}) {
  const paramNickname = decodeURIComponent((await params).nickname).replace(
    /^@/,
    "",
  );

  return {
    title: `${paramNickname}님의 프로필 | Favory`,
    description: `${paramNickname}님이 작성한 감상평을 확인해 보세요`,
    openGraph: {
      type: "profile",
      title: `${paramNickname}님의 프로필 | Favory`,
      description: `${paramNickname}님이 작성한 감상평을 확인해 보세요`,
      siteName: "Favory",
      images: [
        {
          url: "/thumbnail.jpg",
          width: 800,
          height: 600,
          alt: "Favory 배너",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${paramNickname}님의 프로필 | Favory`,
      description: `${paramNickname}님이 작성한 감상평을 확인해 보세요`,
      images: ["/thumbnail.jpg"],
    },
  };
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
