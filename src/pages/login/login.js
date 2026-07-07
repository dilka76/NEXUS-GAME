import './login.css'

export function renderLoginPage() {
  return `
    <section class="container-xxl fade-in-up">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-xl-5">
          <div class="surface rounded-5 p-4 p-lg-5 login-card">
            <span class="hero-badge badge rounded-pill text-bg-dark px-3 py-2 mb-3">Login</span>
            <h1 class="h2 fw-bold section-heading mb-2">Sign in to continue</h1>
            <p class="muted-text mb-4">This route is wired for navigation and layout testing.</p>

            <form class="vstack gap-3">
              <div>
                <label class="form-label" for="loginEmail">Email address</label>
                <input class="form-control form-control-lg" id="loginEmail" type="email" placeholder="you@example.com" />
              </div>

              <div>
                <label class="form-label" for="loginPassword">Password</label>
                <input class="form-control form-control-lg" id="loginPassword" type="password" placeholder="Enter your password" />
              </div>

              <div class="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="rememberMe" />
                  <label class="form-check-label" for="rememberMe">Remember me</label>
                </div>
                <a class="link-light text-decoration-none" href="/dashboard" data-link>Skip to dashboard</a>
              </div>

              <button class="btn btn-accent btn-lg rounded-pill" type="submit">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `
}