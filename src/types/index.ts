export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Workspace {
  id: string
  name: string
  icon?: string
  description?: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  members: WorkspaceMember[]
}

export interface WorkspaceMember {
  id: string
  userId: string
  workspaceId: string
  role: WorkspaceRole
  createdAt: Date
  user: User
}

export interface Page {
  id: string
  title: string
  icon?: string
  cover?: string
  content?: any
  isPublished: boolean
  isArchived: boolean
  parentId?: string
  workspaceId?: string
  userId: string
  createdAt: Date
  updatedAt: Date
  user: User
  workspace?: Workspace
  parent?: Page
  children?: Page[]
  blocks: Block[]
}

export interface Block {
  id: string
  type: BlockType
  content?: any
  properties?: any
  pageId: string
  userId: string
  parentId?: string
  position: number
  createdAt: Date
  updatedAt: Date
  user: User
  parent?: Block
  children?: Block[]
}

export interface Database {
  id: string
  name: string
  description?: string
  icon?: string
  cover?: string
  schema: DatabaseSchema
  workspaceId: string
  createdAt: Date
  updatedAt: Date
  records: DatabaseRecord[]
}

export interface DatabaseRecord {
  id: string
  data: Record<string, any>
  databaseId: string
  createdAt: Date
  updatedAt: Date
}

export interface DatabaseSchema {
  properties: Record<string, DatabaseProperty>
}

export interface DatabaseProperty {
  id: string
  name: string
  type: PropertyType
  options?: any
}

export interface Template {
  id: string
  name: string
  description?: string
  icon?: string
  cover?: string
  content: any
  category: TemplateCategory
  isPublic: boolean
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  content: string
  pageId: string
  userId: string
  createdAt: Date
  updatedAt: Date
  user: User
}

export interface Collaboration {
  id: string
  pageId: string
  userId: string
  cursor?: any
  lastSeen: Date
  user: User
}

export enum WorkspaceRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  GUEST = 'GUEST'
}

export enum BlockType {
  PARAGRAPH = 'PARAGRAPH',
  HEADING_1 = 'HEADING_1',
  HEADING_2 = 'HEADING_2',
  HEADING_3 = 'HEADING_3',
  BULLETED_LIST = 'BULLETED_LIST',
  NUMBERED_LIST = 'NUMBERED_LIST',
  TODO = 'TODO',
  TOGGLE = 'TOGGLE',
  QUOTE = 'QUOTE',
  CALLOUT = 'CALLOUT',
  CODE = 'CODE',
  DIVIDER = 'DIVIDER',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  FILE = 'FILE',
  BOOKMARK = 'BOOKMARK',
  EMBED = 'EMBED',
  TABLE = 'TABLE',
  DATABASE = 'DATABASE',
  KANBAN = 'KANBAN',
  CALENDAR = 'CALENDAR',
  GALLERY = 'GALLERY',
  TIMELINE = 'TIMELINE',
  MATH = 'MATH',
  MERMAID = 'MERMAID'
}

export enum PropertyType {
  TITLE = 'TITLE',
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  SELECT = 'SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  DATE = 'DATE',
  PERSON = 'PERSON',
  FILE = 'FILE',
  CHECKBOX = 'CHECKBOX',
  URL = 'URL',
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  FORMULA = 'FORMULA',
  RELATION = 'RELATION',
  ROLLUP = 'ROLLUP',
  CREATED_TIME = 'CREATED_TIME',
  CREATED_BY = 'CREATED_BY',
  LAST_EDITED_TIME = 'LAST_EDITED_TIME',
  LAST_EDITED_BY = 'LAST_EDITED_BY'
}

export enum TemplateCategory {
  PERSONAL = 'PERSONAL',
  TEAM = 'TEAM',
  EDUCATION = 'EDUCATION',
  BUSINESS = 'BUSINESS',
  CREATIVE = 'CREATIVE',
  ENGINEERING = 'ENGINEERING',
  DESIGN = 'DESIGN',
  MARKETING = 'MARKETING',
  SALES = 'SALES',
  HR = 'HR',
  FINANCE = 'FINANCE',
  OTHER = 'OTHER'
}

// Editor types
export interface EditorBlock {
  id: string
  type: BlockType
  content: any
  properties?: Record<string, any>
  children?: EditorBlock[]
}

export interface EditorState {
  blocks: EditorBlock[]
  selection?: EditorSelection
  isEditing: boolean
  isDragging: boolean
}

export interface EditorSelection {
  blockId: string
  startOffset: number
  endOffset: number
}

// UI types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface DropdownOption {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface TableColumn {
  id: string
  header: string
  accessor: string
  cell?: (value: any, row: any) => React.ReactNode
  sortable?: boolean
  width?: number
}

// API types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Search types
export interface SearchResult {
  id: string
  type: 'page' | 'block' | 'database'
  title: string
  content?: string
  pageId?: string
  workspaceId?: string
  highlights?: string[]
}

// Notification types
export interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message?: string
  actions?: NotificationAction[]
  timestamp: Date
  read: boolean
}

export interface NotificationAction {
  label: string
  action: () => void
  variant?: 'default' | 'destructive'
}
