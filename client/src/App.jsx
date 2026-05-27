import { useState } from "react";
import axios from "axios";

function App() {

  const [originalUrl, setOriginalUrl] =
    useState("");

  const [customAlias, setCustomAlias] =
    useState("");

  const [expiresInHours, setExpiresInHours] =
    useState("");

  const [shortUrl, setShortUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const response = await axios.post(

        "http://localhost:8080/api/url/shorten",

        {

          originalUrl,

          customAlias,

          expiresInHours
        }
      );

      setShortUrl(response.data.shortUrl);

    } catch (error) {

      setError(

        error.response?.data?.message ||

        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };



  const copyToClipboard = () => {

    navigator.clipboard.writeText(shortUrl);

    alert("Copied!");
  };



  return (

    <div style={styles.page}>


      {/* BACKGROUND GLOW */}

      <div style={styles.blur1}></div>

      <div style={styles.blur2}></div>



      {/* MAIN CARD */}

      <div style={styles.card}>


        <h1 style={styles.heading}>

          Scalable URL Shortener

        </h1>

        <p style={styles.subHeading}>

          Fast • Secure • Redis Powered

        </p>



        <form onSubmit={handleSubmit}>


          {/* URL INPUT */}

          <div style={styles.inputContainer}>

            <input
              type="text"
              placeholder="Paste your long URL..."
              value={originalUrl}
              onChange={(e) =>
                setOriginalUrl(e.target.value)
              }
              required
              style={styles.input}
            />

          </div>



          {/* CUSTOM ALIAS */}

          <div style={styles.inputContainer}>

            <input
              type="text"
              placeholder="Custom Alias (optional)"
              value={customAlias}
              onChange={(e) =>
                setCustomAlias(e.target.value)
              }
              style={styles.input}
            />

          </div>



          {/* EXPIRATION */}

          <div style={styles.inputContainer}>

            <input
              type="number"
              placeholder="Expires In Hours"
              value={expiresInHours}
              onChange={(e) =>
                setExpiresInHours(e.target.value)
              }
              style={styles.input}
            />

          </div>



          {/* BUTTON */}

          <button
            type="submit"
            style={styles.button}
          >

            {
              loading
                ? "Generating..."
                : "Generate Short URL"
            }

          </button>

        </form>



        {/* ERROR */}

        {
          error && (

            <p style={styles.error}>

              {error}

            </p>
          )
        }



        {/* RESULT */}

        {
          shortUrl && (

            <div style={styles.resultBox}>


              <h3 style={styles.resultTitle}>

                Your Short URL

              </h3>



              <a
                href={shortUrl}
                target="_blank"
                style={styles.shortLink}
              >

                {shortUrl}

              </a>



              <button
                onClick={copyToClipboard}
                style={styles.copyButton}
              >

                Copy Link

              </button>

            </div>
          )
        }

      </div>

    </div>
  );
}



const styles = {

  page: {

    minHeight: "100vh",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    background:
      "linear-gradient(135deg,#0f172a,#111827,#1e293b)",

    position: "relative",

    overflow: "hidden",

    fontFamily: "Arial"
  },



  blur1: {

    width: "300px",

    height: "300px",

    background: "#2563eb",

    position: "absolute",

    borderRadius: "50%",

    filter: "blur(120px)",

    top: "-50px",

    left: "-50px",

    opacity: 0.5
  },



  blur2: {

    width: "300px",

    height: "300px",

    background: "#7c3aed",

    position: "absolute",

    borderRadius: "50%",

    filter: "blur(120px)",

    bottom: "-50px",

    right: "-50px",

    opacity: 0.5
  },



  card: {

    width: "420px",

    padding: "35px",

    borderRadius: "24px",

    background:
      "rgba(255,255,255,0.08)",

    backdropFilter: "blur(18px)",

    border:
      "1px solid rgba(255,255,255,0.1)",

    boxShadow:
      "0 8px 32px rgba(0,0,0,0.4)",

    zIndex: 10
  },



  heading: {

    color: "white",

    textAlign: "center",

    fontSize: "34px",

    marginBottom: "8px",

    fontWeight: "700"
  },



  subHeading: {

    textAlign: "center",

    color: "#cbd5e1",

    marginBottom: "30px",

    fontSize: "15px"
  },



  inputContainer: {

    marginBottom: "18px"
  },



  input: {

    width: "100%",

    padding: "14px",

    borderRadius: "12px",

    border:
      "1px solid rgba(255,255,255,0.15)",

    background:
      "rgba(255,255,255,0.08)",

    color: "white",

    fontSize: "15px",

    outline: "none",

    boxSizing: "border-box"
  },



  button: {

    width: "100%",

    padding: "15px",

    border: "none",

    borderRadius: "12px",

    background:
      "linear-gradient(135deg,#2563eb,#7c3aed)",

    color: "white",

    fontSize: "16px",

    fontWeight: "600",

    cursor: "pointer",

    transition: "0.3s"
  },



  error: {

    color: "#f87171",

    marginTop: "16px",

    textAlign: "center"
  },



  resultBox: {

    marginTop: "28px",

    padding: "20px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.06)",

    textAlign: "center",

    border:
      "1px solid rgba(255,255,255,0.08)"
  },



  resultTitle: {

    color: "white",

    marginBottom: "12px"
  },



  shortLink: {

    color: "#60a5fa",

    fontSize: "18px",

    textDecoration: "none",

    wordBreak: "break-word"
  },



  copyButton: {

    marginTop: "18px",

    width: "100%",

    padding: "12px",

    borderRadius: "10px",

    border: "none",

    background: "#10b981",

    color: "white",

    fontWeight: "600",

    cursor: "pointer"
  }
};

export default App;