import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PartyStepper.css";

// Steps: 1) Select or prefilled title, 2) choose time (now/later), 3) invite/copy link
const EXAMPLE_POPULAR = [
  "Dune", "Stranger Things", "Interstellar", "Avatar: The Last Airbender",
  "Everything Everywhere All at Once"
];

// PUBLIC_INTERFACE
function PartyStepper() {
  // Allow ?title= prefill from browsing
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const prefillTitle = params.get("title") || "";

  const [step, setStep] = useState(0);
  const [title, setTitle] = useState(prefillTitle);
  const [schedule, setSchedule] = useState("now");
  const [datetime, setDatetime] = useState("");
  const [partyCode, setPartyCode] = useState(""); // Simulate backend party creation

  const navigate = useNavigate();

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  // Simulate party creation on completion
  const handleCreate = () => {
    // Backend would create, here simulate and show code
    const code = Math.random().toString(36).slice(-6).toUpperCase();
    setPartyCode(code);
    next();
  };

  // Steps: Title -> When -> Invite (code)
  return (
    <div className="stepper-wrap">
      <div className="stepper-card">
        <div className="stepper-bar">
          {[0, 1, 2].map(i => (
            <span key={i} className={"stepper-dot" + (i === step ? " active" : "")}></span>
          ))}
        </div>
        {step === 0 && (
          <div className="stepper-panel">
            <h2>What do you want to watch?</h2>
            <input
              className="stepper-title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Dune, Stranger Things..."
              autoFocus
            />
            <div className="stepper-popular">
              {EXAMPLE_POPULAR.map(t =>
                <button type="button" className="btn btn-mini" key={t}
                  onClick={() => setTitle(t)}>{t}</button>
              )}
            </div>
            <button className="btn stepper-next" onClick={next} disabled={!title}>Next</button>
          </div>
        )}
        {step === 1 && (
          <div className="stepper-panel">
            <h2>When?</h2>
            <div style={{marginBottom: '1em'}}>
              <label>
                <input
                  type="radio"
                  checked={schedule === "now"}
                  onChange={() => setSchedule("now")}
                />{" "}
                Start now
              </label>
              <label style={{marginLeft: '1.6em'}}>
                <input
                  type="radio"
                  checked={schedule === "schedule"}
                  onChange={() => setSchedule("schedule")}
                />{" "}
                Schedule for later
              </label>
            </div>
            {schedule === "schedule" && (
              <input
                type="datetime-local"
                value={datetime}
                onChange={e => setDatetime(e.target.value)}
                className="stepper-datetime"
                min={new Date().toISOString().slice(0, 16)}
                required
              />
            )}
            <div>
              <button className="btn stepper-back" onClick={back} style={{marginRight: '1em'}}>Back</button>
              <button
                className="btn stepper-next"
                disabled={schedule === "schedule" && !datetime}
                onClick={handleCreate}
              >
                Create Party
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="stepper-panel" style={{textAlign: "center"}}>
            <h2>🎉 Your watch party is ready!</h2>
            <div className="stepper-partycode">
              <div>Party Code:</div>
              <div className="partycode-value">{partyCode}</div>
              <button
                className="btn btn-mini"
                onClick={() =>
                  navigator.clipboard.writeText(partyCode)
                }
                style={{margin: "1em auto .6em auto"}}
              >
                Copy code
              </button>
              <button className="btn" style={{marginBottom: '2em'}}
                onClick={() => navigate(`/party/${partyCode}`)}>
                Go to Party Room
              </button>
              <div>
                <button className="simple-link" onClick={() => navigate("/browse")}>Back to Browse</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default PartyStepper;
