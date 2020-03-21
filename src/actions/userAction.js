import { updateActiveTests, updateCompletedTests, clearTestStore } from "src/stores/testStore.js";
import { getTestResult } from "src/actions/testAction.js";
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
}

async function getAllUsers(){
  try {
    const res = await fetch(JOURNAL_PATH);
    const data = await res.json();
    const users = data.users;
    return users;
  } catch (error){
    console.log(error);
  }
}

async function getUserTests(login){
  try {
    const userData = await getUser(login);
    const { passedTests } = await getTestResult(login); 

    const activeTests = {
      login: login,
      lesson: userData.lesson || [],
      hometask: userData.hometask || []
    };

    const completedTests = {
      login: login,
      lesson: passedTests.filter(test => test.lesson === "lesson") || [],
      hometask: passedTests.filter(test => test.lesson === "hometask") || []
    };

    updateActiveTests(activeTests);
    updateCompletedTests(completedTests);
  } catch(error) {
    console.log(error.message);
    if (error.message == 404) {
      clearTestStore();
    }    
  }
}

export {
  getUser,
  getAllUsers,
  getUserTests
};