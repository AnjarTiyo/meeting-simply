const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const processTranscript = require('./prompt');
const app = express();
const port = 3000;

// Middleware to serve static files
app.use(express.static('public'));

// Set up Multer for file upload (transcript.txt)
const upload = multer({ dest: 'uploads/' });

// Route to handle file upload and processing
app.post('/upload', upload.single('transcript'), async (req, res) => {
    try {
        // Read the uploaded transcript file
        const transcriptPath = req.file.path;
        const transcript = fs.readFileSync(transcriptPath, 'utf8');

        // Process the transcript using prompt.js
        const jsonData = await processTranscript(transcript);

        // Create an HTML report using the JSON data
        const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Transcript Report</title>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                <style>
                    body { 
                        font-family: 'Inter', sans-serif; 
                        line-height: 1.6; 
                        background-color: #f8fafc; 
                        margin: 0; 
                        padding: 20px; 
                        color: #1e293b; 
                    }
                    .container { 
                        max-width: 1000px; 
                        margin: auto; 
                        background: #fff; 
                        padding: 40px; 
                        border-radius: 16px; 
                        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); 
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 40px;
                        padding-bottom: 20px;
                        border-bottom: 2px solid #e2e8f0;
                    }
                    h1 { 
                        color: #1e40af;
                        font-size: 2.5rem;
                        margin-bottom: 10px;
                    }
                    h2 { 
                        color: #2563eb;
                        font-size: 1.5rem;
                        margin: 30px 0 20px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .section {
                        background: #fff;
                        border-radius: 12px;
                        padding: 25px;
                        margin-bottom: 30px;
                        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                    }
                    ul { 
                        list-style-type: none; 
                        padding: 0; 
                        margin: 0;
                    }
                    li { 
                        margin: 12px 0; 
                        padding: 12px 16px; 
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }
                    .participant { 
                        background-color: #eff6ff;
                        border-left: 4px solid #3b82f6;
                    }
                    .action-item { 
                        background-color: #fff7ed;
                        border-left: 4px solid #f97316;
                    }
                    .sentiment { 
                        background-color: #fdf2f8;
                        border-left: 4px solid #ec4899;
                    }
                    .summary { 
                        background-color: #f0fdf4;
                        padding: 20px;
                        margin: 10px 0;
                        border-radius: 8px;
                        font-style: italic;
                        border-left: 4px solid #22c55e;
                    }
                    .timestamp { 
                        font-weight: 500;
                        color: #64748b;
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    .metadata {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 30px;
                        padding: 15px;
                        background: #f8fafc;
                        border-radius: 8px;
                    }
                    .badge {
                        background: #e2e8f0;
                        padding: 6px 12px;
                        border-radius: 20px;
                        font-size: 0.875rem;
                        color: #64748b;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1><i class="fas fa-file-alt"></i> Meeting Transcript Report</h1>
                    </div>
                    
                    <div class="metadata">
                        <div class="timestamp">
                            <i class="far fa-clock"></i>
                            <span>Meeting Time: ${jsonData.time}</span>
                        </div>
                        <div class="badge">
                            <i class="fas fa-calendar-check"></i>
                            Generated: ${new Date().toLocaleString()}
                        </div>
                    </div>

                    <div class="section">
                        <h2><i class="fas fa-chart-pie"></i> Executive Summary</h2>
                        <p class="summary">${jsonData.summary}</p>
                    </div>

                    <div class="section">
                        <h2><i class="fas fa-users"></i> Participants Analysis</h2>
                        <ul>
                            ${jsonData.participant.map(p => `
                                <li class="participant">
                                    <i class="fas fa-user-circle"></i>
                                    <span>${p.name}: ${p.talktime}% talk time</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="section">
                        <h2><i class="fas fa-tags"></i> Topics Discussed</h2>
                        <ul>
                            ${jsonData.topics.map(topic => `
                                <li>
                                    <i class="fas fa-check-circle"></i>
                                    ${topic}
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="section">
                        <h2><i class="fas fa-tasks"></i> Action Items</h2>
                        <ul>
                            ${jsonData.actionable.map(item => `
                                <li class="action-item">
                                    <i class="fas fa-clipboard-list"></i>
                                    <span>${item.actionable}</span>
                                    <div class="badge">
                                        <i class="far fa-calendar"></i>
                                        ${item.deadline}
                                    </div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>

                    <div class="section">
                        <h2><i class="fas fa-chart-line"></i> Sentiment Analysis</h2>
                        <ul>
                            ${jsonData.sentiment.map(sent => `
                                <li class="sentiment">
                                    <i class="fas fa-heart"></i>
                                    <span>${sent.type}: ${sent.value}%</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
            </body>
            </html>`;

        // Create the output path for the HTML report
        const htmlFilePath = path.join(__dirname, 'public/output', `transcript_report_${Date.now()}.html`);

        // Write the HTML content to the file
        fs.writeFileSync(htmlFilePath, htmlContent, 'utf8');

        // Respond with the success message and the HTML file path
        res.status(200).json({
            message: 'Transcript processed successfully!',
            htmlFile: `output/${path.basename(htmlFilePath)}`, // Dynamic HTML report file
        });
    } catch (error) {
        console.error('Error processing transcript:', error);
        res.status(500).json({ message: 'Error processing transcript', error: error.message });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
