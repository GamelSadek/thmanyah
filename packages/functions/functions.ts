export function splitArrayintoSubArrays({ bigArray, size }: { bigArray: any[], size: number }) {
    const arrayOfArrays = [];
    for (var i = 0; i < bigArray.length; i += size) {
        arrayOfArrays.push(bigArray.slice(i, i + size));
    }
    return arrayOfArrays
}