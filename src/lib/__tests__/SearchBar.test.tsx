import { render, fireEvent } from "@testing-library/react";
import SearchBar from "../../components/ui/SearchBar";

describe("SearchBar", () => {
  it("입력값 변경", () => {
    const { getByRole } = render(
      <SearchBar searchTerm="" onSearch={jest.fn()} />
    );

    const input = getByRole("searchbox");

    fireEvent.change(input, {
      target: { value: "test" },
    });

    expect((input as HTMLInputElement).value).toBe("test");
  });

  it("submit 시, onSearch 호출됨", () => {
    const onSearch = jest.fn();

    const { getByRole } = render(
      <SearchBar searchTerm="" onSearch={onSearch} />
    );

    const input = getByRole("searchbox");

    fireEvent.change(input, {
      target: { value: "hello" },
    });

    fireEvent.submit(getByRole("search"));

    expect(onSearch).toHaveBeenCalledWith("hello");
  });

  it("공백 입력 시, onSearch 호출 안 됨", () => {
    const onSearch = jest.fn();

    const { getByRole } = render(
      <SearchBar searchTerm="" onSearch={onSearch} />
    );

    const input = getByRole("searchbox");

    fireEvent.change(input, {
      target: { value: "   " },
    });

    fireEvent.submit(getByRole("search"));

    expect(onSearch).not.toHaveBeenCalled();
  });

  it("X 버튼 클릭 시, 입력값 초기화", () => {
    const { getByRole } = render(
      <SearchBar searchTerm="hello" onSearch={jest.fn()} />
    );

    const input = getByRole("searchbox");

    expect((input as HTMLInputElement).value).toBe("hello");

    const button = getByRole("button", { hidden: true });

    fireEvent.click(button);

    expect((input as HTMLInputElement).value).toBe("");
  });

  it("앞뒤 공백 제거 후 검색됨", () => {
    const onSearch = jest.fn();

    const { getByRole } = render(
      <SearchBar searchTerm="" onSearch={onSearch} />
    );

    const input = getByRole("searchbox");

    fireEvent.change(input, {
      target: { value: "  hello  " },
    });

    fireEvent.submit(getByRole("search"));

    expect(onSearch).toHaveBeenCalledWith("hello");
  });
});