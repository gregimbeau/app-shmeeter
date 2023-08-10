let userMapping = null;

export const fetchUserIdByUsername = async (username) => {
  if (!userMapping) {
    const response = await fetch("http://localhost:1337/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    userMapping = users.reduce((acc, user) => {
      acc[user.username] = user.id;
      return acc;
    }, {});
  }
  return userMapping[username];
};
