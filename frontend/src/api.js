import axios from "axios";

const BASE_API_URL = import.meta.env.VITE_API_URL;

// Detections
export const fetchDetections = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/detections`);
    return response.data;
  } catch (error) {
    console.error("Error fetching detections:", error);
    return [];
  }
};

export const fetchGroupedDetections = async (groupBy = "month") => {
  const response = await fetch(`${BASE_API_URL}/detections/grouped?by=${groupBy}`);
  const data = await response.json();
  return data.grouped;
};


// Auth - Google
export const loginWithGoogle = async (tokenId) => {
  const res = await axios.post(`${BASE_API_URL}/api/auth/google`, { tokenId });
  return res.data;
};

// Auth - Manual
export const loginManually = async (email, password) => {
  const res = await axios.post(`${BASE_API_URL}/api/auth/login`, { email, password });
  return res.data;
};

// Change Password
export const changePassword = async (newPassword) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token in localStorage');
  
    const response = await axios.put(
      `${BASE_API_URL}/api/users/change-password`,
      { newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token in localStorage');

  const res = await axios.get(`${BASE_API_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Get all users (only the list of users, no total count)
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/users`);
    return response.data;  // Only return the list of users
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];  // Return an empty array if an error occurs
  }
};
export const fetchDailyStats = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/detections/daily-stats`);
    return response.data;
  } catch (error) {
    console.error("Error fetching daily detection stats:", error);
    return null;
  }
};
export const fetchWeeklyStats = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/detections/stats/weekly`);
    return response.data;
  } catch (error) {
    console.error("Error fetching daily detection stats:", error);
    return null;
  }
};
export const fetchMonthlyStats = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/detections/stats/monthly`);
    return response.data;
  } catch (error) {
    console.error("Error fetching daily detection stats:", error);
    return null;
  }
};
export const fetchWeekdaysStats = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/detections/weekdays`);
    return response.data;
  } catch (error) {
    console.error("Error fetching daily detection stats:", error);
    return null;
  }
};
// api.js
export const downloadAllDetectionsReport = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/reports/download-report/allDetection`);
    if (!response.ok) throw new Error("Failed to download report");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "detections_report.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading report:", error);
    throw error;
  }
};

// api.js
export const downloadGroupedDetectionsReport = async (view) => {
  try {
    const response = await fetch(`${BASE_API_URL}/reports/download-report/grouped?by=${view}`);
    if (!response.ok) {
      throw new Error("Failed to download grouped report");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `grouped_detections_${view}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // cleanup
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// api.js
export const downloadWeekdaysReport = async () => {
  try {
    const response = await fetch(`${BASE_API_URL}/reports/download-report/weekdays`);
    if (!response.ok) {
      throw new Error("Failed to download weekdays report");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "detections_weekdays.pdf");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url); // cleanup
  } catch (error) {
    console.error(error);
    throw error;
  }
};
