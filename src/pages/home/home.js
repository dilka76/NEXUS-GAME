import './home.css'

export function renderHomePage() {
  const html = `
    <section class="home-container">
      <!-- Animated Background -->
      <div class="animated-bg">
        <div class="bg-grid"></div>
        <div class="floating-element element-1"></div>
        <div class="floating-element element-2"></div>
        <div class="floating-element element-3"></div>
        <svg class="animated-chart" viewBox="0 0 300 150" width="300" height="150">
          <polyline points="0,120 30,100 60,90 90,110 120,70 150,80 180,50 210,60 240,40 270,30 300,20" 
                    class="chart-line" fill="none" stroke="url(#chartGradient)" stroke-width="2"/>
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#4de2b8;stop-opacity:0.6" />
              <stop offset="100%" style="stop-color:#8db8ff;stop-opacity:0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <!-- Content -->
      <div class="home-content container-xxl">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6 order-lg-1 order-2">
            <div class="hero-text-section fade-in-up">
              <div class="hero-tag">
                <span class="tag-icon">◆</span>
                <span>Welcome to NEXUS MILLIONAIRE</span>
              </div>
              
              <h1 class="hero-title">
                <span class="title-line-1">Who Wants to Be</span>
                <span class="title-line-2">A Millionaire?</span>
              </h1>
              
              <p class="hero-subtitle">
                Test your knowledge across 15 challenging difficulty levels. Climb the ladder from $100 to $1,000,000 with strategic lifelines and real-time gameplay.
              </p>

              <div class="hero-stats">
                <div class="stat-item">
                  <span class="stat-label">Questions</span>
                  <span class="stat-value">105+</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Prize Pool</span>
                  <span class="stat-value">$1M</span>
                </div>
                <div class="stat-item">
                  <span class="stat-label">Lifelines</span>
                  <span class="stat-value">3</span>
                </div>
              </div>

              <div class="hero-cta">
                <a class="btn btn-accent btn-lg rounded-pill px-5 py-3 hero-btn-primary" href="/login" data-link>
                  <span class="btn-icon">▶</span>
                  <span>Login to Play Now</span>
                </a>
                <a class="btn btn-outline-light btn-lg rounded-pill px-5 py-3" href="/dashboard" data-link>
                  Watch Demo
                </a>
              </div>

              <p class="hero-footer-text">Join thousands of players competing for glory</p>
            </div>
          </div>

          <div class="col-lg-6 order-lg-2 order-1 mb-4 mb-lg-0">
            <div class="hero-visual-section">
              <div class="glass-card glass-card-1">
                <div class="card-header">
                  <span class="card-label">LEVEL 1</span>
                  <span class="card-value">$100</span>
                </div>
                <div class="card-progress">
                  <div class="progress-bar-custom" style="width: 7%;"></div>
                </div>
              </div>

              <div class="glass-card glass-card-2">
                <div class="card-icon">🎯</div>
                <div class="card-text">Analyze Questions</div>
              </div>

              <div class="glass-card glass-card-3">
                <div class="card-header">
                  <span>LIFELINES AVAILABLE</span>
                </div>
                <div class="card-lifelines">
                  <span class="lifeline-item">50:50</span>
                  <span class="lifeline-item">Phone</span>
                  <span class="lifeline-item">Audience</span>
                </div>
              </div>

              <div class="animated-icon icon-1">💰</div>
              <div class="animated-icon icon-2">🎪</div>
              <div class="animated-icon icon-3">⭐</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return html;
}