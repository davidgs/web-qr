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
  Row,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import FileTypeSelector from '../components/FileTypeSelector';
import { RootState } from '../stores/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateQRType, updateXParent } from '../reducers/qr/qrSlice';
import { updateSize } from '../reducers/qr/qrCodeSettingsSlice';
import AdjusterKnob from '../components/knobs/AdjusterKnob';
import Checker from '../components/buttons/Checker';

export default function QRConfigForm({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}): React.JSX.Element {
  const dispatch = useDispatch();
  const [, setShowConfig] = useState<boolean>(show);
  const qSet = useSelector((state: RootState) => state.qr.settings);
  const qrConf = useSelector((state: RootState) => state.qrCode.settings);
  const dark = useSelector((state: RootState) => state.dark.dark);
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

  const handleExtChange = (selectedFileType: string) => {
    dispatch(updateQRType(selectedFileType));
  };

  // const onXparentChange = (value: boolean) => {
  //   dispatch(updateXParent(value));
  // };

  return (
    <Modal
      show={show}
      onHide={handleCancel}
      size="lg"
      dialogClassName="modal-90w"
      width="90vw"
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>QR Code Configuration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* QR Code Size */}
          <div className="fullrow">
            <div className="col60" style={{ marginTop: '1.5rem' }}>
              <OverlayTrigger
                placement="auto"
                delay={{ show: 250, hide: 300 }}
                rootClose
                overlay={
                  <Tooltip id="qrcode-tooltip">
                    Current size of the QR Code.
                  </Tooltip>
                }
              >
                <Form.Label
                  className={darkClass}
                  size="lg"
                  style={{ fontSize: '18pt' }}
                >
                  Size: {qrConf?.size}
                </Form.Label>
              </OverlayTrigger>
            </div>
            <OverlayTrigger
              placement="auto"
              delay={{ show: 250, hide: 400 }}
              rootClose
              overlay={
                <Tooltip id="qrcode-tooltip">
                  Adjust the size of your QR Code.
                </Tooltip>
              }
            >
              <div className="col15">
                <AdjusterKnob
                  name="qr-adjust-size"
                  value={qrConf?.size ? qrConf?.size : 220}
                  min={100}
                  max={500}
                  step={10}
                  disabled={false}
                  callback={(value) => {
                    dispatch(updateSize(value));
                  }}
                />
              </div>
            </OverlayTrigger>

            <div className="col25" />
          </div>
          <div className="fullrow">
            <div className="col60" style={{ marginTop: '1rem' }}>
              <Form.Label
                size="lg"
                style={{ fontSize: '18pt' }}
                className={darkClass}
              >
                File Extension:{' '}
              </Form.Label>
            </div>
            <div className={`col40 ${darkClass}`}>
              <FileTypeSelector
                onSelectionChange={handleExtChange}
                fileType={qSet?.QRType}
              />
            </div>
          </div>
          {qSet?.QRType === 'svg' ? (
            <Row
              style={{ paddingTop: '15px' }}
              className={
                qSet?.QRType === 'svg' ? 'fade-component in' : 'fade-component'
              }
            >
              <div className="fullrow">
                <div className="col60">
                  <Form.Label
                    style={{ fontSize: '18pt' }}
                    className={darkClass}
                  >
                    Transparent Background
                  </Form.Label>
                </div>
                <div className="spacer" />
                <div className="col10" style={{ marginTop: '.5rem' }}>
                  <Checker
                    cState={qSet?.XParent}
                    label=""
                    tooltip="Set the svg background to transparent"
                    disabled={false}
                    callback={(value) => {
                      dispatch(updateXParent(value));
                    }}
                  />
                </div>
                <div className="col10" />
              </div>
            </Row>
          ) : null}
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
