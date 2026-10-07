/**
 * WhatsApp OpenWA Gateway Client SDK
 * Integrates with self-hosted OpenWA API (https://github.com/rmyndharis/OpenWA.git)
 * Sends instant notifications from the website directly to +971 52 6367221
 */

export interface WhatsAppGatewayConfig {
  gatewayUrl: string;
  apiKey: string;
  sessionId: string;
  targetNumber: string;
  autoNotifyInquiries: boolean;
  autoNotifyEstimator: boolean;
  autoNotifyCallbacks: boolean;
  isConfigured: boolean;
}

export interface WhatsAppGatewayStatus {
  online: boolean;
  sessionState: 'CONNECTED' | 'DISCONNECTED' | 'SCAN_QR_CODE' | 'STARTING' | 'ERROR';
  gatewayUrl: string;
  sessionId: string;
  targetNumber: string;
  phoneConnected?: string;
  latencyMs?: number;
  lastChecked: string;
  message?: string;
}

export interface WhatsAppMessageLog {
  id: string;
  timestamp: string;
  recipient: string;
  message: string;
  status: 'delivered' | 'pending' | 'failed' | 'simulated';
  source: string;
  error?: string;
}

export interface InquiryNotificationPayload {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  requirements?: string;
  source?: string;
}

/**
 * Format any international phone number into OpenWA JID format
 * e.g., "+971 52 636 7221" -> "971526367221@c.us"
 */
export function formatToWhatsAppJid(phone: string): string {
  if (!phone) return '971526367221@c.us';
  const clean = phone.replace(/[^\d]/g, '');
  if (clean.endsWith('@c.us') || clean.endsWith('@g.us')) {
    return clean;
  }
  return `${clean}@c.us`;
}

/**
 * Fetch current WhatsApp Gateway configuration
 */
export async function getWhatsAppConfig(): Promise<WhatsAppGatewayConfig> {
  try {
    const res = await fetch('/api/whatsapp/config');
    if (!res.ok) throw new Error('Failed to fetch config');
    return await res.json();
  } catch (error) {
    console.warn('Using default WhatsApp config:', error);
    return {
      gatewayUrl: 'http://localhost:2785',
      apiKey: '',
      sessionId: 'nexus-primary',
      targetNumber: '+971 52 6367221',
      autoNotifyInquiries: true,
      autoNotifyEstimator: true,
      autoNotifyCallbacks: true,
      isConfigured: false,
    };
  }
}

/**
 * Save / update WhatsApp Gateway configuration
 */
export async function saveWhatsAppConfig(config: Partial<WhatsAppGatewayConfig>): Promise<{ success: boolean; message: string }> {
  const res = await fetch('/api/whatsapp/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config),
  });
  return await res.json();
}

/**
 * Check connectivity and status of the OpenWA Gateway
 */
export async function checkWhatsAppStatus(): Promise<WhatsAppGatewayStatus> {
  try {
    const res = await fetch('/api/whatsapp/status');
    if (!res.ok) throw new Error('Status endpoint unreachable');
    return await res.json();
  } catch (err: any) {
    return {
      online: false,
      sessionState: 'DISCONNECTED',
      gatewayUrl: 'http://localhost:2785',
      sessionId: 'nexus-primary',
      targetNumber: '+971 52 6367221',
      lastChecked: new Date().toISOString(),
      message: err.message || 'Cannot reach OpenWA backend proxy',
    };
  }
}

/**
 * Request starting an OpenWA session
 */
export async function startWhatsAppSession(sessionId = 'nexus-primary'): Promise<any> {
  const res = await fetch('/api/whatsapp/session/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
  return await res.json();
}

/**
 * Fetch QR Code data / image from OpenWA
 */
export async function getWhatsAppQrCode(): Promise<{ qr?: string; status: string; message?: string }> {
  try {
    const res = await fetch('/api/whatsapp/qr');
    return await res.json();
  } catch (err: any) {
    return { status: 'error', message: err.message };
  }
}

/**
 * Request an 8-character pairing code for phone number
 */
export async function requestWhatsAppPairingCode(phone: string): Promise<{ pairingCode?: string; success: boolean; message?: string }> {
  const res = await fetch('/api/whatsapp/pairing-code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone }),
  });
  return await res.json();
}

/**
 * Send a direct WhatsApp text message via OpenWA Gateway
 */
export async function sendWhatsAppMessage(
  text: string, 
  recipientPhone?: string, 
  source = 'Website Direct'
): Promise<{ success: boolean; messageId?: string; status: string; note?: string }> {
  try {
    const res = await fetch('/api/whatsapp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        phone: recipientPhone || '+971 52 6367221',
        source,
      }),
    });
    return await res.json();
  } catch (err: any) {
    console.error('Error sending WhatsApp message:', err);
    return {
      success: false,
      status: 'failed',
      note: err.message,
    };
  }
}

/**
 * Notify the owner WhatsApp number (+971 52 6367221) when an inquiry is submitted
 */
export async function notifyInquiryOnWhatsApp(inquiry: InquiryNotificationPayload): Promise<void> {
  try {
    await fetch('/api/whatsapp/notify-inquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiry),
    });
  } catch (err) {
    console.error('WhatsApp inquiry alert background dispatch error:', err);
  }
}

/**
 * Fetch outbound WhatsApp logs
 */
export async function getWhatsAppLogs(): Promise<WhatsAppMessageLog[]> {
  try {
    const res = await fetch('/api/whatsapp/logs');
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}
