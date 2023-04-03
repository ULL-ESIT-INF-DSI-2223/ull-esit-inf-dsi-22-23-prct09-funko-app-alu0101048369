/**
 * Error interface represents a generic Error object.
 */
interface Error {
  message: string
}

/**
 * SystemError represents the unexposed SystemError of NodeJS.
 */
interface SystemError {
  code: string
  errno: number
  message: string
  syscall: string
  address?: string
  dest?: string
  info?: unknown
  path?: string
  port?: number
}

/**
 * isError checks if the value provided is an Error.
 * @param e Value to check.
 * @returns Whether it is an error or not.
 */
export function isError(e: unknown): e is Error {
  return typeof e === "object" && e !== null && "message" in e
}

/**
 * isSystemError checks if the value provided is a SystemError.
 * @param e Value to check.
 * @returns Whether it is a SystemError or not.
 */
export function isSystemError(e: unknown): e is SystemError {
  return isError(e) && "code" in e && "errno" in e && "syscall" in e
}
