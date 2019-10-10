import axios from 'axios';

export const writePost = ({vacation}) => axios.post('/api/posts', {vacation});