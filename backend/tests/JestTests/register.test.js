const logicRegister = require("../../utils/registerLogic/registerPatterns")

//password pattern

test("password valid", () => {
    expect(logicRegister.isValidPassword('Password123!')).toBe(true)
});
test('password missing uppercase letter', () => {
    expect(logicRegister.isValidPassword('password123!')).toBe(false);
});

test('password missing lowercase letter', () => {
    expect(logicRegister.isValidPassword('PASSWORD123!')).toBe(false);
});

test('password missing number', () => {
    expect(logicRegister.isValidPassword('Password!')).toBe(false);
});

test('password missing special character', () => {
    expect(logicRegister.isValidPassword('Password123')).toBe(false);
});

test('password too short', () => {
    expect(logicRegister.isValidPassword('P1!a')).toBe(false);
});

test('password too long', () => {
    expect(logicRegister.isValidPassword('Password123!Password123!')).toBe(false);
});

//Email pattern

test('email valid', () => {
    expect(logicRegister.isValidEmail('test@example.com')).toBe(true);
});

test('email missing @ symbol', () => {
    expect(logicRegister.isValidEmail('test.example.com')).toBe(false);
});

test('email missing domain', () => {
    expect(logicRegister.isValidEmail('test@.com')).toBe(false);
});

test('email missing top-level domain', () => {
    expect(logicRegister.isValidEmail('test@example')).toBe(false);
});

test('email contains spaces', () => {
    expect(logicRegister.isValidEmail('test@ example.com')).toBe(false);
});

test('email missing username', () => {
    expect(logicRegister.isValidEmail('@example.com')).toBe(false);
});

test('email empty string', () => {
    expect(logicRegister.isValidEmail('')).toBe(false);
});