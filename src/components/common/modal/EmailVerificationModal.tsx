import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface EmailVerificationModalProps {
  email: string;
  onVerify: (code: string) => Promise<void>;
  onClose: () => void;
}

export default function EmailVerificationMdoal({
  email,
  onVerify,
  onClose,
}: EmailVerificationModalProps) {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerifyClick = async () => {
    try {
      setIsLoading(true);
      await onVerify(code);
      onClose();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section aria-label="이메일 인증하기">
      <div className="mb-4">
        <h2 className="text-black-500 text-lg font-semibold md:text-2lg">
          이메일 인증하기
        </h2>
        <p className="text-black-200 text-md md:mt-1 md:text-lg">
          {email}로 발송된 6자리 인증 번호를 입력해 주세요
        </p>
      </div>

      <Input
        placeholder="예) 123456"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        maxLength={6}
      />

      <div className="flex gap-2 justify-end mt-6">
        <Button variant="outline" onClick={onClose}>
          닫기
        </Button>
        <Button
          onClick={handleVerifyClick}
          isLoading={isLoading}
          disabled={code.length !== 6}
        >
          인증 번호 확인
        </Button>
      </div>
    </section>
  );
}
