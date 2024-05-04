const { errorResponder, errorTypes } = require('../../../core/errors');
const authenticationServices = require('./authentication-service');

// untuk menghitung email apa saja yang gagal login
const failedLoginAttempts = {};

const LOGIN_ATTEMPT_LIMIT = 5;
const LOGIN_LOCK_TIME = 30 * 60 * 1000; // 30 minutes in milliseconds

/**
 * menghandle login request
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function login(request, response, next) {
  const { email, password } = request.body;

  try {
    // mengecek apakah email tersebut sudah mencapai limit percobaan
    if (
      failedLoginAttempts[email] &&
      failedLoginAttempts[email].attemptCount >= LOGIN_ATTEMPT_LIMIT
    ) {
      const lastAttemptTimestamp = failedLoginAttempts[email].timestamp;
      const currentTime = new Date().getTime();
      // mengecek apakah waktunya akun kita ke locked sudah selesai apa belum
      if (currentTime - lastAttemptTimestamp < LOGIN_LOCK_TIME) {
        throw errorResponder(
          errorTypes.INVALID_CREDENTIALS,
          'Too many failed login attempts. Account locked.'
        );
      } else {
        // Reset login attempts
        delete failedLoginAttempts[email];
      }
    }

    // Check login credentials
    const loginSuccess = await authenticationServices.checkLoginCredentials(
      email,
      password
    );

    if (!loginSuccess) {
      // Record failed login attempt
      if (!failedLoginAttempts[email]) {
        failedLoginAttempts[email] = {
          attemptCount: 1,
          timestamp: new Date().getTime(),
        };
      } else {
        failedLoginAttempts[email].attemptCount++;
        failedLoginAttempts[email].timestamp = new Date().getTime();
      }

      throw errorResponder(
        errorTypes.INVALID_CREDENTIALS,
        'Wrong email or password'
      );
    }

    // Reset login attempts apabila login berhasil
    delete failedLoginAttempts[email];

    return response.status(200).json(loginSuccess);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
