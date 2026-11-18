import axios from "axios";
import { API_ENDPOINTS } from "../services/apis";
export const base_url="https://data.argaam.com"
// Global authentication promise to prevent multiple simultaneous calls
let authenticationPromise = null;
function isTokenValid(token) {
  if (!token) return false;
  try {
    // JWT format: header.payload.signature
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (!payload.exp) return false;
    // exp is in seconds, Date.now() in ms
    return Date.now() < payload.exp * 1000;
  } catch (e) {
    return false;
  }
}

export async function authenticateAndSaveToken() {
  const existingToken = sessionStorage.getItem("authToken");
  if (isTokenValid(existingToken)) {
    return existingToken;
  }

  // If authentication is already in progress, wait for it
  if (authenticationPromise) {
    return authenticationPromise;
  }

  // Create new authentication promise
  authenticationPromise = performAuthentication();

  try {
    const token = await authenticationPromise;
    return token;
  } finally {
    // Clear the promise after completion (success or failure)
    authenticationPromise = null;
  }
}

async function performAuthentication() {
  try {
    const response = await axios.post(`${base_url}/authenticate-ir`, {
     companyId: API_ENDPOINTS?.COMPANY_ID
    });
    const token = response.data?.jwtToken || response.data?.jwtToken || response.data;
    if (token) {
      sessionStorage.setItem("authToken", token);
      return token;
    } else {
      throw new Error("Token not found in response");
    }
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
}
