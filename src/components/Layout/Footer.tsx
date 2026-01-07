/**
 * Footer Component
 * Site footer with social links and copyright
 */

import styles from './Footer.module.css'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.info}>
            <h3 className={styles.name}>Tshegofatso Moses</h3>
            <p className={styles.title}>
              Full-Stack Developer & UI/UX Designer
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Navigation</h4>
              <ul className={styles.linkList}>
                <li>
                  <a href="#home" className={styles.link}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className={styles.link}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className={styles.link}>
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#experience" className={styles.link}>
                    Experience
                  </a>
                </li>
                <li>
                  <a href="#contact" className={styles.link}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.section}>
              <h4 className={styles.sectionTitle}>Connect</h4>
              <ul className={styles.linkList}>
                <li>
                  <a
                    href="https://github.com/God-freyMoses"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/tshegofatso-godfrey-moses-5123b5269/?skipRedirect=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:godfreymoses203@gmail.com"
                    className={styles.link}
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} Tshegofatso Moses. All rights reserved.
          </p>
          <p className={styles.built}>
            Built with Next.js, TypeScript & modern CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
