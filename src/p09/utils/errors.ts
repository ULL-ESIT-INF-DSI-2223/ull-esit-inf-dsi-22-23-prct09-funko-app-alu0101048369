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

export function isSystemError(e: unknown): e is SystemError {
  return typeof e === "object" && e !== null
    && "code" in e
    && "errno" in e
    && "message" in e
    && "syscall" in e
}
