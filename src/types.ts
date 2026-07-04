export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'new' | 'assigned' | 'in_progress' | 'pending' | 'solved' | 'closed';
export type Channel = 'email' | 'chat' | 'facebook' | 'zalo' | 'whatsapp' | 'call';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  vipLevel: 'standard' | 'silver' | 'gold' | 'platinum';
  avatar?: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  role: 'agent' | 'supervisor' | 'admin';
  avatar?: string;
}

export interface Ticket {
  id: string;
  subject: string;
  status: TicketStatus;
  priority: Priority;
  channel: Channel;
  customerId: string;
  customer?: Customer;
  assigneeId?: string;
  assignee?: Agent;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  ticketId: string;
  senderType: 'customer' | 'agent' | 'system' | 'bot';
  senderId: string;
  content: string;
  channel: Channel;
  createdAt: string;
}

