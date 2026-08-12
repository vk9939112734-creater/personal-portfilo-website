import { db } from "./firebase.js";

import {
  doc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


console.log("🔥 SCRIPT.JS CONNECTED");


// ======================================
// PROFILE DATA
// ======================================

async function loadProfile() {

  try {

    const profileRef = doc(
      db,
      "portfilo",
      "profile",
      "navigation"
    );

    const profileSnap = await getDoc(profileRef);


    if (profileSnap.exists()) {

      const data = profileSnap.data();

      console.log("🔥 PROFILE DATA:", data);

    } else {

      console.log("❌ PROFILE DOCUMENT NOT FOUND");

    }

  } catch (error) {

    console.error("❌ PROFILE ERROR:", error);

  }

}


