import './admin.css'
import { navigateTo } from '../../router.js'
import {
  ADMIN_TABS,
  deleteAdminRecord,
  fetchAdminRecords,
  getAdminFieldValue,
  isCurrentUserAdmin,
  saveAdminRecord,
} from '../../services/admin.js'

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function formatCellValue(field, record) {
  const value = record?.[field.key]

  if (field.type === 'checkbox') {
    return value ? 'Yes' : 'No'
  }

  if (field.type === 'datetime-local') {
    if (!value) {
      return '—'
    }

    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString()
  }

  if (value === null || typeof value === 'undefined' || value === '') {
    return '—'
  }

  return escapeHtml(value)
}

function buildFieldMarkup(field, record) {
  const fieldId = `adminField-${field.key}`
  const value = getAdminFieldValue(field, record)

  if (field.type === 'textarea') {
    return `
      <div class="mb-3">
        <label class="form-label" for="${fieldId}">${field.label}</label>
        <textarea class="form-control" id="${fieldId}" name="${field.key}" rows="4" ${field.required ? 'required' : ''}>${escapeHtml(value)}</textarea>
      </div>
    `
  }

  if (field.type === 'select') {
    const options = field.options
      .map((option) => `<option value="${escapeHtml(option)}" ${option === value ? 'selected' : ''}>${escapeHtml(option)}</option>`)
      .join('')

    return `
      <div class="mb-3">
        <label class="form-label" for="${fieldId}">${field.label}</label>
        <select class="form-select" id="${fieldId}" name="${field.key}">${options}</select>
      </div>
    `
  }

  if (field.type === 'checkbox') {
    return `
      <div class="form-check form-switch mb-3">
        <input class="form-check-input" type="checkbox" id="${fieldId}" name="${field.key}" ${value ? 'checked' : ''} />
        <label class="form-check-label" for="${fieldId}">${field.label}</label>
      </div>
    `
  }

  return `
    <div class="mb-3">
      <label class="form-label" for="${fieldId}">${field.label}</label>
      <input
        class="form-control"
        type="${field.type || 'text'}"
        id="${fieldId}"
        name="${field.key}"
        value="${escapeHtml(value)}"
        ${field.step ? `step="${field.step}"` : ''}
        ${field.required ? 'required' : ''}
      />
    </div>
  `
}

function renderRowActions(tabKey, record) {
  return `
    <button class="btn btn-sm btn-outline-light rounded-pill me-2" data-admin-action="edit" data-admin-tab="${tabKey}" data-admin-id="${escapeHtml(record.id)}">Edit</button>
    <button class="btn btn-sm btn-outline-danger rounded-pill" data-admin-action="delete" data-admin-tab="${tabKey}" data-admin-id="${escapeHtml(record.id)}">Delete</button>
  `
}

export async function renderAdminPage() {
  const adminAllowed = await isCurrentUserAdmin()

  if (!adminAllowed) {
    return `
      <section class="container-xxl py-4 py-lg-5">
        <div class="surface rounded-4 p-4 p-lg-5 text-center admin-access-panel fade-in-up">
          <span class="hero-badge badge rounded-pill text-bg-dark px-3 py-2 mb-3">Admin</span>
          <h1 class="h3 fw-bold section-heading mb-3">Access restricted</h1>
          <p class="muted-text mb-4">You need an admin role to open this page.</p>
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <a class="btn btn-accent rounded-pill px-4" href="/dashboard" data-link>Go to dashboard</a>
            <a class="btn btn-outline-light rounded-pill px-4" href="/profile" data-link>Open profile</a>
          </div>
        </div>
      </section>
    `
  }

  const tabsMarkup = Object.values(ADMIN_TABS)
    .map(
      (tab) => `
        <li class="nav-item" role="presentation">
          <button
            class="nav-link ${tab.key === 'games' ? 'active' : ''}"
            id="adminTab-${tab.key}"
            data-admin-tab-btn="${tab.key}"
            type="button"
            role="tab"
            aria-controls="adminPane-${tab.key}"
            aria-selected="${tab.key === 'games' ? 'true' : 'false'}"
          >
            ${tab.label}
          </button>
        </li>
      `,
    )
    .join('')

  const panesMarkup = Object.values(ADMIN_TABS)
    .map(
      (tab) => `
        <div
          class="tab-pane fade ${tab.key === 'games' ? 'show active' : ''}"
          id="adminPane-${tab.key}"
          role="tabpanel"
          aria-labelledby="adminTab-${tab.key}"
          data-admin-pane="${tab.key}"
        >
          <div class="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-3">
            <div>
              <h2 class="h5 mb-1">${tab.label}</h2>
              <p class="muted-text mb-0">Manage records for ${tab.table}.</p>
            </div>
            <div class="d-flex gap-2 flex-wrap">
              <button class="btn btn-accent rounded-pill px-3" type="button" data-admin-action="create" data-admin-tab="${tab.key}">Add ${tab.label.slice(0, -1)}</button>
              <button class="btn btn-outline-light rounded-pill px-3" type="button" data-admin-action="reload" data-admin-tab="${tab.key}">Reload</button>
            </div>
          </div>
          <div class="table-responsive admin-table-wrap">
            <table class="table table-dark table-hover align-middle admin-table mb-0">
              <thead>
                <tr>
                  ${tab.columns.map((column) => `<th scope="col">${column.label}</th>`).join('')}
                  <th scope="col" class="text-end">Actions</th>
                </tr>
              </thead>
              <tbody data-admin-table-body="${tab.key}">
                <tr>
                  <td colspan="${tab.columns.length + 1}" class="text-center py-5 muted-text">Loading...</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      `,
    )
    .join('')

  return `
    <section class="container-xxl py-4 py-lg-5 admin-shell fade-in-up">
      <div class="d-flex flex-column flex-lg-row align-items-lg-end justify-content-between gap-3 mb-4">
        <div>
          <span class="hero-badge badge rounded-pill text-bg-dark px-3 py-2 mb-3">Admin</span>
          <h1 class="h2 fw-bold section-heading mb-2">Control room</h1>
          <p class="muted-text mb-0">Manage games, users, questions, answers, and levels from one secure workspace.</p>
        </div>
        <div class="d-flex gap-2 flex-wrap">
          <a class="btn btn-outline-light rounded-pill px-4" href="/dashboard" data-link>Dashboard</a>
          <a class="btn btn-outline-light rounded-pill px-4" href="/profile" data-link>Profile</a>
        </div>
      </div>

      <div class="row g-3 mb-4">
        <div class="col-md-3">
          <div class="surface rounded-4 p-4 h-100 admin-stat-card">
            <p class="muted-text text-uppercase small mb-2">Active tab</p>
            <strong class="display-6 mb-0" id="adminActiveTabLabel">Games</strong>
          </div>
        </div>
        <div class="col-md-3">
          <div class="surface rounded-4 p-4 h-100 admin-stat-card">
            <p class="muted-text text-uppercase small mb-2">Games</p>
            <strong class="display-6 mb-0" id="adminCount-games">0</strong>
          </div>
        </div>
        <div class="col-md-3">
          <div class="surface rounded-4 p-4 h-100 admin-stat-card">
            <p class="muted-text text-uppercase small mb-2">Users</p>
            <strong class="display-6 mb-0" id="adminCount-users">0</strong>
          </div>
        </div>
        <div class="col-md-3">
          <div class="surface rounded-4 p-4 h-100 admin-stat-card">
            <p class="muted-text text-uppercase small mb-2">Questions</p>
            <strong class="display-6 mb-0" id="adminCount-questions">0</strong>
          </div>
        </div>
      </div>

      <div class="surface rounded-4 p-3 p-lg-4 admin-workspace">
        <ul class="nav nav-pills gap-2 admin-nav" id="adminTabs" role="tablist">
          ${tabsMarkup}
        </ul>

        <div class="tab-content pt-4">
          ${panesMarkup}
        </div>
      </div>

      <div class="modal fade" id="adminEditorModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content admin-modal">
            <div class="modal-header border-0 pb-0">
              <div>
                <p class="muted-text text-uppercase small mb-1" id="adminEditorEyebrow">Edit</p>
                <h2 class="h4 mb-0" id="adminEditorTitle">Record editor</h2>
              </div>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="adminEditorForm" class="admin-editor-form"></form>
              <div class="admin-message admin-message-error" id="adminEditorError"></div>
            </div>
            <div class="modal-footer border-0 pt-0">
              <button type="button" class="btn btn-outline-light rounded-pill px-4" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-accent rounded-pill px-4" id="adminEditorSaveBtn">Save</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
}

export function attachAdminPageListeners() {
  const tabButtons = document.querySelectorAll('[data-admin-tab-btn]')
  const panes = document.querySelectorAll('[data-admin-pane]')
  const editorModalElement = document.getElementById('adminEditorModal')
  const editorForm = document.getElementById('adminEditorForm')
  const editorTitle = document.getElementById('adminEditorTitle')
  const editorEyebrow = document.getElementById('adminEditorEyebrow')
  const editorError = document.getElementById('adminEditorError')
  const editorSaveBtn = document.getElementById('adminEditorSaveBtn')
  const activeTabLabel = document.getElementById('adminActiveTabLabel')

  if (!editorModalElement || !editorForm || !editorTitle || !editorSaveBtn || !activeTabLabel) {
    return
  }

  const modal = window.bootstrap?.Modal.getOrCreateInstance(editorModalElement)
  const state = {
    activeTab: 'games',
    records: {},
    editingTab: null,
    editingRecordId: null,
  }

  function setActiveTab(tabKey) {
    state.activeTab = tabKey
    activeTabLabel.textContent = ADMIN_TABS[tabKey].label

    tabButtons.forEach((button) => {
      const isActive = button.dataset.adminTabBtn === tabKey
      button.classList.toggle('active', isActive)
      button.setAttribute('aria-selected', isActive ? 'true' : 'false')
    })

    panes.forEach((pane) => {
      pane.classList.toggle('show', pane.dataset.adminPane === tabKey)
      pane.classList.toggle('active', pane.dataset.adminPane === tabKey)
    })
  }

  function renderCounts() {
    Object.entries(ADMIN_TABS).forEach(([tabKey]) => {
      const countEl = document.getElementById(`adminCount-${tabKey}`)
      if (countEl) {
        countEl.textContent = String(state.records[tabKey]?.length || 0)
      }
    })
  }

  function renderTable(tabKey) {
    const body = document.querySelector(`[data-admin-table-body="${tabKey}"]`)
    if (!body) {
      return
    }

    const records = state.records[tabKey] || []

    if (!records.length) {
      body.innerHTML = `<tr><td colspan="${ADMIN_TABS[tabKey].columns.length + 1}" class="text-center py-5 muted-text">No records found.</td></tr>`
      return
    }

    body.innerHTML = records
      .map((record) => {
        const cells = ADMIN_TABS[tabKey].columns
          .map((column) => `<td>${formatCellValue(column, record)}</td>`)
          .join('')

        return `
          <tr>
            ${cells}
            <td class="text-end">
              ${renderRowActions(tabKey, record)}
            </td>
          </tr>
        `
      })
      .join('')
  }

  async function loadTab(tabKey) {
    const result = await fetchAdminRecords(tabKey)
    if (!result.success) {
      state.records[tabKey] = []
      renderTable(tabKey)
      editorError.textContent = result.error || 'Failed to load records.'
      editorError.style.display = 'block'
      return
    }

    state.records[tabKey] = result.records || []
    renderCounts()
    renderTable(tabKey)
  }

  function clearEditorError() {
    editorError.textContent = ''
    editorError.style.display = 'none'
  }

  function openEditor(tabKey, record = null) {
    const tab = ADMIN_TABS[tabKey]
    state.editingTab = tabKey
    state.editingRecordId = record?.id || null

    editorEyebrow.textContent = record ? 'Edit record' : 'Create record'
    editorTitle.textContent = `${tab.label} ${record ? 'editor' : 'creator'}`
    clearEditorError()

    editorForm.innerHTML = `
      ${tab.fields
        .map((field) => {
          if (tabKey === 'users' && field.key === 'id') {
            return `
              <div class="mb-3">
                <label class="form-label" for="adminField-${field.key}">${field.label}</label>
                <input
                  class="form-control"
                  type="text"
                  id="adminField-${field.key}"
                  name="${field.key}"
                  value="${escapeHtml(record?.id || '')}"
                  required
                />
              </div>
            `
          }

          return buildFieldMarkup(field, record)
        })
        .join('')}
    `

    modal?.show()
  }

  function collectFormValues(tabKey) {
    const tab = ADMIN_TABS[tabKey]
    const payload = state.editingRecordId ? { id: state.editingRecordId } : {}

    tab.fields.forEach((field) => {
      const input = editorForm.querySelector(`[name="${field.key}"]`)
      if (!input) {
        return
      }

      if (field.type === 'checkbox') {
        payload[field.key] = input.checked
        return
      }

      payload[field.key] = input.value
    })

    if (tabKey === 'users') {
      const idInput = editorForm.querySelector('[name="id"]')
      payload.id = idInput?.value || state.editingRecordId || ''
    }

    return payload
  }

  async function saveEditorRecord() {
    if (!state.editingTab) {
      return
    }

    clearEditorError()
    const payload = collectFormValues(state.editingTab)

    const result = await saveAdminRecord(state.editingTab, payload)
    if (!result.success) {
      editorError.textContent = result.error || 'Unable to save record.'
      editorError.style.display = 'block'
      return
    }

    await loadTab(state.editingTab)
    modal?.hide()
  }

  async function deleteRecord(tabKey, recordId) {
    const confirmed = window.confirm('Delete this record? This cannot be undone.')
    if (!confirmed) {
      return
    }

    const result = await deleteAdminRecord(tabKey, recordId)
    if (!result.success) {
      window.alert(result.error || 'Unable to delete record.')
      return
    }

    await loadTab(tabKey)
  }

  tabButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const tabKey = button.dataset.adminTabBtn
      if (!tabKey) {
        return
      }

      setActiveTab(tabKey)
      if (!state.records[tabKey]) {
        await loadTab(tabKey)
      }
    })
  })

  document.addEventListener('click', async (event) => {
    const actionButton = event.target.closest('[data-admin-action]')
    if (!actionButton) {
      return
    }

    const tabKey = actionButton.dataset.adminTab
    const action = actionButton.dataset.adminAction
    const recordId = actionButton.dataset.adminId

    if (!tabKey) {
      return
    }

    if (action === 'create') {
      openEditor(tabKey)
      return
    }

    if (action === 'reload') {
      await loadTab(tabKey)
      return
    }

    if (action === 'edit') {
      const record = (state.records[tabKey] || []).find((item) => String(item.id) === String(recordId))
      if (record) {
        openEditor(tabKey, record)
      }
      return
    }

    if (action === 'delete') {
      await deleteRecord(tabKey, recordId)
    }
  })

  editorSaveBtn.addEventListener('click', saveEditorRecord)

  editorModalElement.addEventListener('hidden.bs.modal', () => {
    state.editingTab = null
    state.editingRecordId = null
    editorForm.innerHTML = ''
    clearEditorError()
  })

  setActiveTab('games')
  Object.keys(ADMIN_TABS).forEach((tabKey) => {
    loadTab(tabKey)
  })
}
