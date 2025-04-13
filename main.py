from flask import Flask, render_template

app = Flask(__name__)

# Resume data
resume = {
    "name": "Sreelal S S",
    "email": "sreelal.s.s100@gmail.com",
    "phone": "+91-8592008405",
    "github": "https://github.com/sreelalss",  # Updated placeholder
    "linkedin": "https://linkedin.com/in/sreelalss",  # Updated placeholder
    "tableau": "https://public.tableau.com/app/profile/sreelalss",  # Updated placeholder
    "about": "A passionate Computer Science and Data Science student with expertise in Python, Machine Learning, and Data Visualization. Enthusiastic about building innovative projects and exploring filmmaking.",
    "education": [
        {"institution": "College of Engineering Trivandrum", "degree": "B.Tech in Computer Science", "duration": "2022-2026", "location": "Thiruvananthapuram"},
        {"institution": "IIT Madras", "degree": "B.Sc in Data Science", "duration": "2022-2026", "location": "Chennai"}
    ],
    "experience": [
        {"organization": "IEDC CET", "role": "Operations Team, Club Coordinator", "duration": "2023-2024", "location": "Trivandrum"},
        {"organization": "Thinker Hub CET", "role": "Python Mentor", "duration": "2024", "location": "Trivandrum"}
    ],
    "skills": [
        {"category": "Programming", "values": ["Python", "SQL"]},
        {"category": "Machine Learning", "values": ["Supervised Learning", "Unsupervised Learning", "Deep Learning"]},
        {"category": "Data Analysis", "values": ["Tableau"]},
        {"category": "Data Visualization", "values": ["Matplotlib", "Tableau", "Excel"]},
        {"category": "Tools", "values": ["Jupyter Notebook", "Git", "Tableau"]}
    ],
    "projects": [
        {"name": "ChromaDB File Search", "description": "Developed a website for uploading and searching within files using ChromaDB.", "link": ""},  # Add link if available
        {"name": "YouTube Video Reviewer", "description": "Built a tool to review YouTube videos using the YouTube API and NLP models.", "link": ""},  # Add link if available
        {"name": "Vegetable Detection Model", "description": "Created a TensorFlow model for vegetable detection.", "link": ""},  # Add link if available
        {"name": "HR Dashboard Project", "description": "Designed an HR dashboard using Tableau for data visualization.", "link": "https://public.tableau.com/app/profile/sreelalss"},  # Updated placeholder
        {"name": "Text Trade Project", "description": "Contributed to a database for a website selling used books.", "link": ""}  # Add link if available
    ],
    "languages": ["Malayalam", "English"],
    "interests": ["Machine Learning", "Filmmaking (Directed short films)"]
}

@app.route('/')
def index():
    print("Skills data:", resume['skills'])  # Debug: verify skills structure
    return render_template('index.html', resume=resume)

if __name__ == '__main__':
    app.run(debug=True)