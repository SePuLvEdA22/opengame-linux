import { describe, expect, it } from "vitest";
import { recomendarDistro } from "./distros";

describe("distros RF-09", () => {
  it("2 GB → Lubuntu", () => {
    expect(recomendarDistro(2, "Intel HD 4000").id).toBe("lubuntu");
  });
  it("8 GB + Nvidia → Bazzite", () => {
    expect(recomendarDistro(8, "GTX 1050").id).toBe("bazzite");
  });
  it("6 GB genérico → Mint", () => {
    expect(recomendarDistro(6, "RX 550").nombre).toBe("Linux Mint");
  });
});
