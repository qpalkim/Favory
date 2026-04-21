import { render, fireEvent } from "@testing-library/react";
import { useRef } from "react";
import { useClickOutside } from "../utils/useClickOutside";

function TestComponent({ handler }: { handler: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, handler);

  return (
    <div>
      <div data-testid="inside" ref={ref}>
        inside
      </div>
      <div data-testid="outside">
        outside
      </div>
    </div>
  );
};

describe("useClickOutside", () => {
  it("외부 클릭 시 handler 호출됨", () => {
    const handler = jest.fn();

    const { getByTestId } = render(<TestComponent handler={handler} />);

    fireEvent.mouseDown(getByTestId("outside"), {
      bubbles: true,
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it("내부 클릭 시 handler 호출 안 됨", () => {
    const handler = jest.fn();

    const { getByTestId } = render(<TestComponent handler={handler} />);

    fireEvent.mouseDown(getByTestId("inside"), {
      bubbles: true,
    });

    expect(handler).not.toHaveBeenCalled();
  });

  it("touch 이벤트에서도 외부 클릭 시 handler 호출됨", () => {
    const handler = jest.fn();

    const { getByTestId } = render(<TestComponent handler={handler} />);

    fireEvent.touchStart(getByTestId("outside"), {
      bubbles: true,
    });

    expect(handler).toHaveBeenCalledTimes(1);
  });
});
