import { tokenFetcher } from "../common";

export const GET = tokenFetcher(`${process.env.BACKEND_URL}/auth/google`);
