"use client";

import { useEffect } from "react";
import { detectBrowserTz, TZ_COOKIE_NAME } from "@/lib/timezone";

/**
 * On mount, write the device's IANA timezone to a cookie so server components
 * can compute "today" against the user's local midnight, not UTC.
 *
 * Refresh on every render so a TZ change (travel, DST) propagates next visit.
 */
export default function TimezoneCookie() {
  useEffect(() => {
    const tz = detectBrowserTz();
    // 365-day cookie, SameSite=Lax (works on all GET navigations)
    document.cookie = `${TZ_COOKIE_NAME}=${encodeURIComponent(tz)}; path=/; max-age=31536000; SameSite=Lax`;
  }, []);
  return null;
}
