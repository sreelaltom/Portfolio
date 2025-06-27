from flask import Flask, render_template

# Fix: You must define both template and static folder relative to project structure
app = Flask(__name__, template_folder="../templates", static_folder="../static")

resume = {
    "name": "Sreelal S S",
    "email": "sreelal.s.s100@gmail.com",
    "phone": "+91-8592008405",
    "leetcode": "https://leetcode.com/u/sreelaltom/",
    "github": "https://github.com/sreelaltom/",
    "linkedin": "https://www.linkedin.com/in/sreelal-s-s-454795256/",
    "tableau": "https://public.tableau.com/app/profile/sreelalss",
    "about": "A passionate Computer Science and Data Science student...",
    "education": [
        {"institution": "College of Engineering Trivandrum", "degree": "B.Tech in Computer Science", "duration": "2022-2026", "location": "Thiruvananthapuram"},
        {"institution": "IIT Madras", "degree": "B.Sc in Data Science Foundation", "duration": "2022-2024", "location": "Chennai"}
    ],
    "experience": [
        {"organization": "IEDC CET", "role": "Operations Team, Club Coordinator", "duration": "2023-2024", "location": "Trivandrum"},
        {"organization": "Thinker Hub CET", "role": "Python Mentor", "duration": "2024", "location": "Trivandrum"},
        {"organization": "MCQGenie", "role": "Intern", "duration": "2024 Jan - 2024 March", "location": "Trivandrum"}
    ],
    "skills": [
        {"category": "Programming", "value": ["Python", "SQL"]},
        {"category": "Machine Learning", "value": ["Supervised Learning", "Unsupervised Learning", "Deep Learning"]},
        {"category": "Data Analysis", "value": ["Tableau"]},
        {"category": "Data Visualization", "value": ["Matplotlib", "Tableau", "Excel"]},
        {"category": "Tools", "value": ["Jupyter Notebook", "Git", "Tableau"]}
    ],
    "projects": [
        {"name": "ChromaDB File Search", "description": "Developed a website for uploading and searching within files using ChromaDB.", "link": "https://github.com/sreelaltom/FILE_Search_using_chromadb-pdf-"},
        {"name": "YouTube Video Reviewer", "description": "Built a tool to review YouTube videos using the YouTube API and NLP models.", "link": "https://github.com/sreelaltom/YouTube-comment-analyzer"},
        {"name": "Vegetable Detection Model", "description": "Created a TensorFlow model for vegetable detection.", "link": "https://github.com/sreelaltom/Vegetable-And-Fruit-Detector"},
        {"name": "HR Dashboard Project", "description": "Designed an HR dashboard using Tableau for data visualization.", "link": "https://public.tableau.com/app/profile/sreelal.s.s/viz/HRDashbord_17247417930840/HRSummary"},
        {"name": "Text Trade Project", "description": "Contributed to a database for a website selling used books.", "link": "https://github.com/sreelaltom/aleph-zero"},
        {"name": "Careplus - health monitoring app", "description": "Built the entire backend on Django, built food image detection model", "link": "https://github.com/sreelaltom/CarePlus"}
    ],
    "languages": ["Malayalam", "English"],
    "interests": ["Machine Learning", "building ml models"]
}

@app.route('/')
def index():
    return render_template('index.html', resume=resume)

# Export the Flask app instance for Vercel
# This is the correct way to export for Vercel Python runtime
if __name__ == '__main__':
    app.run(debug=True)
