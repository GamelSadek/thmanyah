import { expect, test } from "vitest";

import { splitArrayintoSubArrays } from "../functions";

test("should split array to sub arrays successfuly ", () => {
    const arrayBiggerThanSize = [{
        a: 1,
    }, {
        b: 2,
    }, {
        c: 3,
    }, {
        d: 4,
    }];
    const expectedResult = [[{
        a: 1,
    }, {
        b: 2,
    }], [{
        c: 3,
    }, {
        d: 4,
    }]]

    const result = splitArrayintoSubArrays({ bigArray: arrayBiggerThanSize, size:2});

    expect(result).toEqual(expectedResult);
});

