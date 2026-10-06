// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

// Firestore
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js";


// Firebase Configuration


const firebaseConfig = {
  apiKey: "AIzaSyCN0VlEFEKW18ZlVSFBNTTgxjRZ-gaIEck",
  authDomain: "my-portfilo-8d71a.firebaseapp.com",
  projectId: "my-portfilo-8d71a",
  storageBucket: "my-portfilo-8d71a.firebasestorage.app",
  messagingSenderId: "805579122288",
  appId: "1:805579122288:web:9ae56f6453186cac29b6b5",
  measurementId: "G-H4R5EYNR62"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);


// Load Navbar from Firestore


async function loadNavbar() {

  try {

    const navbarRef = doc(db, "navbar", "main");

    const navbarSnap = await getDoc(navbarRef);

    if (!navbarSnap.exists()) {
      console.error();
      return;
    }

    const data = navbarSnap.data();

   
    // LOGO
    



    
    // NAVIGATION LINKS
   

    const navLinks = document.getElementById("navLinks");
    if (navLinks) {

      navLinks.innerHTML = `
        <a href="${data.homeLink}" class="nav-link">
          ${data.homeNumber}. ${data.homeTitle}
        </a>

        <a href="${data.aboutLink}" class="nav-link">
          ${data.aboutNumber}. ${data.aboutTitle}
        </a>

        <a href="${data.skillsLink}" class="nav-link">
          ${data.skillsNumber}. ${data.skillsTitle}
        </a>

        <a href="${data.projectsLink}" class="nav-link">
          ${data.projectsNumber}. ${data.projectsTitle}
        </a>

        <a href="${data.contactLink || '#contact'}" class="nav-link">
    ${data.contactNumber || '04'}. ${data.contactTitle || 'Contact'}
        </a>
        `;

    }
    console.log("Navbar Firebase se load ho gaya!");

  } catch (error) {

    console.error("Firebase Error:", error);

  }

}


// Start Navbar


loadNavbar();

async function loadHero() {
    try {
        const heroRef = doc(db, "hero", "main");
        const heroSnap = await getDoc(heroRef);
          if (!heroSnap.exists()) {

        console.error("Hero document nahi mila!");

            return;
        }


        const data = heroSnap.data();


        
        // HERO TEXT
        

        document.getElementById("heroKicker").textContent =
            data.kicker || "";

        document.getElementById("heroName").innerHTML =
            `${data.name || ""} <span class="grad">
                ${data.gradText || ""}
            </span>`;

        document.getElementById("heroDescription").textContent =
            data.description || "";


        
        // PROFILE IMAGE
      

        const profilePhoto =
            document.getElementById("profilePhoto");

        if (profilePhoto && data.profileImage) {

            profilePhoto.src =
                data.profileImage;

        }


        
        // STATUS
        

        const heroStatus =
            document.getElementById("heroStatus");

        if (heroStatus) {

            heroStatus.textContent =
                data.status || "Available now";

        }


        
// SOCIAL LINKS
        

        document.getElementById("githubLink").href = data.github || "#";
        document.getElementById("linkedinLink").href = data.linkedin || "#";
        document.getElementById("facebookLink").href = data.facebook || "#";
        document.getElementById("instagramLink").href = data.instagram || "#";


       
        // RESUME
       

        const resumeBtn =
            document.getElementById("resumeBtn");

        if (resumeBtn && data.resume) {

            resumeBtn.href =
                data.resume;

        }
        console.log(
            "Hero Firebase se successfully load ho gaya!"
        );

    }

    catch (error) {

        console.error(
            "Hero Firebase Error:",
            error
        );

    }
}


loadHero();


// LOAD ABOUT SECTION


async function loadAbout() {

  try {

    // Firestore document
    const aboutRef = doc(db, "about", "main");

    const aboutSnap = await getDoc(aboutRef);

    // Document check
    if (!aboutSnap.exists()) {

      console.error("About document nahi mila!");

      return;
    }


    // Firebase data
    const data = aboutSnap.data();



    // ABOUT HEADING
    

    document.getElementById("aboutEyebrow").textContent = data.eyebrow || "";
    document.getElementById("aboutTitle").textContent = data.title || "";

    
    // ABOUT PARAGRAPHS
  

    document.getElementById("aboutParagraph1").textContent = data.paragraph1 || "";
    document.getElementById("aboutParagraph2").textContent = data.paragraph2 || "";
    document.getElementById("aboutParagraph3").textContent = data.paragraph3 || "";

   
    // STATS


    document.getElementById("experienceValue").textContent = data.experienceValue || "";
    document.getElementById("experienceLabel").textContent = data.experienceLabel || "";
    document.getElementById("projectsValue").textContent = data.projectsValue || "";
    document.getElementById("projectsLabel").textContent = data.projectsLabel || "";
    document.getElementById("clientsValue").textContent = data.clientsValue || "";
    document.getElementById("clientsLabel").textContent = data.clientsLabel || "";


  
    // DEVELOPER TERMINAL
    

    document.getElementById("developerName").textContent = `"${data.developerName || ""}"`;
    document.getElementById("developerRole").textContent = `"${data.developerRole || ""}"`;
    document.getElementById("developerStack").textContent = `"${data.developerStack || ""}"`;
    document.getElementById("developerLocation").textContent = `"${data.developerLocation || ""}"`;

    // Boolean value
    document.getElementById("openToWork").textContent = data.openToWork === true ? "true" : "false";
    document.getElementById("coffeeLevel").textContent = data.coffeeLevel || "";

    console.log("About Firebase se successfully load ho gaya!");

  } catch (error) {

    console.error("About Firebase Error:", error);

  }

}
loadAbout();


// LOAD SKILLS FROM FIREBASE


        async function loadSkills() {

            console.log("Loading skills...");

            const container = document.getElementById("skillsContainer");

              if (!container) {
            console.error("skillsContainer HTML me nahi mila!");
          return;
    }

    try {

        // Firebase skills collection
        const skillsRef = collection(db, "skills");

        const skillsSnap = await getDocs(skillsRef);

        console.log("Firebase Skills:", skillsSnap.size);

        // Clear container
        container.innerHTML = "";

        // No skills
        if (skillsSnap.empty) {

            container.innerHTML = `
                <p style="color:red;">
                    No skills found in Firebase.
                </p>
            `;

            return;
        }

        
// LOOP THROUGH SKILLS
        

        skillsSnap.forEach((skillDoc) => {

            const data = skillDoc.data();

            console.log("Skill:", skillDoc.id, data);

            // Skill name
            const name =
                data.name || skillDoc.id;

            // Percentage
            const percentage =
                Number(data.percentage) || 0;

            // Description
            const description =
                data.description || "";

            
// CREATE CARD
           

            const card = document.createElement("div");

            card.className = "skill-card";

            
// CARD HTML
           

            card.innerHTML = `

                <h3>
                    ${name}
                </h3>

                <div class="skill-circle-wrap">

                    <div
                        class="skill-circle"
                        style="--pct:${percentage}"
                    >

                        <svg viewBox="0 0 90 90">

                            <defs>

                                <linearGradient
                                    id="skillGradient-${skillDoc.id}"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                >

                                    <stop
                                        offset="0%"
                                        stop-color="#00FFFF">
                                    </stop>

                                    <stop
                                        offset="50%"
                                        stop-color="#6FDCD2">
                                    </stop>

                                    <stop
                                        offset="100%"
                                        stop-color="#A855F7">
                                    </stop>

                                </linearGradient>

                            </defs>


                            <!-- BACKGROUND RING -->

                            <circle
                                class="track"
                                cx="45"
                                cy="45"
                                r="40">
                            </circle>


                            <!-- PERCENTAGE RING -->

                            <circle
                                class="fill"
                                cx="45"
                                cy="45"
                                r="40"
                                style="stroke:url(#skillGradient-${skillDoc.id});">
                            </circle>

                        </svg>


                        <div class="pct-label">
                            ${percentage}%
                        </div>

                    </div>

                </div>


                <div class="skill-description">
                    ${description}
                </div>

            `;

            // Add card
            container.appendChild(card);

        });

        console.log(
            "Skills screen par successfully show ho gayi!"
        );


// RING ANIMATION

        const skillCards =
            container.querySelectorAll(".skill-card");

        skillCards.forEach((card) => {

            const circle =
                card.querySelector(".fill");

            if (circle) {

                setTimeout(() => {

                    circle.classList.add("filled");

                }, 200);

            }

        });

    }

    catch (error) {

        console.error(
            "Skills Firebase Error:",
            error
        );

        container.innerHTML = `
            <p style="color:red;">
                Skills load nahi ho paayi.
            </p>
        `;

    }

}
loadSkills();


// LOAD PROJECTS FROM FIREBASE


async function loadProjects() {

    console.log("Loading projects...");

    const container = document.getElementById("projectsGrid");

    if (!container) {
        console.error("projectsGrid HTML me nahi mila!");
        return;
    }

    try {

        const projectsRef = collection(db, "projects");
        const projectsSnap = await getDocs(projectsRef);

        console.log("Firebase Projects:", projectsSnap.size);

        container.innerHTML = "";

        if (projectsSnap.empty) {
            container.innerHTML = `
                <p style="color:red;">
                    No projects found in Firebase.
                </p>
            `;
            return;
        }

        projectsSnap.forEach((projectDoc) => {

            const data = projectDoc.data();

            console.log("Project:", projectDoc.id, data);

            const category = data.category || "web";
            const icon = data.icon || "💻";
            const title = data.title || "Untitled Project";
            const description = data.description || "";

            const liveText = data.liveText || "";
            const liveUrl = data.liveUrl || "";

            const codeText = data.codeText || "";
            const codeUrl = data.codeUrl || "";

            const tags = Array.isArray(data.tags)
                ? data.tags
                : [];


// CREATE CARD
            

            const card = document.createElement("div");
            card.className = "project-card";
            card.dataset.cat = category;

          
  // TAGS
          

            const tagsHTML = tags.map((tag) => {

                return `
                    <span class="tag">
                        ${tag}
                    </span>
                `;

            }).join("");

            
// LIVE LINK

            let liveHTML = "";

            if (liveText && liveUrl) {

                liveHTML = `
                    <a
                        href="${liveUrl}"
                        target="_blank"
                        rel="noopener noreferrer">
                        ${liveText}
                    </a>
                `;

            }

            
// CODE LINK
            
            let codeHTML = "";

            if (codeText && codeUrl) {

                codeHTML = `
                    <a
                        href="${codeUrl}"
                        target="_blank"
                        rel="noopener noreferrer">
                        ${codeText}
                    </a>
                `;

            }

          
// CARD HTML
           

            card.innerHTML = `

                <div class="project-top">

                    <div class="project-icon">
                        ${icon}
                    </div>

                    <div class="project-links">

                        ${liveHTML}

                        ${codeHTML}

                    </div>

                </div>

                <h3>
                    ${title}
                </h3>

                <p>
                    ${description}
                </p>

                <div class="tag-row">

                    ${tagsHTML}

                </div>

            `;

            // Add card to page
            container.appendChild(card);

        });

        console.log("Projects Firebase se successfully load ho gaye!"
        );

        // Start filter
        setupProjectFilters();

    } catch (error) {

        console.error("Projects Firebase Error:",
            error
        );

        container.innerHTML = `<p style="color:red;">
            </p>
        `;
    }
}



// PROJECT FILTER


function setupProjectFilters() {

    const filterButtons = document.querySelectorAll(".filter-btn");

    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach((button) => { 
      button.addEventListener("click", () => {

            // Remove active class
            filterButtons.forEach((btn) => {
                btn.classList.remove("active");
            });

            // Add active class
            button.classList.add("active");

            // Get selected filter
            const filter = button.dataset.filter;

            // Filter projects
            projectCards.forEach((card) => {

                const category = card.dataset.cat;

                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.style.display = "flex";

                } else {

                    card.style.display = "none";

                }

            });

        });

    });
}
loadProjects();



// CONTACT 


async function loadContact() {

    try {

        const contactRef = doc(
            db,
            "contact",
            "main"
        );

        const contactSnap =
            await getDoc(contactRef);

            if (!contactSnap.exists()) {

            console.error(
                "Contact document nahi mila!"
            );

            return;
        }
        const data =
            contactSnap.data();

            document.getElementById("contactEyebrow").textContent = data.eyebrow || "";


        document.getElementById("contactTitle").textContent = data.title || "";


        document.getElementById("contactDescription").textContent = data.description || "";


        document.getElementById("contactEmail").textContent = data.email || "";


        document.getElementById("contactLocation").textContent = data.location || "";
        document.getElementById("contactAvailability").textContent = data.availability || "";
        document.getElementById("contactPhone").textContent = data.phone || "";

      console.log(
            "Contact Firebase se load ho gaya!"
        );

    }

    catch (error) {

        console.error(
            "Contact Firebase Error:",
            error
        );

    }

}


loadContact();


// LOAD FOOTER FROM FIREBASE


async function loadFooter() {

    console.log("Loading footer...");

    try {

        const footerRef =
            doc(db, "footer", "main");

        const footerSnap =
            await getDoc(footerRef);


        if (!footerSnap.exists()) {

            console.error(
                "Footer document nahi mila!"
            );

            return;
        }


        const data =
            footerSnap.data();


        console.log(
            "Footer Firebase:",
            data
        );


        // COPYRIGHT
        const copyright =
            document.getElementById("footerCopyright");

        if (copyright) {

            copyright.innerHTML =
                `© ${new Date().getFullYear()} ${data.copyright || ""}`;

        }


        // GITHUB
        const github =
            document.getElementById("footerGithub");

        if (github) {

            github.href =
                data.github || "#";

        }


        // LINKEDIN
        const linkedin =
            document.getElementById("footerLinkedin");

        if (linkedin) {

            linkedin.href =
                data.linkedin || "#";

        }


        // FACEBOOK
        const facebook =
            document.getElementById("footerFacebook");

        if (facebook) {

            facebook.href =
                data.facebook || "#";

        }


        // YOUTUBE
        const youtube =
            document.getElementById("footerYoutube");

        if (youtube) {

            youtube.href =
                data.youtube || "#";

        }


        console.log(
            "Footer Firebase se successfully load ho gaya!"
        );

    }

    catch (error) {

        console.error(
            "Footer Firebase Error:",
            error
        );

    }

}


// ==========================================
// BACK TO TOP
// ==========================================

const toTop =
    document.getElementById("toTop");

if (toTop) {

    toTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


// ==========================================
// START FOOTER
// ==========================================

loadFooter();
