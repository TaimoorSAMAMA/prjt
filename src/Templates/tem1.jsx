import React from "react";

const Template1 = () => {
    return (
        <div
            style={{
                fontFamily: "Arial, sans-serif",
                lineHeight: 1.6,
                margin: "0",
                padding: "0",
                backgroundColor: "#f4f4f4",
                minHeight: "100vh",
            }}
        >
            <div
                style={{
                    maxWidth: "800px",
                    margin: "20px auto",
                    background: "#fff",
                    padding: "20px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
            >
                {/* Header Section */}
                <div
                    style={{
                        textAlign: "center",
                        paddingBottom: "20px",
                        borderBottom: "1px solid #ddd",
                    }}
                >
                    <h1 style={{ margin: "0" }}>John Doe</h1>
                    <p style={{ margin: "5px 0" }}>
                        Software Engineer | john.doe@example.com | (123) 456-7890
                    </p>
                </div>

                {/* Experience Section */}
                <div style={{ margin: "20px 0" }}>
                    <h2
                        style={{
                            borderBottom: "2px solid #00bcd4",
                            paddingBottom: "5px",
                            marginBottom: "10px",
                            color: "#333",
                        }}
                    >
                        Experience
                    </h2>
                    <ul style={{ listStyle: "none", padding: "0" }}>
                        <li style={{ marginBottom: "10px" }}>
                            <strong>Company ABC</strong> - Software Developer (2020 - Present)
                        </li>
                        <li style={{ marginBottom: "10px" }}>
                            <strong>Company XYZ</strong> - Junior Developer (2018 - 2020)
                        </li>
                    </ul>
                </div>

                {/* Education Section */}
                <div style={{ margin: "20px 0" }}>
                    <h2
                        style={{
                            borderBottom: "2px solid #00bcd4",
                            paddingBottom: "5px",
                            marginBottom: "10px",
                            color: "#333",
                        }}
                    >
                        Education
                    </h2>
                    <ul style={{ listStyle: "none", padding: "0" }}>
                        <li style={{ marginBottom: "10px" }}>
                            Bachelor's Degree in Computer Science - University of Somewhere
                            (2014 - 2018)
                        </li>
                    </ul>
                </div>

                {/* Skills Section */}
                <div style={{ margin: "20px 0" }}>
                    <h2
                        style={{
                            borderBottom: "2px solid #00bcd4",
                            paddingBottom: "5px",
                            marginBottom: "10px",
                            color: "#333",
                        }}
                    >
                        Skills
                    </h2>
                    <ul style={{ listStyle: "none", padding: "0" }}>
                        <li style={{ marginBottom: "10px" }}>
                            Programming Languages: SQL
                        </li>
                        <li style={{ marginBottom: "10px" }}>Frameworks: React, Node.js</li>
                        <li style={{ marginBottom: "10px" }}>Tools: Git, Docker</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Template1;
