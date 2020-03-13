import { activeLessons, completedLessons } from "src/stores/index.js";
const JOURNAL_PATH = "./data/journal.json";
const USER_PATH = "./data/users/";

async function getUser(login){
  const URL = USER_PATH + login + ".json";
  const res = await fetch(URL);
  if (!res.ok) {
    throw new Error(res.status);
  }
  const userData = await res.json();
  return userData;
};

async function getAllUsers(){
  try {
    const res = await fetch(JOURNAL_PATH);
    const data = await res.json();
    const users = data.users;
    return users;
  } catch (error){
    console.log(error);
  }
};

async function setUserActiveLessons(login){
  try {
    const userData = await getUser(login); 
    activeLessons.set({
      user: login,
      lesson: userData.lesson || [],
      hometask: userData.hometask || []
    });
  } catch(error) {
    activeLessons.set({
      user: " ",
      lesson: [],
      hometask: []
    });
  }
};

function setUserCompletedLessons(user){

};

export {
  getUser,
  getAllUsers,
  setUserActiveLessons,
  setUserCompletedLessons
};