import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFavoryList } from "../hooks/useFavories";
import * as api from "../apis/favories";

jest.spyOn(api, "getFavoryList");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  /* eslint-disable react/display-name */
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("useFavoryList", () => {
  it("favory 목록 조회", async () => {
    const mockData = {
      content: [
        {
          id: 116,
          userId: 26,
          userNickname: "hotsummer",
          userImageUrl: "https://...",
          mediaId: 432919,
          mediaTitle: "BIRDS OF A FEATHER",
          mediaCreator: "Billie Eilish",
          mediaYear: 2024,
          mediaType: "MUSIC",
          mediaImageUrl: "https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62",
          title: "유유상종",
          content: "같은 깃털의 새인 우리는 함께여야 해",
          tags: [
            { id: 104, name: "빌리아일리쉬" },
            { id: 42, name: "팝송" },
          ],
          likeCount: 2,
          likedByMe: false,
          createdAt: "2026-03-09T04:50:13.808916",
          updatedAt: "2026-03-09T04:51:41.021379",
          deletedAt: null,
        },
      ],
      pageNumber: 0,
      pageSize: 10,
      totalElements: 1,
      totalPages: 1,
    };

    (api.getFavoryList as jest.Mock).mockResolvedValue(mockData);

    const { result } = renderHook(
      () => useFavoryList({ page: 0, size: 10 }),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    expect(result.current.data?.content.length).toBe(1);
    expect(result.current.data?.content[0].mediaTitle).toBe("BIRDS OF A FEATHER");
    expect(api.getFavoryList).toHaveBeenCalledWith({ page: 0, size: 10 });
  });
});
