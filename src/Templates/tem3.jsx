import React from "react";

const Template3 = () => {
    return (
        <div
            style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                margin: "0",
                background: "#f5f5f5",
                minHeight: "100vh",
                padding: "20px 0",
            }}
        >
            <div
                style={{
                    width: "80%",
                    maxWidth: "800px",
                    margin: "20px auto",
                    background: "white",
                    padding: "20px",
                    borderRadius: "6px",
                    boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                {/* Header Section */}
                <div style={{ textAlign: "center", marginBottom: "20px" }}>
                    <h1 style={{ fontSize: "24px", margin: "0" }}>
                        Michael Johnson
                    </h1>
                    <p style={{ margin: "5px 0" }}>
                        Email: michael.j@example.com | Phone: (123) 555-1234
                    </p>
                </div>

                {/* Work Experience Section */}
                <div style={{ marginBottom: "20px" }}>
                    <h2
                        style={{
                            fontSize: "18px",
                            borderBottom: "1px solid #ddd",
                            marginBottom: "10px",
                        }}
                    >
                        Work Experience
                    </h2>
                    <ul
                        style={{
                            listStyleType: "square",
                            margin: "0",
                            padding: "0 20px",
                        }}
                    >
                        <li>Software Engineer, Innovative Co. (2019-Present)</li>
                        <li>Web Developer, Creative Studio (2017-2019)</li>
                    </ul>
                </div>

                {/* Education Section */}
                <div style={{ marginBottom: "20px" }}>
                    <h2
                        style={{
                            fontSize: "18px",
                            borderBottom: "1px solid #ddd",
                            marginBottom: "10px",
                        }}
                    >
                        Education
                    </h2>
                    <ul
                        style={{
                            listStyleType: "square",
                            margin: "0",
                            padding: "0 20px",
                        }}
                    >
                        <li>Bachelor’s in IT, Tech University (2013-2017)</li>
                    </ul>
                </div>

                {/* Skills Section */}
                <div style={{ marginBottom: "20px" }}>
                    <h2
                        style={{
                            fontSize: "18px",
                            borderBottom: "1px solid #ddd",
                            marginBottom: "10px",
                        }}
                    >
                        Skills
                    </h2>
                    <ul
                        style={{
                            listStyleType: "square",
                            margin: "0",
                            padding: "0 20px",
                        }}
                    >
                        <li>Front-end Development: HTML, CSS, JavaScript</li>
                        <li>Back-end: Node.js, Python, PHP</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Template3;
