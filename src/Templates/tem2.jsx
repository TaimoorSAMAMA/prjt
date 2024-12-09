import React from "react";

const Template2 = () => {
    return (
        <div
            style={{
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                background: "#eaeaea",
                margin: "0",
                padding: "20px",
            }}
        >
            <div
                style={{
                    maxWidth: "900px",
                    margin: "20px auto",
                    background: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
                }}
            >
                {/* Header Section */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: "2px solid #0078d7",
                        paddingBottom: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <div style={{ fontSize: "28px", fontWeight: "bold" }}>
                        Jane Smith
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <p>jane.smith@example.com</p>
                        <p>(987) 654-3210</p>
                    </div>
                </div>

                {/* Professional Experience Section */}
                <div style={{ marginBottom: "20px" }}>
                    <h2 style={{ color: "#0078d7", marginBottom: "10px" }}>
                        Professional Experience
                    </h2>
                    <div style={{ marginBottom: "10px" }}>
                        <strong>Company 123</strong> - Senior Developer
                        <br />
                        <small>2021 - Present</small>
                        <br />
                        - Lead the development of a high-traffic web application.
                    </div>
                </div>

                {/* Education Section */}
                <div style={{ marginBottom: "20px" }}>
                    <h2 style={{ color: "#0078d7", marginBottom: "10px" }}>
                        Education
                    </h2>
                    <div style={{ marginBottom: "10px" }}>
                        <strong>M.S. in Computer Science</strong> - Top Tech
                        University
                        <br />
                        <small>2015 - 2017</small>
                    </div>
                </div>

                {/* Technical Skills Section */}
                <div style={{ marginBottom: "20px" }}>
                    <h2 style={{ color: "#0078d7", marginBottom: "10px" }}>
                        Technical Skills
                    </h2>
                    <div style={{ marginBottom: "10px" }}>
                        Languages: Java, JavaScript, SQL
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                        Tools: AWS, Jenkins, Kubernetes
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Template2;