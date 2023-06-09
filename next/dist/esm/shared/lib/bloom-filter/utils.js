/**
 * BufferError
 */ export const BufferError = 'The buffer class must be available, if you are a browser user use the buffer package (https://www.npmjs.com/package/buffer)';
/**
 * Create a new array fill with a base value
 * @param size - The size of the array
 * @param defaultValue - The default value used to fill the array. If it's a function, it will be invoked to get the default value.
 * @return A newly allocated array
 * @memberof Utils
 */ export function allocateArray(size, defaultValue) {
    const array = new Array(size);
    const getDefault = typeof defaultValue === 'function' ? defaultValue : ()=>defaultValue;
    for(let ind = 0; ind < size; ind++){
        array[ind] = getDefault();
    }
    return array;
}
/**
 * Return a number to its Hex format by padding zeroes if length mod 4 != 0
 * @param elem the element to transform in HEX
 * @returns the HEX number padded of zeroes
 */ export function numberToHex(elem) {
    let e = Number(elem).toString(16);
    if (e.length % 4 !== 0) {
        e = '0'.repeat(4 - e.length % 4) + e;
    }
    return e;
}
/**
 * Generate a random int between two bounds (included)
 * @param min - The lower bound
 * @param max - The upper bound
 * @param random - Function used to generate random floats
 * @return A random int bewteen lower and upper bound (included)
 * @memberof Utils
 * @author Thomas Minier
 */ export function randomInt(min, max, random) {
    if (random === undefined) {
        random = Math.random;
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    const rn = random();
    return Math.floor(rn * (max - min + 1)) + min;
}
/**
 * Return the non-destructive XOR of two buffers
 * @param a - The buffer to copy, then to xor with b
 * @param b - The buffer to xor with
 * @return The results of the XOR between the two buffers
 * @author Arnaud Grall
 */ export function xorBuffer(a, b) {
    const length = Math.max(a.length, b.length);
    const buffer = Buffer.allocUnsafe(length).fill(0);
    for(let i = 0; i < length; ++i){
        if (i < a.length && i < b.length) {
            buffer[length - i - 1] = a[a.length - i - 1] ^ b[b.length - i - 1];
        } else if (i < a.length && i >= b.length) {
            buffer[length - i - 1] ^= a[a.length - i - 1];
        } else if (i < b.length && i >= a.length) {
            buffer[length - i - 1] ^= b[b.length - i - 1];
        }
    }
    // now need to remove leading zeros in the buffer if any
    let start = 0;
    const it = buffer.values();
    let value = it.next();
    while(!value.done && value.value === 0){
        start++;
        value = it.next();
    }
    return buffer.slice(start);
}
/**
 * Return true if the buffer is empty, i.e., all value are equals to 0.
 * @param  buffer - The buffer to inspect
 * @return True if the buffer only contains zero, False otherwise
 * @author Arnaud Grall
 */ export function isEmptyBuffer(buffer) {
    if (buffer === null || !buffer) return true;
    for (const value of buffer){
        if (value !== 0) {
            return false;
        }
    }
    return true;
}
/**
 * Return the default seed used in the package
 * @return A seed as a floating point number
 * @author Arnaud Grall
 */ export function getDefaultSeed() {
    return 0x1234567890;
}

//# sourceMappingURL=utils.js.map