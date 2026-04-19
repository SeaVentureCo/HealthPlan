// Time-zone aware "today" date computation.
//
// We deliberately use the user's IANA timezone (set via cookie from the client)
// instead of UTC so the daily checklist resets at the user's local midnight.
// When the user travels, their device's TZ updates → next page load updates
// the cookie → daily reset follows them.

const TZ_COOKIE = "tz";
const FALLBACK_TZ = "Europe/Amsterdam";

/**
 * Format a Date as YYYY-MM-DD in the given IANA timezone.
 * 'en-CA' locale produces ISO-style date strings.
 */
export function localDateString(tz: string, now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/**
 * Read the timezone the client previously stored in a cookie.
 * Falls back to Europe/Amsterdam (Blair's home TZ) if missing or invalid.
 */
export function readTzFromCookies(
  cookieStore: { get: (name: string) => { value: string } | undefined },
): string {
  const raw = cookieStore.get(TZ_COOKIE)?.value;
  if (!raw) return FALLBACK_TZ;
  try {
    new Intl.DateTimeFormat("en-CA", { timeZone: raw }).format(new Date());
    return raw;
  } catch {
    return FALLBACK_TZ;
  }
}

/**
 * Browser-side: detect the device's IANA timezone.
 */
export function detectBrowserTz(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || FALLBACK_TZ;
  } catch {
    return FALLBACK_TZ;
  }
}

export const TZ_COOKIE_NAME = TZ_COOKIE;
