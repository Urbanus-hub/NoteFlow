const colors = {
  light: {
    background: {
      default: "#F8FAFC", // Very light blue-grey background
      paper: "#FFFFFF", // Pure white card background
      input: "#F1F5F9", // Light grey for input fields
    },
    primary: {
      main: "#2563EB", // Vivid blue (matching dark theme for consistency)
      hover: "#3B82F6", // Lighter blue for hover states
      text: "#FFFFFF", // White text on primary buttons
    },
    text: {
      primary: "#0F172A", // Very dark blue-black for headings
      secondary: "#475569", // Medium slate grey for labels
      hint: "#94A3B8", // Light grey for placeholders
      link: "#2563EB", // Blue for links (matches primary)
    },
    border: "#E2E8F0", // Light grey borders
  },
  dark: {
    background: {
      default: "#131730", // Deepest black/blue background
      paper: "#0F121C", // The slightly lighter container/card color
      overlay: "rgba(37, 99, 235, 0.1)", // The subtle blue glow effect
    },
    primary: {
      main: "#2563EB", // Vivid blue for the 'Get Started' button
      hover: "#1E40AF", // Darker blue for hover states
      text: "#FFFFFF",
    },
    text: {
      primary: "#FFFFFF", // Pure white for main text
      secondary: "#9CA3AF", // Light grey for subtext
      link: "#3B82F6", // Bright blue for text links
    },
    border: "#1E293B", // Subtle border for dark theme
  },
};

export default colors;
