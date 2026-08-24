import type { UserResponse } from "~/types/user";

export default {
	getCurrentUser: async () => useRequest<UserResponse>('/user')
}