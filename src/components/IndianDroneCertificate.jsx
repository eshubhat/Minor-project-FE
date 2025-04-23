import React, { useState } from 'react';
import './DroneStyles.css';

function IndianDroneCertificate() {
  const [certificateData, setCertificateData] = useState({
    recipientName: "Arjun Sharma",
    certificationLevel: "Advanced UAV Pilot",
    droneClass: "NP-NT (Non-Permissible, Non-Transferable)",
    registrationNumber: "DGCA-IN-2025-12456",
    issueDate: "April 23, 2025",
    expirationDate: "April 23, 2027",
    assessmentScore: "94%",
    authorityName: "Directorate General of Civil Aviation",
    examinerName: "Captain Rajesh Khanna",
    examinerTitle: "Chief Flight Examiner"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCertificateData({
      ...certificateData,
      [name]: value
    });
  };

  const handlePrint = () => {
    window.print();
  };

  // Generate a random certificate ID
  const certificateId = `DGCA-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="certificate-page">
      {/* Certificate Container */}
      <div className="certificate-container">
        {/* Decorative Border */}
        <div className="certificate-border"></div>
        
        {/* Top Ornamental Border */}
        <div className="top-border">
          <div className="pattern-container">
            <div className="pattern-element"></div>
            <div className="pattern-element"></div>
            <div className="pattern-element"></div>
            <div className="pattern-element"></div>
            <div className="pattern-element"></div>
          </div>
        </div>
        
        {/* Header with Emblem */}
        <div className="certificate-header">
          <div className="chakra-emblem">
            {/* Chakra spokes generated in CSS */}
          </div>
          <h1>Indian Drone Certificate</h1>
          <p className="subtitle">Official UAV Operation Qualification</p>
        </div>
        
        {/* Certificate Content */}
        <div className="certificate-content">
          <p className="intro-text">This is to certify that</p>
          <p className="recipient-name">{certificateData.recipientName}</p>
          
          <p className="achievement-intro">has successfully completed all requirements for</p>
          <p className="certification-level">{certificateData.certificationLevel}</p>
          
          <div className="certificate-details">
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">Drone Class</span>
                <span className="detail-value">{certificateData.droneClass}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Registration No.</span>
                <span className="detail-value">{certificateData.registrationNumber}</span>
              </div>
            </div>
            
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">Issue Date</span>
                <span className="detail-value">{certificateData.issueDate}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Expiration Date</span>
                <span className="detail-value">{certificateData.expirationDate}</span>
              </div>
            </div>
            
            <div className="detail-row">
              <div className="detail-item">
                <span className="detail-label">Assessment Score</span>
                <span className="detail-value">{certificateData.assessmentScore}</span>
              </div>
            </div>
          </div>
          
          <div className="authority-section">
            <p className="authority-name">{certificateData.authorityName}</p>
            <div className="signature-container">
              <div className="signature-line"></div>
              <p className="examiner-name">{certificateData.examinerName}</p>
              <p className="examiner-title">{certificateData.examinerTitle}</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Ornamental Border */}
        <div className="bottom-border"></div>
        
        {/* Footer */}
        <div className="certificate-footer">
          <p>This certification can be verified at digital-sky.dgca.gov.in | Certificate ID: {certificateId}</p>
        </div>
      </div>
      
      {/* Form to customize certificate */}
      <div className="edit-form">
        <h3>Customize Drone Certificate</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Recipient Name</label>
            <input 
              type="text" 
              name="recipientName"
              value={certificateData.recipientName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Certification Level</label>
            <input 
              type="text" 
              name="certificationLevel"
              value={certificateData.certificationLevel}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Drone Class</label>
            <input 
              type="text" 
              name="droneClass"
              value={certificateData.droneClass}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Registration Number</label>
            <input 
              type="text" 
              name="registrationNumber"
              value={certificateData.registrationNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Issue Date</label>
            <input 
              type="text" 
              name="issueDate"
              value={certificateData.issueDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Expiration Date</label>
            <input 
              type="text" 
              name="expirationDate"
              value={certificateData.expirationDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Assessment Score</label>
            <input 
              type="text" 
              name="assessmentScore"
              value={certificateData.assessmentScore}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Authority Name</label>
            <input 
              type="text" 
              name="authorityName"
              value={certificateData.authorityName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Examiner Name</label>
            <input 
              type="text" 
              name="examinerName"
              value={certificateData.examinerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Examiner Title</label>
            <input 
              type="text" 
              name="examinerTitle"
              value={certificateData.examinerTitle}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-actions">
          <button className="print-button" onClick={handlePrint}>
            Generate PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default IndianDroneCertificate;