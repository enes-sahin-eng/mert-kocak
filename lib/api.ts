/**
 * Laravel backend API tabanı.
 * - Sunucu tarafında `API_BASE_URL` okunur.
 * - Tarayıcı tarafında (iletişim formu, bülten, istatistik takibi) yalnızca
 *   `NEXT_PUBLIC_` ön ekli değişkenler erişilebilir olduğundan
 *   `NEXT_PUBLIC_API_BASE_URL` kullanılır (build sırasında inline edilir).
 * - Geliştirmede varsayılan http://localhost:8000.
 */
export const API_BASE_URL = (
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8000"
).replace(/\/$/, "");
