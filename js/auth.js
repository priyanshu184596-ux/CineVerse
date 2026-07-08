/* ===========================
   AUTHENTICATION MODULE
   =========================== */

/**
 * Authentication module
 * Handles user authentication and session management
 */

const Auth = {
  /**
   * Check if user is logged in
   * @returns {boolean} - Is logged in
   */
  isLoggedIn() {
    return Storage.getUser() !== null;
  },

  /**
   * Get current user
   * @returns {object|null} - User data or null
   */
  getCurrentUser() {
    return Storage.getUser();
  },

  /**
   * Login user
   * @param {object} credentials - User credentials
   * @returns {boolean} - Success status
   */
  login(credentials) {
    try {
      // In production, send to server for verification
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email: credentials.email,
        username: credentials.email.split("@")[0],
        avatar: `https://ui-avatars.com/api/?name=${credentials.email}`,
        loginTime: new Date().toISOString(),
        preferences: Storage.getPreferences(),
      };

      Storage.saveUser(user);
      console.log("User logged in:", user.email);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  },

  /**
   * Logout user
   * @returns {boolean} - Success status
   */
  logout() {
    try {
      Storage.removeItem(Storage.KEYS.USER);
      console.log("User logged out");
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  },

  /**
   * Register user
   * @param {object} userData - User data
   * @returns {boolean} - Success status
   */
  register(userData) {
    try {
      // Validation
      if (
        !userData.email ||
        !userData.password ||
        userData.password.length < 6
      ) {
        console.error("Invalid user data");
        return false;
      }

      // In production, send to server
      const user = {
        id: Math.random().toString(36).substr(2, 9),
        email: userData.email,
        username: userData.username || userData.email.split("@")[0],
        avatar: `https://ui-avatars.com/api/?name=${userData.email}`,
        createdAt: new Date().toISOString(),
        preferences: Storage.getPreferences(),
      };

      Storage.saveUser(user);
      console.log("User registered:", user.email);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  },

  /**
   * Update user profile
   * @param {object} updates - Profile updates
   * @returns {boolean} - Success status
   */
  updateProfile(updates) {
    try {
      const user = this.getCurrentUser();
      if (!user) return false;

      const updated = { ...user, ...updates };
      Storage.saveUser(updated);
      console.log("Profile updated");
      return true;
    } catch (error) {
      console.error("Update profile error:", error);
      return false;
    }
  },

  /**
   * Change password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {boolean} - Success status
   */
  changePassword(currentPassword, newPassword) {
    try {
      // In production, verify current password
      if (newPassword.length < 6) {
        console.error("Password too short");
        return false;
      }

      // In production, send to server
      console.log("Password changed");
      return true;
    } catch (error) {
      console.error("Change password error:", error);
      return false;
    }
  },

  /**
   * Verify token
   * @param {string} token - Auth token
   * @returns {boolean} - Is valid
   */
  verifyToken(token) {
    try {
      // In production, verify with server
      return !!token && token.length > 0;
    } catch (error) {
      console.error("Token verification error:", error);
      return false;
    }
  },

  /**
   * Refresh token
   * @returns {string|null} - New token or null
   */
  refreshToken() {
    try {
      // In production, request new token from server
      const user = this.getCurrentUser();
      if (!user) return null;

      return "new_token_" + Math.random().toString(36).substr(2, 9);
    } catch (error) {
      console.error("Token refresh error:", error);
      return null;
    }
  },

  /**
   * Setup auth UI
   */
  setupUI() {
    const loginBtn = document.querySelector('a[href="login.html"]');
    const profileBtn = document.querySelector('a[href="profile.html"]');

    if (this.isLoggedIn()) {
      const user = this.getCurrentUser();
      if (loginBtn) {
        loginBtn.textContent = user.username;
        loginBtn.href = "profile.html";
      }
    }
  },
};

// Setup UI on load
document.addEventListener("DOMContentLoaded", () => {
  Auth.setupUI();
});

// Make Auth globally available
window.Auth = Auth;
