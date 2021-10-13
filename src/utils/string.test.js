import { capitalize, leftPad } from "./string";

it("Testing capitalizing first letter of a string", () => {
  expect(capitalize("marco")).toBe("Marco");
});

it("Testing leftPad function", () => {
  expect(leftPad(3, 5)).toBe("00003");
  expect(leftPad(15, 3)).toBe("015");
  expect(leftPad(115, 3)).toBe("115");
  expect(leftPad(11115, 3)).toBe("11115");
});
