"use client";

import { useState } from "react";
import { ProfileCategory } from "@/lib/types/users";
import ProfileLayout from "@/components/common/profile/ProfileLayout";
import ProfileContent from "@/components/common/profile/ProfileContent";

export default function Page() {
  const [tab, setTab] = useState<ProfileCategory>("MUSIC");

  return (
    <div className="mx-auto mt-8 min-h-screen max-w-[1200px] p-4 md:mt-16">
      <ProfileLayout tab={tab ?? "MUSIC"} onTabChange={setTab}>
        <ProfileContent tab={tab} />
      </ProfileLayout>
    </div>
  );
}
