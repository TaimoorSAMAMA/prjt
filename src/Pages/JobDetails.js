import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function JobDetails() {
  const location = useLocation();
  const { job } = location.state || {};

  if (!job) {
    return <Container><p>No job details available.</p></Container>;
  }

  const handleSaveJob = () => {
    // Add logic to save the job
    console.log('Job saved:', job.name);
  };

  const handleGenerateResume = () => {
    // Add logic to generate a resume
    console.log('Resume generated for:', job.name);
  };

  const handleGenerateCoverLetter = () => {
    // Add logic to generate a cover letter
    console.log('Cover letter generated for:', job.name);
  };

  const handleApply = () => {
    // Add logic to apply for the job
    console.log('Applied for:', job.name);
  };

  return (
    <Container>
      <Card className="mt-4">
        <Card.Body>
            <h1>Job Details</h1>
          <Card.Title>{job.name}</Card.Title>
          <Card.Text>
            <strong>Description:</strong> {job.description}
          </Card.Text>
          <Card.Text>
            <strong>Responsibilities:</strong> {job.responsibilities}
          </Card.Text>
          <Card.Text>
            <strong>Skills Required:</strong> {job.skillsRequired}
          </Card.Text>
          <Row className="mt-3">
            <Col>
              <Button variant="primary" onClick={handleApply} className="w-100 mb-2">
                Apply
              </Button>
            </Col>
            <Col>
              <Button variant="outline-success" onClick={handleSaveJob} className="w-100 mb-2">
                Save Job
              </Button>
            </Col>
            <Col>
              <Button variant="outline-primary" onClick={handleGenerateResume} className="w-100 mb-2">
                Generate Resume
              </Button>
            </Col>
            <Col>
              <Button variant="outline-secondary" onClick={handleGenerateCoverLetter} className="w-100 mb-2">
                Generate Cover Letter
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default JobDetails;