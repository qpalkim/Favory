import formatTime from "../utils/formatTime";

describe("formatTime", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-01-01T12:00:00Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("1분 미만이면 '방금 전' 반환", () => {
    const result = formatTime("2026-01-01T11:59:40Z");
    expect(result).toBe("방금 전");
  });

  test("KST 보정으로 인해 5분 전 → 방금 전", () => {
    const result = formatTime("2026-01-01T11:55:00Z");
    expect(result).toBe("방금 전");
  });

  test("KST 보정으로 인해 2시간 전 → 방금 전", () => {
    const result = formatTime("2026-01-01T10:00:00Z");
    expect(result).toBe("방금 전");
  });

  test("3일 전 → '그저께' (numeric: auto)", () => {
    const result = formatTime("2025-12-29T12:00:00Z");
    expect(result).toBe("그저께");
  });

  test("2개월 전", () => {
    const result = formatTime("2025-11-01T12:00:00Z");
    expect(result).toBe("2개월 전");
  });

  test("1년 전 → '작년'", () => {
    const result = formatTime("2025-01-01T12:00:00Z");
    expect(result).toBe("작년");
  });
});