"use client";

import { useEffect } from "react";

export default function AccreditationPage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = "1";
            e.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.07 }
    );

    document.querySelectorAll(".cap-card, .use-step").forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      el.style.transition = `opacity 0.45s ${i * 0.06}s ease, transform 0.45s ${
        i * 0.06
      }s ease`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background: #0a0a0f;
        }

        .accreditation-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at top left, rgba(255, 120, 40, 0.22), transparent 35%),
            radial-gradient(circle at top right, rgba(0, 220, 255, 0.18), transparent 35%),
            #0a0a0f;
          color: white;
          position: relative;
          overflow: hidden;
          padding-bottom: 100px;
        }

        .bg-layer {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, #0a0a0f, #111827, #020617);
          z-index: -2;
        }

        .grid-overlay {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: -1;
        }

        .hero {
          text-align: center;
          padding: 120px 20px 80px;
        }

        .hero-eyebrow {
          color: #ff7a18;
          font-weight: 700;
          margin-bottom: 20px;
          letter-spacing: 1px;
        }

        .hero h1 {
          font-size: 64px;
          line-height: 1.1;
          margin-bottom: 20px;
        }

        .hero h1 em {
          color: #ff7a18;
          font-style: normal;
        }

        .hero-sub {
          max-width: 700px;
          margin: auto;
          color: #cbd5e1;
          font-size: 18px;
          line-height: 1.7;
        }

        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          padding: 40px;
        }

        .stat-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .stat-value {
          font-size: 32px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .stat-label {
          color: #cbd5e1;
        }

        .orange {
          color: #ff7a18;
        }

        .cyan {
          color: #00e0ff;
        }

        .teal {
          color: #00d4aa;
        }

        .wrap {
          padding: 80px 40px;
          max-width: 1200px;
          margin: auto;
        }

        .section-label {
          color: #ff7a18;
          font-weight: 700;
          margin-bottom: 20px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .credits-main {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .credits-eyebrow {
          color: #00e0ff;
          margin-bottom: 15px;
          font-weight: 700;
        }

        .credits-main h2 {
          font-size: 42px;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .credits-main p {
          color: #cbd5e1;
          line-height: 1.7;
          font-size: 17px;
        }

        .perks-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 30px;
        }

        .perk {
          display: flex;
          gap: 15px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 20px;
          border-radius: 18px;
        }

        .perk-icon {
          font-size: 28px;
        }

        .perk-text {
          color: #cbd5e1;
          line-height: 1.5;
        }

        .perk-text strong {
          display: block;
          color: white;
          margin-bottom: 5px;
        }

        .inline-disclaimer {
          margin-top: 25px;
          padding: 18px;
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          font-size: 14px;
          line-height: 1.6;
        }

        .amount-bubble {
          background:
            radial-gradient(circle at top, rgba(255, 122, 24, 0.3), transparent 45%),
            rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 45px;
          border-radius: 30px;
          text-align: center;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.35);
        }

        .amount-bubble .label {
          color: #cbd5e1;
          margin-bottom: 10px;
        }

        .amount-bubble .value {
          font-size: 72px;
          font-weight: 900;
          color: #ff7a18;
          margin-bottom: 10px;
        }

        .amount-bubble .sub {
          color: #cbd5e1;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .aws-powered {
          background: rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          padding: 18px;
          color: #cbd5e1;
        }

        .aws-powered strong {
          display: block;
          color: white;
          font-size: 28px;
          margin-bottom: 6px;
        }

        .cap-section {
          padding: 80px 40px;
          max-width: 1200px;
          margin: auto;
        }

        .cap-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .cap-header h2 {
          font-size: 42px;
          margin-bottom: 15px;
        }

        .cap-header p {
          color: #cbd5e1;
          font-size: 17px;
        }

        .cap-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }

        .cap-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 30px;
          border-radius: 20px;
          backdrop-filter: blur(12px);
        }

        .cap-icon {
          font-size: 40px;
          margin-bottom: 20px;
        }

        .cap-card h4 {
          margin-bottom: 10px;
          font-size: 22px;
        }

        .cap-card p {
          color: #cbd5e1;
          line-height: 1.6;
        }

        .use-section {
          padding: 80px 40px;
          max-width: 1200px;
          margin: auto;
        }

        .use-inner {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 50px;
          align-items: center;
        }

        .use-left h2 {
          font-size: 42px;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .use-left p {
          color: #cbd5e1;
          line-height: 1.7;
          font-size: 17px;
        }

        .use-steps {
          display: grid;
          gap: 20px;
        }

        .use-step {
          display: flex;
          gap: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px;
          border-radius: 20px;
        }

        .step-dot {
          font-size: 32px;
        }

        .step-content h5 {
          font-size: 20px;
          margin: 0 0 8px;
        }

        .step-content p {
          color: #cbd5e1;
          margin: 0;
          line-height: 1.6;
        }

        .cta-section {
          padding: 100px 40px;
          text-align: center;
        }

        .cta-inner {
          max-width: 900px;
          margin: auto;
          padding: 70px 30px;
          border-radius: 32px;
          background:
            radial-gradient(circle at top, rgba(255, 122, 24, 0.28), transparent 45%),
            rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .cta-inner h2 {
          font-size: 48px;
          line-height: 1.15;
          margin-bottom: 20px;
        }

        .cta-inner p {
          color: #cbd5e1;
          font-size: 18px;
          margin-bottom: 30px;
        }

        .cta-btns {
          display: flex;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .btn-primary,
        .btn-ghost {
          text-decoration: none;
          padding: 14px 24px;
          border-radius: 999px;
          font-weight: 700;
        }

        .btn-primary {
          background: #ff7a18;
          color: white;
        }

        .btn-ghost {
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
        }

        @media (max-width: 900px) {
          .hero h1 {
            font-size: 42px;
          }

          .stats-strip,
          .credits-main,
          .cap-grid,
          .use-inner,
          .perks-grid {
            grid-template-columns: 1fr;
          }

          .stats-strip {
            padding: 20px;
          }

          .wrap,
          .cap-section,
          .use-section {
            padding: 60px 20px;
          }

          .credits-main h2,
          .cap-header h2,
          .use-left h2,
          .cta-inner h2 {
            font-size: 32px;
          }
        }
      `}</style>

      <main className="accreditation-page">
        <div className="bg-layer"></div>
        <div className="grid-overlay"></div>

        <section className="hero">
          <div className="hero-eyebrow">
            Cloud Infrastructure · Startup Program
          </div>

          <h1>
            Building on <em>AWS.</em>
            <br />
            Backed by Cloud Credits.
          </h1>

          <p className="hero-sub">
            SWAIS received $1,000 in AWS cloud credits through the AWS Activate
            startup program — enabling us to build and validate our enterprise AI
            platform on world-class cloud infrastructure.
          </p>
        </section>

        <section className="stats-strip">
          <div className="stat-item">
            <div className="stat-value orange">$1K</div>
            <div className="stat-label">AWS Cloud Credits</div>
          </div>

          <div className="stat-item">
            <div className="stat-value cyan">AWS</div>
            <div className="stat-label">Activate Startup Program</div>
          </div>

          <div className="stat-item">
            <div className="stat-value teal">5+</div>
            <div className="stat-label">Enterprise Verticals</div>
          </div>

          <div className="stat-item">
            <div className="stat-value orange">ML/LLM</div>
            <div className="stat-label">AI Infrastructure</div>
          </div>
        </section>

        <section className="wrap">
          <div className="section-label">AWS Cloud Credits</div>

          <div className="credits-main">
            <div>
              <div className="credits-eyebrow">
                AWS Activate Startup Program
              </div>

              <h2>
                $1,000 in AWS Cloud Credits
                <br />
                for Infrastructure & Pilots
              </h2>

              <p>
                SWAIS was accepted into the AWS Activate program and received
                $1,000 in cloud credits — a startup program run by Amazon Web
                Services that provides eligible early-stage companies with AWS
                infrastructure credits.
              </p>

              <div className="perks-grid">
                <div className="perk">
                  <div className="perk-icon">☁️</div>
                  <div className="perk-text">
                    <strong>$1,000 Cloud Credits</strong>
                    Applied directly to AWS infrastructure costs
                  </div>
                </div>

                <div className="perk">
                  <div className="perk-icon">🧠</div>
                  <div className="perk-text">
                    <strong>ML / LLM Compute Access</strong>
                    AI-optimised infrastructure tiers on AWS
                  </div>
                </div>

                <div className="perk">
                  <div className="perk-icon">⚡</div>
                  <div className="perk-text">
                    <strong>Faster Iteration</strong>
                    Reduced infrastructure cost for rapid prototyping
                  </div>
                </div>

                <div className="perk">
                  <div className="perk-icon">🔒</div>
                  <div className="perk-text">
                    <strong>Enterprise-Grade Cloud</strong>
                    Client pilots run on AWS secure, global infrastructure
                  </div>
                </div>
              </div>

              <div className="inline-disclaimer">
                AWS Activate is a startup program run by Amazon Web Services.
                Credits received through this program are promotional
                infrastructure credits and do not represent an endorsement,
                certification, or partnership with Amazon Web Services, Inc.
              </div>
            </div>

            <div className="amount-bubble">
              <div className="label">Credits Received</div>
              <div className="value">$1K</div>
              <div className="sub">
                AWS Activate
                <br />
                Startup Credits
              </div>

              <div className="aws-powered">
                <strong>AWS</strong>
                Powered by AWS Infrastructure
              </div>
            </div>
          </div>
        </section>

        <section className="cap-section">
          <div className="cap-header">
            <h2>What Building on AWS Means for Clients</h2>
            <p>
              Our platform runs on AWS infrastructure — giving enterprise clients
              reliability, scale, and security.
            </p>
          </div>

          <div className="cap-grid">
            {[
              ["📈", "orange", "Scales with Your Business"],
              ["🔐", "cyan", "Enterprise-Grade Security"],
              ["🌐", "teal", "Always Available"],
              ["🚀", "orange", "Low-Risk Pilot Programs"],
              ["🧠", "cyan", "AI-Optimised Compute"],
              ["💡", "teal", "Proven Infrastructure Choice"],
            ].map(([icon, color, title]) => (
              <div className="cap-card" key={title}>
                <div className={`cap-icon ${color}`}>{icon}</div>
                <h4>{title}</h4>
                <p>
                  AWS infrastructure helps SWAIS deliver scalable, secure, and
                  reliable AI solutions for enterprise use cases.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="use-section">
          <div className="use-inner">
            <div className="use-left">
              <h2>How We Put the Credits to Work</h2>
              <p>
                Every dollar of AWS infrastructure credit goes into building a
                better AI platform and reducing pilot costs.
              </p>
            </div>

            <div className="use-steps">
              {[
                ["🏗️", "orange", "Platform Infrastructure"],
                ["🤖", "cyan", "Model Training & Inference"],
                ["🧪", "teal", "Client Pilot Programs"],
                ["📊", "orange", "Predictive Analytics at Scale"],
              ].map(([icon, color, title]) => (
                <div className="use-step" key={title}>
                  <div className={`step-dot ${color}`}>{icon}</div>
                  <div className="step-content">
                    <h5>{title}</h5>
                    <p>
                      AWS credits support compute, storage, networking, AI
                      models, and real-world enterprise pilots.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-inner">
            <h2>
              Start a Pilot on
              <br />
              AWS Infrastructure
            </h2>

            <p>
              Enterprise AI — built on AWS, validated with real workloads, and
              ready to scale.
            </p>

            <div className="cta-btns">
              <a href="/contact" className="btn-primary">
                Start Your Pilot Program
              </a>

              <a href="/solutions" className="btn-ghost">
                Explore Solutions →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
