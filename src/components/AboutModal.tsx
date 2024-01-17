import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Logo from '../images/NewLinkerLogo.png';
import { Github, Envelope, Linkedin, Mastodon, Twitter } from 'react-bootstrap-icons';

/**
 *
 * @returns const options = {
    applicationName: 'QR Code Builder',
    applicationVersion: currentVersion,
    copyright: '© 2023',
    version: currentBuild,
    credits: 'Credits:\n\t• David G. Simmons\n\t• Electron React Boilerplate',
    authors: ['David G. Simmons'],
    website: 'https://github.com/davidgs/link-maker',
    iconPath: getAssetPath('icon.png'),
  };
 */
export default function AboutModal({ showMe, callback }: { showMe: boolean, callback: (res: boolean) => void }): React.JSX.Element {

  const handleClose = () => {
    callback(false);
  };

  return (
    <Modal size="xl" show={showMe} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <div style={{ margin: "auto" }}>
            <h1>
              <img
                src={Logo}
                alt="QR Builder Logo"
                width={40}
                height={40}
              ></img>{" "}
              QR Builder
            </h1>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>QR Builder</strong> is a cross-platform application built with
          React and Electron.
        </p>
        <p>
          <strong>QR Builder</strong> is open source and licensed under the MIT
          license. The source code is available on{" "}
          <a href="https://github.com/davidgs/link-maker">
            <Github style={{ height: "20px", width: "20px", color: "white" }} />
          </a>
        </p>
        <p>
          <strong>QR Builder</strong> is built with the following technologies:
        </p>
        <ul>
          <li>React</li>
          <li>Electron</li>
          <li>Electron React Boilerplate</li>
          <li>React Bootstrap</li>
          <li>React Router</li>
          <li>React Redux</li>
          <li>Redux Toolkit</li>
        </ul>
        <p>
          <strong>QR Builder</strong> is built by David G. Simmons.
        </p>
        <p>
          <a href="mailto:davidgs@qr-builder.io">
            <Envelope
              style={{ height: "20px", width: "20px", color: "white" }}
            />
          </a>
          &nbsp; &nbsp;
          <a href="https://github.com/davidgs/">
            <Github style={{ height: "20px", width: "20px", color: "white" }} />
          </a>
          &nbsp; &nbsp;
          <a href="https://twitter.com/davidgsIoT">
            <Twitter
              style={{ height: "20px", width: "20px", color: "white" }}
            />
          </a>
          &nbsp; &nbsp;
          <a href="https://linkedin.com/in/davidgsimmons">
            <Linkedin
              style={{ height: "20px", width: "20px", color: "white" }}
            />
          </a>
          &nbsp; &nbsp;
          <a href="https://tty0.social/@davidgs">
            <Mastodon
              style={{ height: "20px", width: "20px", color: "white" }}
            />
          </a>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}