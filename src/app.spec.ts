import { describe, expect, test } from "@jest/globals";
import app from "./app";

describe('App', () => {
    test('should be defined', () => {
        expect(app).toBeDefined();
    });
});