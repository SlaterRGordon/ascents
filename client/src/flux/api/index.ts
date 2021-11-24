import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchClimb = (id) => API.get(`/climbs/${id}`);
export const fetchClimbs = (query) => {
	const params = new URLSearchParams()
	Object.keys(query).map((param) => params.set(param, query[param]));
	return API.get(`/climbs?${params.toString()}`);
};
export const createClimb = (newClimb) => API.post('/climbs', newClimb);
export const deleteClimb = (id) => API.delete(`/climbs/${id}`);

export const fetchAscents = (page) => API.get(`/ascents?page=${page}`);
export const fetchAscentsByUser = ({page, userId}) => API.get(`/ascents?page=${page}&userId=${userId}`);
export const createAscent = (newAscent) => API.post('/ascents', newAscent);
export const deleteAscent = (id) => API.delete(`/ascents/${id}`);

export const fetchGrade = (id) => API.get(`/grades/${id}`);
export const fetchGrades = () => API.get(`/grades`);
export const createGrade = (newGrade) => API.post('/grades', newGrade);
export const deleteGrade = (id) => API.delete(`/grades/${id}`);

export const loadUser = (userId) => API.get(`/auth/loadUser?userId=${userId}`);
export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const loginGoogle = (data) => API.post('/auth/loginGoogle', data);
