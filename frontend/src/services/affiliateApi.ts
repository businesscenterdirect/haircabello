const API_URL = import.meta.env.VITE_API_URL || 'https://api.leakassure.com';

const affiliateHeaders = () => ({
    'Content-Type': 'application/json',
});

// --- AUTH ---
export const affiliateSignup = async (data: {
    name: string; email: string; password: string; paypalEmail?: string; zelleInfo?: string;
}) => {
    const res = await fetch(`${API_URL}/api/affiliate/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Signup failed');
    return json;
};

export const affiliateLogin = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/api/affiliate/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Login failed');
    return json;
};

// --- PORTAL ---
export const affiliateGetMe = async () => {
    const res = await fetch(`${API_URL}/api/affiliate/me`, { 
        headers: affiliateHeaders(),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) {
        if (res.status === 401) affiliateLogout();
        throw new Error(json.error || 'Failed to load profile');
    }
    return json;
};

export const affiliateLogout = async () => {
    try {
        await fetch(`${API_URL}/api/affiliate/logout`, { method: 'POST', credentials: 'include' });
    } finally {
        localStorage.removeItem('affiliate_token');
        localStorage.removeItem('affiliate_user');
        window.location.href = '/affiliate/login';
    }
};

export const affiliateGetReferrals = async () => {
    const res = await fetch(`${API_URL}/api/affiliate/referrals`, { 
        headers: affiliateHeaders(),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to load referrals');
    return json;
};

export const affiliateGetCommissions = async () => {
    const res = await fetch(`${API_URL}/api/affiliate/commissions`, { 
        headers: affiliateHeaders(),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to load commissions');
    return json;
};

export const affiliateGetCreatives = async () => {
    const res = await fetch(`${API_URL}/api/affiliate/creatives`, { 
        headers: affiliateHeaders(),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to load creatives');
    return json;
};

export const affiliateUpdateSettings = async (data: { paypalEmail: string; zelleInfo: string }) => {
    const res = await fetch(`${API_URL}/api/affiliate/settings`, {
        method: 'PATCH',
        headers: affiliateHeaders(),
        body: JSON.stringify(data),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed to update settings');
    return json;
};

// --- ADMIN ---
export const adminGetAllAffiliates = async (page = 1, status?: string) => {
    const params = new URLSearchParams({ page: String(page) });
    if (status) params.set('status', status);
    const res = await fetch(`${API_URL}/api/affiliates-admin/?${params}`, { 
        headers: affiliateHeaders(),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed');
    return json;
};

export const adminGetAffiliateDetail = async (id: string) => {
    const res = await fetch(`${API_URL}/api/affiliates-admin/${id}`, { 
        headers: affiliateHeaders(),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed');
    return json;
};

export const adminUpdateAffiliateStatus = async (id: string, status: string) => {
    const res = await fetch(`${API_URL}/api/affiliates-admin/${id}/status`, {
        method: 'PATCH',
        headers: affiliateHeaders(),
        body: JSON.stringify({ status }),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed');
    return json;
};

export const adminUpdateCommissionStatus = async (id: string, status: string) => {
    const res = await fetch(`${API_URL}/api/affiliates-admin/commissions/${id}/status`, {
        method: 'PATCH',
        headers: affiliateHeaders(),
        body: JSON.stringify({ status }),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed');
    return json;
};

export const adminBulkUpdateCommissions = async (affiliateId: string, data: { commissionIds: string[]; status: string; method?: string; notes?: string }) => {
    const res = await fetch(`${API_URL}/api/affiliates-admin/${affiliateId}/bulk-commissions`, {
        method: 'POST',
        headers: affiliateHeaders(),
        body: JSON.stringify(data),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed');
    return json;
};

export const adminCreatePayout = async (id: string, data: { amount: number; method: string; notes?: string }) => {
    const res = await fetch(`${API_URL}/api/affiliates-admin/${id}/payouts`, {
        method: 'POST',
        headers: affiliateHeaders(),
        body: JSON.stringify(data),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed');
    return json;
};

export const adminGetAllPayouts = async () => {
    const res = await fetch(`${API_URL}/api/affiliates-admin/payouts/all`, { 
        headers: affiliateHeaders(),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed');
    return json;
};

export const adminMarkPayoutPaid = async (id: string, method?: string) => {
    const res = await fetch(`${API_URL}/api/affiliates-admin/payouts/${id}`, {
        method: 'PATCH',
        headers: affiliateHeaders(),
        body: method ? JSON.stringify({ method }) : undefined,
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed');
    return json;
};

export const adminGetAllCreatives = async () => {
    const res = await fetch(`${API_URL}/api/affiliates-admin/creatives/all`, { 
        headers: affiliateHeaders(),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed');
    return json;
};

export const adminCreateCreative = async (data: { title: string; fileUrl: string; fileType: string }) => {
    const res = await fetch(`${API_URL}/api/affiliates-admin/creatives`, {
        method: 'POST',
        headers: affiliateHeaders(),
        body: JSON.stringify(data),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed');
    return json;
};

export const adminDeleteCreative = async (id: string) => {
    const res = await fetch(`${API_URL}/api/affiliates-admin/creatives/${id}`, {
        method: 'DELETE',
        headers: affiliateHeaders(),
        credentials: 'include'
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Failed');
    return json;
};
