const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the email is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function emailIsRegistered(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (user) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(userId, password) {
  const user = await usersRepository.getUser(userId);
  return passwordMatched(password, user.password);
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  // Check if user not found
  if (!user) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await usersRepository.changePassword(
    userId,
    hashedPassword
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}

async function getUsers(page = 1, limit = null, search = '', sort) {
  const users = await usersRepository.getUsers();

  // filter users based on search query
  const filteredUsers = users.filter((user) => {
    const searchTerm = search.toLowerCase();
    if (searchTerm.includes(':')) {
      const [field, term] = searchTerm.split(':');
      if (field === 'email') {
        return user.email.toLowerCase().includes(term);
      } else if (field === 'name') {
        return user.name.toLowerCase().includes(term);
      } else {
        return false;
      }
    } else {
      return (
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
      );
    }
  });

  // sort users based on sort query
  let sortedUsers;
  if (sort) {
    const sortParts = sort.split(':');
    if (sortParts.length === 2) {
      const field = sortParts[0];
      const direction = sortParts[1];
      sortedUsers = filteredUsers.slice().sort((a, b) => {
        if (field === 'name') {
          if (direction === 'asc') {
            return a.name.localeCompare(b.name);
          } else {
            return b.name.localeCompare(a.name);
          }
        } else if (field === 'email') {
          if (direction === 'asc') {
            return a.email.localeCompare(b.email);
          } else {
            return b.email.localeCompare(a.email);
          }
        } else {
          return 0;
        }
      });
    } else {
      sortedUsers = filteredUsers.slice(); // default to no sorting
    }
  } else {
    sortedUsers = filteredUsers.slice(); // default to no sorting
  }

  // logika untuk membuat pagination nomor 1
  const startIndex = (page - 1) * limit;
  const endIndex = limit
    ? Math.min(startIndex + limit, sortedUsers.length)
    : sortedUsers.length; // Handle cases with and without limit
  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

  // untuk memformat data data yang sudah ada
  const results = paginatedUsers.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));

  // info dari pagination
  const totalUsers = sortedUsers.length;
  const totalPages = Math.ceil(totalUsers / (limit || sortedUsers.length)); //untuk mengatasi kasus dengan batas atupun tanpa batas
  const hasPreviousPage = page > 1;
  const hasNextPage = totalPages > page;

  const paginationInfo = {
    page_number: page,
    page_size: limit,
    count: paginatedUsers.length,
    total_pages: totalPages,
    has_previous_page: hasPreviousPage,
    has_next_page: hasNextPage,
  };

  return { paginationInfo, results }; // untuk mereturun hasil dan infonya
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailIsRegistered,
  checkPassword,
  changePassword,
};
