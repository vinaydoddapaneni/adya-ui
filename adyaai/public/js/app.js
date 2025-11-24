// API Base URL
const API_BASE = '/api';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeModeButtons();
  initializeSuggestMode();
  initializeGenerateMode();
  initializeThemeMode();
  initializeAnalyzeMode();
  checkHealth();
});

// Mode switching
function initializeModeButtons() {
  const modeButtons = document.querySelectorAll('.mode-btn');
  const modePanels = document.querySelectorAll('.mode-panel');

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;

      // Update active button
      modeButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Update active panel
      modePanels.forEach((panel) => {
        panel.classList.remove('active');
        if (panel.id === `${mode}-panel`) {
          panel.classList.add('active');
        }
      });
    });
  });
}

// Health check
async function checkHealth() {
  const statusEl = document.getElementById('status');
  const statusText = statusEl.querySelector('.status-text');

  try {
    const response = await fetch(`${API_BASE}/health`);
    const data = await response.json();

    if (data.ollama.healthy && data.ollama.modelAvailable) {
      statusEl.classList.add('online');
      statusText.textContent = `Online • ${data.components.count} components`;
    } else if (data.ollama.healthy) {
      statusText.textContent = 'Model not available';
    } else {
      statusText.textContent = 'Ollama offline';
    }
  } catch (error) {
    statusText.textContent = 'Server offline';
  }
}

// Suggest Mode
function initializeSuggestMode() {
  const input = document.getElementById('suggest-input');
  const btn = document.getElementById('suggest-btn');
  const result = document.getElementById('suggest-result');

  btn.addEventListener('click', async () => {
    const userInput = input.value.trim();
    if (!userInput) return;

    btn.disabled = true;
    btn.classList.add('loading');
    result.classList.remove('show');

    try {
      const response = await fetch(`${API_BASE}/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput }),
      });

      const data = await response.json();

      if (data.success) {
        displaySuggestions(data.data.suggestions, result);
      } else {
        displayError(data.error, result);
      }
    } catch (error) {
      displayError(error.message, result);
    } finally {
      btn.disabled = false;
      btn.classList.remove('loading');
    }
  });
}

function displaySuggestions(suggestions, resultEl) {
  resultEl.innerHTML = '';
  
  suggestions.forEach((suggestion) => {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    card.innerHTML = `
      <h3>${suggestion.component}</h3>
      <p>${suggestion.reason}</p>
      <div>
        ${suggestion.props.map(prop => `<span class="badge">${prop}</span>`).join('')}
      </div>
      <div class="code-wrapper">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <div class="code-block">
          <pre>${escapeHtml(suggestion.example)}</pre>
        </div>
      </div>
    `;
    
    resultEl.appendChild(card);
  });
  
  resultEl.classList.add('show');
}

// Generate UI Mode
function initializeGenerateMode() {
  const input = document.getElementById('generate-input');
  const btn = document.getElementById('generate-btn');
  const result = document.getElementById('generate-result');

  btn.addEventListener('click', async () => {
    const description = input.value.trim();
    if (!description) return;

    btn.disabled = true;
    btn.classList.add('loading');
    result.classList.remove('show');

    try {
      const response = await fetch(`${API_BASE}/generate-ui`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (data.success) {
        displayGeneratedUI(data.data, result);
      } else {
        displayError(data.error, result);
      }
    } catch (error) {
      displayError(error.message, result);
    } finally {
      btn.disabled = false;
      btn.classList.remove('loading');
    }
  });
}

function displayGeneratedUI(data, resultEl) {
  resultEl.innerHTML = `
    <div class="result-card">
      <h3>Generated UI</h3>
      <p>${data.explanation}</p>
      <div>
        <strong>Components used:</strong><br>
        ${data.components.map(comp => `<span class="badge">${comp}</span>`).join('')}
      </div>
      <div class="code-wrapper">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <div class="code-block">
          <pre>${escapeHtml(data.html)}</pre>
        </div>
      </div>
    </div>
  `;
  
  resultEl.classList.add('show');
}

// Theme Mode
function initializeThemeMode() {
  const input = document.getElementById('theme-input');
  const btn = document.getElementById('theme-btn');
  const result = document.getElementById('theme-result');

  btn.addEventListener('click', async () => {
    const description = input.value.trim();
    if (!description) return;

    btn.disabled = true;
    btn.classList.add('loading');
    result.classList.remove('show');

    try {
      const response = await fetch(`${API_BASE}/theme`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });

      const data = await response.json();

      if (data.success) {
        displayTheme(data.data, result);
      } else {
        displayError(data.error, result);
      }
    } catch (error) {
      displayError(error.message, result);
    } finally {
      btn.disabled = false;
      btn.classList.remove('loading');
    }
  });
}

function displayTheme(data, resultEl) {
  const tokenPreview = Object.entries(data.tokens)
    .map(([key, value]) => `
      <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
        <div style="width: 40px; height: 40px; background: ${value}; border-radius: 6px; border: 1px solid var(--border);"></div>
        <span><strong>${key}:</strong> ${value}</span>
      </div>
    `)
    .join('');

  resultEl.innerHTML = `
    <div class="result-card">
      <h3>Generated Theme</h3>
      <p>${data.explanation}</p>
      <div style="margin: 1.5rem 0;">
        <strong>Color Tokens:</strong>
        <div style="margin-top: 1rem;">
          ${tokenPreview}
        </div>
      </div>
      <div class="code-wrapper">
        <button class="copy-btn" onclick="copyCode(this)">Copy CSS</button>
        <div class="code-block">
          <pre>${escapeHtml(data.css)}</pre>
        </div>
      </div>
    </div>
  `;
  
  resultEl.classList.add('show');
}

// Analyze Mode
function initializeAnalyzeMode() {
  const input = document.getElementById('analyze-input');
  const analyzeBtn = document.getElementById('analyze-btn');
  const improveBtn = document.getElementById('improve-btn');
  const result = document.getElementById('analyze-result');

  analyzeBtn.addEventListener('click', async () => {
    const code = input.value.trim();
    if (!code) return;

    analyzeBtn.disabled = true;
    analyzeBtn.classList.add('loading');
    result.classList.remove('show');

    try {
      const response = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        displayAnalysis(data.data, result);
      } else {
        displayError(data.error, result);
      }
    } catch (error) {
      displayError(error.message, result);
    } finally {
      analyzeBtn.disabled = false;
      analyzeBtn.classList.remove('loading');
    }
  });

  improveBtn.addEventListener('click', async () => {
    const code = input.value.trim();
    if (!code) return;

    improveBtn.disabled = true;
    improveBtn.classList.add('loading');
    result.classList.remove('show');

    try {
      const response = await fetch(`${API_BASE}/analyze/improve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();

      if (data.success) {
        displayImprovement(data.data, result);
      } else {
        displayError(data.error, result);
      }
    } catch (error) {
      displayError(error.message, result);
    } finally {
      improveBtn.disabled = false;
      improveBtn.classList.remove('loading');
    }
  });
}

function displayAnalysis(data, resultEl) {
  const issuesHtml = data.issues.map(issue => `
    <div class="result-card">
      <h3>${issue.type.toUpperCase()}: ${issue.component}</h3>
      <p><strong>Issue:</strong> ${issue.message}</p>
      <p><strong>Fix:</strong> ${issue.fix}</p>
    </div>
  `).join('');

  const improvementsHtml = data.improvements.map(imp => `
    <div class="result-card">
      <h3>Improvement Suggestion</h3>
      <p>${imp.reason}</p>
      <div class="code-block">
        <strong>Before:</strong>
        <pre>${escapeHtml(imp.current)}</pre>
      </div>
      <div class="code-wrapper">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <div class="code-block">
          <strong>After:</strong>
          <pre>${escapeHtml(imp.improved)}</pre>
        </div>
      </div>
    </div>
  `).join('');

  resultEl.innerHTML = `
    <div class="result-card">
      <h3>Code Quality Score: ${data.score}/100</h3>
      <p>${data.summary}</p>
    </div>
    ${issuesHtml}
    ${improvementsHtml}
  `;
  
  resultEl.classList.add('show');
}

function displayImprovement(data, resultEl) {
  resultEl.innerHTML = `
    <div class="result-card">
      <h3>Improved Code</h3>
      <p>${data.explanation}</p>
      <div>
        <strong>Changes made:</strong>
        <ul style="margin-top: 0.5rem; padding-left: 1.5rem; color: var(--text-secondary);">
          ${data.changes.map(change => `<li>${change}</li>`).join('')}
        </ul>
      </div>
      <div class="code-wrapper">
        <button class="copy-btn" onclick="copyCode(this)">Copy</button>
        <div class="code-block">
          <pre>${escapeHtml(data.improved)}</pre>
        </div>
      </div>
    </div>
  `;
  
  resultEl.classList.add('show');
}

// Utility functions
function displayError(error, resultEl) {
  resultEl.innerHTML = `
    <div class="error-message">
      <strong>Error:</strong> ${error}
    </div>
  `;
  resultEl.classList.add('show');
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function copyCode(btn) {
  const wrapper = btn.parentElement;
  const codeBlock = wrapper.querySelector('.code-block pre');
  const code = codeBlock.textContent;
  
  navigator.clipboard.writeText(code).then(() => {
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove('copied');
    }, 2000);
  });
}
