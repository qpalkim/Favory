import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAddFavory } from "../hooks/useFavories";
import * as api from "../apis/favories";

jest.spyOn(api, "addFavory");

const addWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  /* eslint-disable react/display-name */
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe("useAddFavory", () => {
  it("favory 등록", async () => {
    const mockResponse = {
      id: 1,
      title: "테스트",
    };

    const requestData = {
      title: "테스트",
      content: "내용",
    };

    (api.addFavory as jest.Mock).mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useAddFavory(), {
      wrapper: addWrapper(),
    });

    await act(async () => {
      await result.current.mutateAsync(requestData);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    })

    expect(api.addFavory).toHaveBeenCalledWith(
      requestData,
      expect.objectContaining({
        client: expect.any(Object),
      })
    );
    expect(result.current.isSuccess).toBe(true);
  });
});