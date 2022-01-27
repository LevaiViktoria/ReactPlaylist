const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiYXVkIjoiaHR0cHM6Ly95b3VyZG9tYWluLmNvbSIsImlzcyI6ImZlYXRoZXJzIn0.RdTDcCUiM6AAgNMZGzuZzSWosS14dVO2JUQjdbAwfMc';
const BASE_URL = "http://localhost:3030";

const request = async (path = '', options = {}) => {
  const headers = {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
    ...options.headers
  }

  const response = await fetch(`${BASE_URL}/${path}`, {
    ...options,
    headers
  })

  return response.json()
}


class RestApi {
  constructor(path, convertFn) {
    this.path = path
    this.convertFn = convertFn
  }
  async create(obj) {
    const playlist = await request(this.path, {
      method: 'POST',
      body: JSON.stringify(obj)
    })
    return this.convertFn(playlist);
  }
  async fill(obj) {
    await this.db.remove({}, { multi: true });
    const newObj = await Promise.all(
      obj.map((playlist) => this.create(playlist))
    );
    return newObj;
  }
  async getAll() {
    const items = await request(this.path)

    const playlists = items.data
    return playlists.map(this.convertFn)
  }

  async update(obj) {
    if (!obj.id) return;

    const playlist = await request(`${this.path}/${obj.id}`, {
      method: 'PUT',
      body: JSON.stringify(obj)
    })

    return this.convertFn(playlist);
  }

  async delete(id) {
    return await request(`${this.path}/${id}`, {
      method: 'DELETE'
    })
  }
}


const convertFn = (playlist) => {
  return {
    ...playlist,
    id: playlist.id.toString(),
    tracks: playlist.tracks.map(id => id.toString())
  }
}

export const playlistsApi = new RestApi('playlists', convertFn)

const convertTrackIds = track => {
  return {
    ...track,
    id: track.id.toString()
  }
}

export const tracksApi = new RestApi('tracks', convertTrackIds)