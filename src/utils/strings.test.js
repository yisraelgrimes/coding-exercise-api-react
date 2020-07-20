/* eslint-disable no-undef */
import { string } from "./strings";

// isEmpty
test("should return true if string is empty", () => {
    const action = string.isEmpty("");
    expect(action).toBe(true);
});

// isEmpty
test("should return false if string is not empty", () => {
    const action = string.isEmpty("string");
    expect(action).toBe(false);
});

// lowerCase
test("should convert string to lowercase", () => {
    const action = string.lowerCase("StRiNg");
    expect(action).toBe("string");
});

// upperCase
test("should convert string to UPPERCASE", () => {
    const action = string.upperCase("StRiNg");
    expect(action).toBe("STRING");
});

// upperCase
test("should convert string to UPPERCASE", () => {
    const action = string.upperCase("StRiNg");
    expect(action).toBe("STRING");
});

// titleCase
test("should convert string to title-case", () => {
    const action = string.titleCase("this is a string");
    expect(action).toBe("This Is A String");
});

// isEmailValid
test("should return true if email is valid", () => {
    const action = string.isEmailValid("r2d2@bleepbloop.net");
    expect(action).toBe(true);
});

// isEmailValid
test("should return false if email is not valid", () => {
    const action = string.isEmailValid("r2d2@bleep@bloop");
    expect(action).toBe(false);
});
