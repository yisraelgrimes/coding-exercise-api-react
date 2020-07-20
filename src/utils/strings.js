/* eslint no-useless-escape: 0 */

// String manipulation functions.
// Each one is exported individually, but can also be
// used as a method on string.
// ex: string.lowercase(`This Is a String`)

// :::::::::::::::::::::::::::::::::::::

/**
 * BOOL - Check string to make sure it's not blank
 */
export function isEmpty(str) {
    return (!str || 0 === str.length);
}

/**
 * String.toLowerCase()
 */
export function lowerCase(str){
    return str.toLowerCase();
}

/**
 * String.toUpperCase()
 */
export function upperCase(str){
    return str.toUpperCase();
}

/**
 * Convert a string to title-case
 */
export function titleCase(str){
    return lowerCase(str).replace(/^\w|\s\w/g, upperCase);
}

/**
 * Validate email format
 */
export function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const string = {
    isEmpty,
    lowerCase,
    upperCase,
    titleCase,
    isEmailValid,
};
