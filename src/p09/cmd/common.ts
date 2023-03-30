/* eslint-disable @typescript-eslint/no-explicit-any */
export function isNonEmptyString(argv: any, fieldName: string): void {
  if (argv[fieldName].trim() === "") {
    throw new Error(`${fieldName} cannot be empty`);
  }
}

export function isPositive(argv: any, fieldName: string) {
  if (!isFinite(argv[fieldName]) || argv[fieldName] < 0) {
    throw new Error(`${fieldName} must be a positive number`);
  }
}

export function isPositiveInteger(argv: any, fieldName: string) {
  isPositive(argv, fieldName)
  if (Math.trunc(argv[fieldName]) !== argv[fieldName]) {
    throw new Error(`${fieldName} must be an integer`);
  }
}
