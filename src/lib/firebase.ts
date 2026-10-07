import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  type Firestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  onSnapshot, 
  doc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  getDocFromServer,
  limit
} from 'firebase/firestore';
import { getAuth, type Auth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json' with { type: 'json' };

// Fallback configuration merged with provisioned configuration
const config = {
  projectId: "project-c9e8e984-c6bf-462e-bb7",
  appId: "1:744695194341:web:1a4d7d17d5879842d8aa0c",
  apiKey: "AIzaSyBbCI9cRrxfIj0ifip3YaY4bq_SiBYhib4",
  authDomain: "project-c9e8e984-c6bf-462e-bb7.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-nexusitservices-33e2e0f0-0c61-4ca8-8228-bb654b1b16d8",
  storageBucket: "project-c9e8e984-c6bf-462e-bb7.firebasestorage.app",
  messagingSenderId: "744695194341",
  ...(firebaseConfig as Record<string, string>)
};

// Initialize Firebase App instance
export const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(config);

// Initialize Firestore targeting the provisioned database
export const db: Firestore = config.firestoreDatabaseId 
  ? getFirestore(app, config.firestoreDatabaseId)
  : getFirestore(app);

// Initialize Firebase Auth
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export interface InquiryRecord {
  id?: string;
  fullName: string;
  company: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  requirements: string;
  status: 'new' | 'in_review' | 'contacted' | 'scheduled' | 'archived';
  createdAt: string;
  source?: string;
}

export interface ClientProjectRecord {
  id?: string;
  projectCode: string;
  clientName: string;
  clientEmail: string;
  title: string;
  serviceCategory: string;
  status: 'discovery' | 'architecture' | 'implementation' | 'launch' | 'support';
  progress: number;
  slaTier: string;
  targetDelivery: string;
  createdAt: string;
}

export interface AccountRequestRecord {
  id?: string;
  requestId: string;
  fullName: string;
  email: string;
  company: string;
  designation?: string;
  phone?: string;
  service: string;
  seats?: string;
  useCase?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  adminNotes?: string;
}

/**
 * Submit an inquiry to Firestore
 */
export async function submitInquiry(data: Omit<InquiryRecord, 'id' | 'status' | 'createdAt'> & Partial<Pick<InquiryRecord, 'status' | 'createdAt'>>): Promise<string> {
  const payload: Omit<InquiryRecord, 'id'> = {
    fullName: data.fullName,
    company: data.company || 'Enterprise Client',
    email: data.email,
    phone: data.phone || '',
    service: data.service,
    budget: data.budget || 'Custom Scope',
    requirements: data.requirements,
    status: data.status || 'new',
    createdAt: data.createdAt || new Date().toISOString(),
    source: data.source || 'Website Contact Form'
  };

  try {
    const docRef = await addDoc(collection(db, 'inquiries'), payload);
    
    // Asynchronously dispatch instant WhatsApp alert to +971 52 6367221 via OpenWA Gateway
    try {
      fetch('/api/whatsapp/notify-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(e => console.warn('WhatsApp alert dispatch non-blocking error:', e));
    } catch {
      // Non-blocking
    }

    return docRef.id;
  } catch (error) {
    console.error('Error submitting inquiry to Firestore:', error);
    // Persist to local backup storage to prevent any loss of lead data
    try {
      const backup = JSON.parse(localStorage.getItem('nexus_backup_inquiries') || '[]');
      backup.push({ ...payload, id: `local_${Date.now()}` });
      localStorage.setItem('nexus_backup_inquiries', JSON.stringify(backup));
    } catch {
      // Ignore local storage error
    }
    throw error;
  }
}

/**
 * Listen to real-time inquiries
 */
export function subscribeToInquiries(
  callback: (inquiries: InquiryRecord[]) => void,
  onError?: (err: Error) => void
) {
  try {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q, 
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as InquiryRecord[];
        callback(items);
      },
      (error) => {
        console.warn('Firestore subscription fallback:', error);
        if (onError) onError(error);
        // Fallback to local storage
        try {
          const backup = JSON.parse(localStorage.getItem('nexus_backup_inquiries') || '[]');
          callback(backup);
        } catch {
          callback([]);
        }
      }
    );
  } catch (err) {
    if (onError && err instanceof Error) onError(err);
    return () => {};
  }
}

/**
 * Update an inquiry's status
 */
export async function updateInquiryStatus(id: string, status: InquiryRecord['status']): Promise<void> {
  try {
    const docRef = doc(db, 'inquiries', id);
    await updateDoc(docRef, { status });
  } catch (error) {
    console.error('Error updating inquiry status in Firestore:', error);
    // Update local storage if fallback
    try {
      const backup = JSON.parse(localStorage.getItem('nexus_backup_inquiries') || '[]');
      const updated = backup.map((item: InquiryRecord) => item.id === id ? { ...item, status } : item);
      localStorage.setItem('nexus_backup_inquiries', JSON.stringify(updated));
    } catch {
      // Ignore
    }
    throw error;
  }
}

/**
 * Seed initial sample projects for tracker / client portal
 */
export async function seedSampleProjectsIfEmpty(): Promise<void> {
  try {
    const snap = await getDocs(collection(db, 'projects'));
    if (!snap.empty) return;

    const sampleProjects: Omit<ClientProjectRecord, 'id'>[] = [
      {
        projectCode: 'NEX-DIFC-881',
        clientName: 'Al-Mansoor Asset Management',
        clientEmail: 'contact@almansoor.ae',
        title: 'Sovereign Cloud Migration to AWS me-central-1',
        serviceCategory: 'IT Services',
        status: 'launch',
        progress: 95,
        slaTier: 'Platinum (15-min SLA)',
        targetDelivery: 'Oct 2026',
        createdAt: new Date(Date.now() - 14 * 86400000).toISOString()
      },
      {
        projectCode: 'NEX-DSO-402',
        clientName: 'Gulf Logistics Cold-Chain',
        clientEmail: 'tech@gulflogistics.ae',
        title: 'Custom ERP & WhatsApp Customs Clearance AI Bot',
        serviceCategory: 'AI & Software',
        status: 'implementation',
        progress: 68,
        slaTier: 'Enterprise SLA',
        targetDelivery: 'Nov 2026',
        createdAt: new Date(Date.now() - 7 * 86400000).toISOString()
      },
      {
        projectCode: 'NEX-MARINA-119',
        clientName: 'Azure Yachts Charter Dubai',
        clientEmail: 'charters@azureyachts.com',
        title: '4K Commercial Adverts & 3D Interactive Yacht Configurator',
        serviceCategory: 'Creative Media',
        status: 'architecture',
        progress: 40,
        slaTier: 'Priority Studio SLA',
        targetDelivery: 'Dec 2026',
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
      }
    ];

    for (const p of sampleProjects) {
      await addDoc(collection(db, 'projects'), p);
    }
  } catch (e) {
    console.warn('Seeding sample projects fallback:', e);
  }
}

/**
 * Validate Firestore connection
 */
export async function validateFirestoreConnection(): Promise<boolean> {
  try {
    await getDocs(query(collection(db, 'projects'), limit(1)));
    return true;
  } catch (error) {
    console.warn('Firestore connectivity check note:', error);
    return false;
  }
}

/**
 * Submit an Account Signup Request for Client Portal access
 */
export async function submitAccountRequest(data: {
  fullName: string;
  email: string;
  company: string;
  designation?: string;
  phone?: string;
  service: string;
  seats?: string;
  useCase?: string;
}): Promise<AccountRequestRecord> {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const requestId = `NX-REQ-${randomSuffix}`;
  
  const payload: Omit<AccountRequestRecord, 'id'> = {
    requestId,
    fullName: data.fullName.trim(),
    email: data.email.trim().toLowerCase(),
    company: data.company.trim(),
    designation: data.designation?.trim() || 'Executive Lead',
    phone: data.phone?.trim() || '',
    service: data.service || 'Managed IT & Cloud Infrastructure',
    seats: data.seats || '1-10 Users',
    useCase: data.useCase?.trim() || 'Access to enterprise telemetry, tickets, and SLA reporting.',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  try {
    const docRef = await addDoc(collection(db, 'accountRequests'), payload);
    const created: AccountRequestRecord = { ...payload, id: docRef.id };
    
    // Also save in local storage for instant offline / cache fallback
    try {
      const backup: AccountRequestRecord[] = JSON.parse(localStorage.getItem('nexus_backup_account_requests') || '[]');
      backup.unshift(created);
      localStorage.setItem('nexus_backup_account_requests', JSON.stringify(backup));
    } catch {
      // ignore
    }

    return created;
  } catch (error) {
    console.error('Error submitting account request to Firestore:', error);
    // Persist to local backup storage so request is not lost
    const localRecord: AccountRequestRecord = {
      ...payload,
      id: `local_${Date.now()}`
    };
    try {
      const backup: AccountRequestRecord[] = JSON.parse(localStorage.getItem('nexus_backup_account_requests') || '[]');
      backup.unshift(localRecord);
      localStorage.setItem('nexus_backup_account_requests', JSON.stringify(backup));
    } catch {
      // ignore
    }
    return localRecord;
  }
}

/**
 * Subscribe to real-time Account Requests (for Admin review)
 */
export function subscribeToAccountRequests(
  callback: (requests: AccountRequestRecord[]) => void,
  onError?: (err: Error) => void
) {
  try {
    const q = query(collection(db, 'accountRequests'), orderBy('createdAt', 'desc'));
    return onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AccountRequestRecord[];
        callback(items);
      },
      (error) => {
        console.warn('Firestore accountRequests listener fallback:', error);
        if (onError) onError(error);
        try {
          const backup = JSON.parse(localStorage.getItem('nexus_backup_account_requests') || '[]');
          callback(backup);
        } catch {
          callback([]);
        }
      }
    );
  } catch (err) {
    if (onError && err instanceof Error) onError(err);
    try {
      const backup = JSON.parse(localStorage.getItem('nexus_backup_account_requests') || '[]');
      callback(backup);
    } catch {
      callback([]);
    }
    return () => {};
  }
}

/**
 * Update Account Request Status (Admin review action: approve / reject)
 */
export async function updateAccountRequestStatus(
  id: string,
  status: 'pending' | 'approved' | 'rejected',
  adminNotes?: string
): Promise<void> {
  const updateData = {
    status,
    reviewedAt: new Date().toISOString(),
    reviewedBy: 'Nexus IT Administrator',
    ...(adminNotes ? { adminNotes } : {})
  };

  try {
    const docRef = doc(db, 'accountRequests', id);
    await updateDoc(docRef, updateData);
  } catch (error) {
    console.error('Error updating account request status in Firestore:', error);
  }

  // Always update local backup cache too
  try {
    const backup: AccountRequestRecord[] = JSON.parse(localStorage.getItem('nexus_backup_account_requests') || '[]');
    const updated = backup.map(item => item.id === id ? { ...item, ...updateData } : item);
    localStorage.setItem('nexus_backup_account_requests', JSON.stringify(updated));
  } catch {
    // ignore
  }
}

/**
 * Seed initial realistic enterprise sample account requests if empty
 */
export async function seedSampleAccountRequestsIfEmpty(): Promise<void> {
  try {
    const snap = await getDocs(collection(db, 'accountRequests'));
    if (!snap.empty) return;

    const sampleRequests: Omit<AccountRequestRecord, 'id'>[] = [
      {
        requestId: 'NX-REQ-7821',
        fullName: 'Khalid Bin Rashid Al-Falasi',
        email: 'khalid@falasi-holdings.ae',
        company: 'Al-Falasi Capital & Logistics',
        designation: 'Chief Technology Officer',
        phone: '+971 50 491 8820',
        service: 'Managed IT & Cloud Infrastructure',
        seats: '25-50 Users',
        useCase: 'Need real-time SOC alerting and infrastructure monitoring across DIFC & Abu Dhabi hubs.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        requestId: 'NX-REQ-6394',
        fullName: 'Elena Rostova',
        email: 'elena@novapharma.com',
        company: 'NovaPharma Middle East FZCO',
        designation: 'Head of Information Systems',
        phone: '+971 52 833 4102',
        service: 'Cybersecurity & SOC Monitoring',
        seats: '10-25 Users',
        useCase: 'Seeking access to client portal for compliance documentation and vulnerability scan logs.',
        status: 'pending',
        createdAt: new Date(Date.now() - 3600000 * 5).toISOString()
      },
      {
        requestId: 'NX-REQ-5108',
        fullName: 'Tariq Al-Mansoor',
        email: 'tariq@almansoor.ae',
        company: 'Al-Mansoor Asset Management',
        designation: 'Managing Director',
        phone: '+971 54 902 1198',
        service: 'Custom Software & API Engineering',
        seats: '5-10 Users',
        useCase: 'Require access to review sprint deliverables, staging builds, and SLA uptime status.',
        status: 'approved',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        reviewedAt: new Date(Date.now() - 86400000).toISOString(),
        reviewedBy: 'Super Admin (Security Team)',
        adminNotes: 'Verified enterprise contract & NDA on file. Full client portal tier granted.'
      }
    ];

    for (const req of sampleRequests) {
      await addDoc(collection(db, 'accountRequests'), req);
    }
  } catch (e) {
    console.warn('Seeding sample account requests note:', e);
  }
}
