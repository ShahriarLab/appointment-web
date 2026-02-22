// Sample Data (Minimum 8 cards as requested)
//collected data from gpt
let jobs = [
    { id: 1, companyName: "Google", position: "Frontend Dev", location: "Remote", type: "Full-time", salary: "$120k", status: "all" },
    { id: 2, companyName: "Amazon", position: "Backend Dev", location: "Seattle", type: "Full-time", salary: "$130k", status: "all" },
    { id: 3, companyName: "Meta", position: "UI/UX Designer", location: "Menlo Park", type: "Contract", salary: "$110k", status: "all" },
    { id: 4, companyName: "Netflix", position: "Software Engineer", location: "Remote", type: "Full-time", salary: "$150k", status: "all" },
    { id: 5, companyName: "Apple", position: "iOS Developer", location: "Cupertino", type: "Full-time", salary: "$140k", status: "all" },
    { id: 6, companyName: "Tesla", position: "AI Engineer", location: "Austin", type: "Full-time", salary: "$160k", status: "all" },
    { id: 7, companyName: "Microsoft", position: "Cloud Architect", location: "Remote", type: "Full-time", salary: "$135k", status: "all" },
    { id: 8, companyName: "Spotify", position: "Data Analyst", location: "New York", type: "Intern", salary: "$80k", status: "all" }
];

let currentTab = 'all';

// Function to render cards
function renderJobs() {
    const container = document.getElementById('job-list');
    const noJobs = document.getElementById('no-jobs');
    const filtered = currentTab === 'all' ? jobs : jobs.filter(j => j.status === currentTab);
    
    document.getElementById('tab-job-count').innerText = `${filtered.length} Jobs`;
    container.innerHTML = "";

    if (filtered.length === 0) {
        noJobs.classList.remove('hidden');
    } else {
        noJobs.classList.add('hidden');
        filtered.forEach(job => {
            const card = document.createElement('div');
            card.className = `job-card ${job.status}`;
            card.innerHTML = `
                <h4>${job.position}</h4>
                <p><strong>${job.companyName}</strong> - ${job.location}</p>
                <p>${job.type} | ${job.salary}</p>
                <div class="btn-group">
                    <button class="btn-int" onclick="updateStatus(${job.id}, 'interview')">Interview</button>
                    <button class="btn-rej" onclick="updateStatus(${job.id}, 'rejected')">Rejected</button>
                </div>
                <button class="btn-del" onclick="deleteJob(${job.id})">Delete Card</button>
            `;
            container.appendChild(card);
        });
    }
    updateDashboard();
}

// Function to update status (Interview/Rejected)
function updateStatus(id, newStatus) {
    const job = jobs.find(j => j.id === id);
    job.status = newStatus;
    renderJobs();
}

// Function to delete job (Challenge Requirement)
function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    renderJobs();
}

// Function to update Dashboard counts
function updateDashboard() {
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'rejected').length;
}

// Function to switch tabs
function filterJobs(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase() === tab);
    });
    renderJobs();
}

// Initial Call
renderJobs();