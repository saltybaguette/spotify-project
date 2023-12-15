import axios from "axios";
const request = axios.create({
    withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_BASE_API_URL;
//export const BASE_API = 'http://localhost:4000';
export const USERS_API = `${BASE_API}/api/users`;
export const SPOTIFY_SECRET = `${process.env.REACT_APP_SPOTIFY_SECRET}`;
export const signin = async (credentials) => {
    const response = await request.post( `${USERS_API}/signin`, credentials );
    return response.data;
};
export const account = async () => {
    const response = await request.post(`${USERS_API}/account`);
    return response.data;
};
export const updateUser = async (user) => {
    const response = await request.put(`${USERS_API}/${user._id}`, user);
    return response.data;
};
export const findAllUsers = async () => {
    const response = await request.get(`${USERS_API}`);
    return response.data;
};
export const createUser = async (user) => {
    const response = await request.post(`${USERS_API}`, user);
    return response.data;
};

export const findUserByUsername = async (username) => {
    const response = await request.get(`${USERS_API}/username/${username}`);
    return response.data;
}
export const findUserById = async (id) => {
    const response = await request.get(`${USERS_API}/${id}`);
    return response.data;
};
export const deleteUser = async (user) => {
    const response = await request.delete(
        `${USERS_API}/${user._id}`);
    return response.data;
};

export const signup = async (credentials) => {
    const response = await request.post(
        `${USERS_API}/signup`, credentials);
    return response.data;
};
export const signout = async () => {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data;
};
export const findLikedSongs = async (id) => {
    const response = await request.get(`${USERS_API}/liked/songs/${id}`);
    return response.data;
}
export const findLikedAlbums = async (id) => {
    const response = await request.get(`${USERS_API}/liked/albums/${id}`);
    return response.data;
}
export const findAllFollowing = async (id) => {
    const response = await request.get(`${USERS_API}/following/${id}`);
    return response.data;
}
export const findAllFollowers = async (id) => {
    const response = await request.get(`${USERS_API}/followers/${id}`);
    return response.data;
}
export const addLikedSong = async (id, song) => {
    const response = await request.put(`${USERS_API}/add/song/${id}/${song}`);
    return response.data;
};
export const addLikedAlbum = async (id, album) => {
    const response = await request.put(`${USERS_API}/add/album/${id}/${album}`);
    return response.data;
};
export const addFollowing = async (id, name) => {
    const response = await request.put(`${USERS_API}/follow/${id}/${name}`);
    return response.data;
}
export const addFollower = async (id, name) => {
    const response = await request.put(`${USERS_API}/follower/${id}/${name}`);
    return response.data;
}
export const removeSong = async (id, song) => {
    const response = await request.post(`${USERS_API}/remove/song/${id}/${song}`);
    return response.data;
}
export const removeAlbum = async (id, album) => {
    const response = await request.post(`${USERS_API}/remove/album/${id}/${album}`);
    return response.data;
}
export const unfollow = async (id, name) => {
    const response = await request.post(`${USERS_API}/remove/following/${id}/${name}`);
    return response.data;
}
export const removeFollower = async (id, name) => {
    const response = await request.post(`${USERS_API}/remove/follower/${id}/${name}`);
    return response.data;
}