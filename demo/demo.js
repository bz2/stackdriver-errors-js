/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import StackdriverErrorReporter from '../stackdriver-errors';
var StackdriverErrors = new StackdriverErrorReporter();

export function updateConfig() {
  var key = document.getElementById('input-apikey').value;
  var projectId = document.getElementById('input-projectid').value;

  localStorage.setItem('key', key);
  localStorage.setItem('projectId', projectId);

  StackdriverErrors.start({
    key: key,
    projectId: projectId,
    service: 'webapp',
    version: 'demo'
  });
}

function loadFromLocalStorage() {
  var key = localStorage.getItem('key');
  var projectId = localStorage.getItem('projectId');
  document.getElementById('input-apikey').value = key;
  document.getElementById('input-projectid').value = projectId;

  if(key && projectId) {
    updateConfig();
  } else {
    console.warn('No API key provided, Stackdriver not started.');
  }
}
loadFromLocalStorage();


// Fake application code
var users;
export function vanillaCrash() {
  starUsers();
}
function starUsers() {
  for(var i = 0; i < users.length; i++) {
    users.starred = true;
  }
}
function displayUserInfo() {
  if(!users) {
    StackdriverErrors.report('No user information to display');
  }
}
function addUser(name) {
  var user = new User();
  users.push(user);
}


// Buttons logic
export function reportErrorMessage() {
  displayUserInfo();
}
export function catchCrashAndReport() {
  try {
    addUser('Keyser Söze');
  } catch (e) {
    StackdriverErrors.report(e);
  }
}
