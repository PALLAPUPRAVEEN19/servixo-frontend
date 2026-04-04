const BASE_URL = '/api';

async function request(method, path, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, options);

  // Handle non-JSON responses (e.g. plain text, double, void)
  const contentType = res.headers.get('content-type');

  if (!res.ok) {
    let errorMessage = `Request failed (${res.status})`;
    try {
      if (contentType && contentType.includes('application/json')) {
        const errorData = await res.json();
        errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
      } else {
        errorMessage = await res.text() || errorMessage;
      }
    } catch {
      // keep default errorMessage
    }
    throw new Error(errorMessage);
  }

  // Empty response
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return null;
  }

  if (contentType && contentType.includes('application/json')) {
    return res.json();
  }

  // Plain text / number responses (e.g. revenue endpoint returns a double)
  return res.text();
}

// =================== AUTH ===================
export const authAPI = {
  login: (email, password) =>
    request('POST', '/auth/login', { email, password }),

  register: (name, email, password, roleName) =>
    request('POST', '/auth/register', {
      name,
      email,
      password,
      roleName
    }),
};

// =================== SERVICES ===================
export const serviceAPI = {
  getApproved: () => request('GET', '/services'),
  add: (service) => request('POST', '/services', service),
};

// =================== BOOKINGS ===================
export const bookingAPI = {
  create: (booking) => request('POST', '/bookings', booking),
  getByUser: (userId) => request('GET', `/bookings/user/${userId}`),
};

// =================== TICKETS ===================
export const ticketAPI = {
  create: (ticket) => request('POST', '/tickets', ticket),
  getByUser: (userId) => request('GET', `/tickets/user/${userId}`),
  updateStatus: (id, status) => request('PUT', `/tickets/${id}?status=${status}`),
};

// =================== ADMIN ===================
export const adminAPI = {
  getUsers: () => request('GET', '/admin/users'),
  getServices: () => request('GET', '/admin/services'),
  getTickets: () => request('GET', '/admin/tickets'),
  getRevenue: () => request('GET', '/admin/revenue'),
  approveService: (id) => request('PUT', `/admin/services/${id}/approve`),
  updateTicket: (id, status) => request('PUT', `/admin/tickets/${id}?status=${status}`),
};

// =================== SUPPORT ===================
export const supportAPI = {
  getTickets: () => request('GET', '/support/tickets'),
  getTicketsByStatus: (status) => request('GET', `/support/tickets/status?status=${status}`),
  updateTicket: (id, status) => request('PUT', `/support/tickets/${id}?status=${status}`),
  deleteTicket: (id) => request('DELETE', `/support/tickets/${id}`),
};

// =================== PROFESSIONAL ===================
export const proAPI = {
  getProfile: (id) => request('GET', `/professional/${id}`),
  getServices: (proId) => request('GET', `/professional/services/${proId}`),
  addService: (service) => request('POST', '/professional/services', service),
  getBookings: (proId) => request('GET', `/professional/bookings/${proId}`),
  getEarnings: () => request('GET', '/professional/earnings'),
};

// =================== FEEDBACK ===================
export const feedbackAPI = {
  getAll: () => request('GET', '/feedback'),
  getByPro: (proId) => request('GET', `/feedback/professional/${proId}`),
  add: (feedback) => request('POST', '/feedback', feedback),
};

// =================== MESSAGES ===================
export const messageAPI = {
  send: (message) => request('POST', '/messages', message),
  getByUser: (userId) => request('GET', `/messages/user/${userId}`),
};
