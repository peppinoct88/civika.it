// Tipi condivisi Civika

export interface JWTPayload {
  sub: string; // user_id
  email: string;
  roles: string[];
  permissions: PermissionEntry[];
  iat: number;
  exp: number;
}

export interface PermissionEntry {
  resource: string;
  action: string;
  scope: "own" | "all" | "team";
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  roles: string[];
  permissions: PermissionEntry[];
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Dashboard stat card
export interface StatCard {
  label: string;
  value: string | number;
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  icon: string;
}

// Sidebar navigation item
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  requiredPermission?: {
    resource: string;
    action: string;
  };
  badge?: number;
  children?: NavItem[];
}
