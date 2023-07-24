import axios from 'axios';

const API_URL = `https://space.socialblocks.io`;
const accessToken = null;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'content-Type': 'application/json',
    authorization: accessToken ? `Bearer ${accessToken}` : '',
  },
});

export const loginUser = async (_id: string, pin: string) => {
  return (await api.post(`/login`, {_id, pin})).data;
};

export const registerUser = async (name: string) => {
  return (await api.put(`/register`, {name})).data;
};

export const addPin = async (_id: string, pin: string) => {
  return (await api.post(`/pin`, {_id, pin})).data;
};

export const getNewNFTs = async (address: string) => {
  return (await api.get(`/nft/new/${address}`)).data;
};

export const getAllNFTs = async (address: string) => {
  return (await api.get(`/nft/${address}`)).data;
};

export const getOneNFT = async (address: string, token: string) => {
  return (await api.post(`/nft`, {address, token})).data;
};

export const getTransfers = async (address: string) => {
  return (await api.get(`/transfer/${address}`)).data;
};
