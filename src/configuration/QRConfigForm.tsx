/* eslint-disable no-console */
/* The MIT License (MIT)
 *
 * Copyright (c) 2022-present David G. Simmons
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React, { useState, SyntheticEvent } from 'react';
import {
  Form,
  Button,
  Modal,
  Accordion,
} from 'react-bootstrap';
import { RootState } from '../stores/store';
import { useSelector } from 'react-redux';
// import { updateQRType } from '../reducers/qr/qrSlice';
import QRConfigurator from './Configurators/QRConfigurator';

export default function QRConfigForm({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}): React.JSX.Element {
  // const dispatch = useDispatch();
  const [, setShowConfig] = useState<boolean>(show);
  // const qSet = useSelector((state: RootState) => state.qr.settings);
  // const qrConf = useSelector((state: RootState) => state.qrCode.settings);
  const dark = useSelector((state: RootState) => state.dark.dark);
  // const session = useSelector((state: RootState) => state.session.settings);
  const darkClass = dark ? 'header-stuff-dark' : 'header-stuff';

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setShowConfig(false);
    onHide();
  };

  const handleCancel = () => {
    setShowConfig(false);
    onHide();
  };

  // const handleExtChange = (selectedFileType: string) => {
  //   dispatch(updateQRType(selectedFileType));
  // };

  // const onXparentChange = (value: boolean) => {
  //   dispatch(updateXParent(value));
  // };

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      size="xl"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>QR Code Configuration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className={darkClass}>
                <strong>QR Code Configuration</strong>
              </Accordion.Header>
                <QRConfigurator />
            </Accordion.Item>
          </Accordion>
          <div className="fullrow">
            <div className="col60" />
            <div className="col20">
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Save
              </Button>
            </div>
            <div className="spacer" />
            <div className="col20">
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
