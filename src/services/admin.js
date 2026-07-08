import { supabase } from './supabase-client.js'
import { getProfile } from './profile.js'

export const ADMIN_TABS = {
  games: {
    key: 'games',
    label: 'Games',
    table: 'game_sessions',
    idField: 'id',
    orderBy: 'started_at',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'user_id', label: 'User' },
      { key: 'current_level', label: 'Level' },
      { key: 'prize_won', label: 'Prize' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { key: 'user_id', label: 'User ID', type: 'text', required: true },
      { key: 'current_level', label: 'Current Level', type: 'number', required: true },
      { key: 'prize_won', label: 'Prize Won', type: 'number', step: '1' },
      { key: 'status', label: 'Status', type: 'select', options: ['in_progress', 'won', 'lost', 'abandoned'] },
      { key: 'started_at', label: 'Started At', type: 'datetime-local' },
      { key: 'ended_at', label: 'Ended At', type: 'datetime-local' },
    ],
  },
  users: {
    key: 'users',
    label: 'Users',
    table: 'profiles',
    idField: 'id',
    orderBy: 'updated_at',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'email', label: 'Email' },
      { key: 'nickname', label: 'Nickname' },
      { key: 'role', label: 'Role' },
    ],
    fields: [
      { key: 'id', label: 'User ID', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'email', required: true },
      { key: 'nickname', label: 'Nickname', type: 'text' },
      { key: 'avatar_url', label: 'Avatar URL', type: 'text' },
      { key: 'role', label: 'Role', type: 'select', options: ['user', 'admin'] },
    ],
  },
  questions: {
    key: 'questions',
    label: 'Questions',
    table: 'questions',
    idField: 'id',
    orderBy: 'created_at',
    columns: [
      { key: 'question_text', label: 'Question' },
      { key: 'difficulty_level_id', label: 'Level' },
      { key: 'category', label: 'Category' },
    ],
    fields: [
      { key: 'question_text', label: 'Question Text', type: 'textarea', required: true },
      { key: 'difficulty_level_id', label: 'Difficulty Level ID', type: 'number', required: true },
      { key: 'category', label: 'Category', type: 'text' },
    ],
  },
  answers: {
    key: 'answers',
    label: 'Answers',
    table: 'answers',
    idField: 'id',
    orderBy: 'created_at',
    columns: [
      { key: 'question_id', label: 'Question' },
      { key: 'answer_text', label: 'Answer' },
      { key: 'is_correct', label: 'Correct' },
    ],
    fields: [
      { key: 'question_id', label: 'Question ID', type: 'text', required: true },
      { key: 'answer_text', label: 'Answer Text', type: 'textarea', required: true },
      { key: 'is_correct', label: 'Is Correct', type: 'checkbox' },
    ],
  },
  levels: {
    key: 'levels',
    label: 'Levels',
    table: 'difficulty_levels',
    idField: 'id',
    orderBy: 'level',
    columns: [
      { key: 'level', label: 'Level' },
      { key: 'difficulty_name', label: 'Name' },
      { key: 'prize_amount', label: 'Prize' },
    ],
    fields: [
      { key: 'level', label: 'Level', type: 'number', required: true },
      { key: 'prize_amount', label: 'Prize Amount', type: 'number', step: '0.01', required: true },
      { key: 'difficulty_name', label: 'Difficulty Name', type: 'text', required: true },
    ],
  },
}

function toDateTimeLocal(value) {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return date.toISOString().slice(0, 16)
}

function fromDateTimeLocal(value) {
  if (!value) {
    return null
  }

  return new Date(value).toISOString()
}

function parseFieldValue(field, value) {
  if (field.type === 'number') {
    if (value === '' || value === null || typeof value === 'undefined') {
      return field.required ? 0 : null
    }

    const parsedValue = Number(value)
    return Number.isNaN(parsedValue) ? null : parsedValue
  }

  if (field.type === 'checkbox') {
    return Boolean(value)
  }

  if (field.type === 'datetime-local') {
    return fromDateTimeLocal(value)
  }

  if (value === '') {
    return null
  }

  return value
}

function serializeFieldValue(field, record) {
  const value = record?.[field.key]

  if (field.type === 'checkbox') {
    return Boolean(value)
  }

  if (field.type === 'datetime-local') {
    return toDateTimeLocal(value)
  }

  return value ?? ''
}

export async function isCurrentUserAdmin() {
  const profileResult = await getProfile()

  if (!profileResult.success) {
    return false
  }

  return profileResult.profile?.role === 'admin'
}

export async function fetchAdminRecords(tabKey) {
  const tab = ADMIN_TABS[tabKey]
  if (!tab) {
    return {
      success: false,
      error: 'Unknown admin tab',
    }
  }

  const { data, error } = await supabase
    .from(tab.table)
    .select('*')
    .order(tab.orderBy, { ascending: false })

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    records: data || [],
  }
}

export async function saveAdminRecord(tabKey, record) {
  const tab = ADMIN_TABS[tabKey]
  if (!tab) {
    return {
      success: false,
      error: 'Unknown admin tab',
    }
  }

  const payload = {}

  tab.fields.forEach((field) => {
    if (typeof record[field.key] !== 'undefined') {
      payload[field.key] = parseFieldValue(field, record[field.key])
    }
  })

  if (tabKey === 'users') {
    payload.id = record.id
  }

  const { data, error } = await supabase
    .from(tab.table)
    .upsert(payload, { onConflict: tab.idField })
    .select('*')
    .single()

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
    record: data,
  }
}

export async function deleteAdminRecord(tabKey, id) {
  const tab = ADMIN_TABS[tabKey]
  if (!tab) {
    return {
      success: false,
      error: 'Unknown admin tab',
    }
  }

  const { error } = await supabase.from(tab.table).delete().eq(tab.idField, id)

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
  }
}

export function getAdminFieldValue(field, record) {
  return serializeFieldValue(field, record)
}
