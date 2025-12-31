// Mock delay to simulate network request
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data for testing
const getRegisteredUser = () => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("registeredUser");
    if (stored) return JSON.parse(stored);
  }
  return {
    email: "admin@example.com",
    password: "password123",
  };
};

export const login = async (data: any) => {
  // Simulate API call delay
  await delay(1000);
  
  const registeredUser = getRegisteredUser();

  // Validate credentials (with trim to avoid whitespace issues)
  const isMatch = 
    data.email?.trim() === registeredUser.email?.trim() && 
    data.password === registeredUser.password;

  if (isMatch) {
    const mockResponse = {
      token: "mock-token-123",
      user: {
        email: registeredUser.email,
        name: registeredUser.name || "Mock User"
      }
    };
    localStorage.setItem("authToken", mockResponse.token);
    return mockResponse;
  } else {
    // Simulate API error response
    const error: any = new Error("Invalid email or password");
    error.response = {
      data: {
        message: "Invalid email or password"
      }
    };
    throw error;
  }
};

export const signup = async (data: any) => {
  // Simulate API call delay
  await delay(1000);

  // Store user credentials for later login
  const newUser = {
    email: data.email,
    password: data.password,
    name: data.UserName || "New User"
  };
  localStorage.setItem("registeredUser", JSON.stringify(newUser));

  const mockResponse = {
    token: "mock-token-123",
    user: newUser
  };

  localStorage.setItem("authToken", mockResponse.token);
  return mockResponse;
};

export const logout = () => {
  localStorage.removeItem("authToken");
  window.location.href = "/login";
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};
