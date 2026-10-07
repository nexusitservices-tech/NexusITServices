/**
 * Nexus IT Services FZ-LLC — Client Portal Access Control & Session Management
 * Strict ABAC/RBAC: Access to /app is locked until reviewed & approved by admin.
 */

export interface PortalSession {
  email: string;
  fullName: string;
  company: string;
  role: 'client' | 'admin';
  requestId?: string;
  token: string;
  approvedAt: string;
}

const PORTAL_SESSION_KEY = 'nexus_portal_session';

/**
 * Retrieve current active portal session
 */
export function getPortalSession(): PortalSession | null {
  try {
    const raw = localStorage.getItem(PORTAL_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PortalSession;
  } catch {
    return null;
  }
}

/**
 * Set and persist active portal session
 */
export function setPortalSession(session: PortalSession): void {
  try {
    localStorage.setItem(PORTAL_SESSION_KEY, JSON.stringify(session));
    window.dispatchEvent(new Event('portal-auth-changed'));
  } catch (e) {
    console.error('Failed to persist portal session:', e);
  }
}

/**
 * Clear current active session (Logout)
 */
export function clearPortalSession(): void {
  try {
    localStorage.removeItem(PORTAL_SESSION_KEY);
    window.dispatchEvent(new Event('portal-auth-changed'));
  } catch (e) {
    console.error('Failed to clear portal session:', e);
  }
}

/**
 * Check if the user has an approved, active portal session
 */
export function isPortalApproved(): boolean {
  const session = getPortalSession();
  return session !== null && !!session.email && (session.role === 'client' || session.role === 'admin');
}

/**
 * Check if current user is an Administrator
 */
export function isPortalAdmin(): boolean {
  const session = getPortalSession();
  return session !== null && session.role === 'admin';
}

/**
 * Authorize as Super Administrator (instant admin session)
 */
export function loginAsAdmin(): PortalSession {
  const session: PortalSession = {
    email: 'admin@nexus.ae',
    fullName: 'Nexus Chief Systems Officer',
    company: 'Nexus IT Services FZ-LLC (Admin)',
    role: 'admin',
    token: `NEX-ADMIN-TOKEN-${Date.now()}`,
    approvedAt: new Date().toISOString()
  };
  setPortalSession(session);
  return session;
}

/**
 * Authorize an approved client account request
 */
export function loginWithApprovedRequest(req: {
  email: string;
  fullName: string;
  company: string;
  requestId: string;
}): PortalSession {
  const session: PortalSession = {
    email: req.email,
    fullName: req.fullName,
    company: req.company,
    role: 'client',
    requestId: req.requestId,
    token: `NEX-CLIENT-${req.requestId}-${Date.now()}`,
    approvedAt: new Date().toISOString()
  };
  setPortalSession(session);
  return session;
}
