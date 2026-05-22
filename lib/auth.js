// Auth helper for Next.js API routes — delegates to FastAPI /user/me.
// Single source of truth: backend owns JWT verification and DB lookup.
// Frontend just forwards the cookie and checks the returned role.

const BACKEND_URL = process.env.BACKEND_API_URL || 'http://localhost:5000';

const SUPER_ADMIN_ROLES = new Set(['SUPER_ADMIN', 'HEAD']);

export async function getUserFromRequest(request) {
  const cookie = request.headers.get('cookie') || '';
  if (!cookie) return null;

  try {
    const res = await fetch(`${BACKEND_URL}/user/me`, {
      method: 'GET',
      headers: { Cookie: cookie },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function requireSuperAdmin(request) {
  const user = await getUserFromRequest(request);
  if (!user) {
    return { user: null, error: 'Authentication required', status: 401 };
  }
  if (!SUPER_ADMIN_ROLES.has(user.role)) {
    return { user, error: 'Super Admin access required', status: 403 };
  }
  return { user, error: null, status: 200 };
}
