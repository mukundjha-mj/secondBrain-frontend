const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL || "";

if (!BACKEND_URL) {
    throw new Error("VITE_BACKEND_URL environment variable is required");
}

export {
    BACKEND_URL
};
