// src/lib/blog/pagination.ts
export const paginate = <T>(
  items: readonly T[],
  page: number,
  perPage: number
) => {
  const total = items.length
  const pageCount = Math.max(1, Math.ceil(total / Math.max(1, perPage)))
  const current = Math.min(Math.max(1, Math.floor(page || 1)), pageCount)
  const start = (current - 1) * perPage
  const end = start + perPage
  return {
    items: items.slice(start, end),
    page: current,
    pageCount,
    total,
    hasPrev: current > 1,
    hasNext: current < pageCount,
  }
}

export const getPageParamFromSearchParams = (
  sp: Record<string, string | string[] | undefined>
) => {
  const raw = sp?.page
  if (Array.isArray(raw)) return Number(raw[0]) || 1
  return Number(raw) || 1
}
