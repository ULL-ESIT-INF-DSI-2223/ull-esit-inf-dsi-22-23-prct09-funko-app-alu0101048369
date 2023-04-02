interface Error {
  message: string
}

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

export function isError(e: unknown): e is Error {
  return typeof e === "object" && e !== null && "message" in e
}

export function isSystemError(e: unknown): e is SystemError {
  return isError(e) && "code" in e && "errno" in e && "syscall" in e
}
