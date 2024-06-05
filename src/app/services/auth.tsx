import { useAppData } from "@/context/app_context";

export default function isAuthenticated () {
    const { accessToken } = useAppData();
    return (accessToken !== '')
};

