import Component from '@glimmer/component';
import { action, getWithDefault } from '@ember/object';
import { isEmpty, isPresent } from '@ember/utils';

import Dropzone from 'dropzone';

function noOp () {}

export default class ImageUploadComponent extends Component {
  _dropzone;

  @action
  didInsert (element) {
    this._dropzone = new Dropzone (element, this.options);
    this._initListeners ();
  }

  _initListeners () {
    this._dropzone.on ('addedfile', (file) => {
      if (this._dropzone.files.length > 1) {
        // We only allow one file per component.
        this._dropzone.removeFile (this._dropzone.files[0]);
      }

      this.didAddFile (file);
      (this.args.change || noOp) (file);
    });

    this._dropzone.on ('success', (file) => {
      this.didSuccess (file);
      (this.args.success || noOp) (file);
    });

    this._dropzone.on ('error', (file, message) => {
      this.didError (file, message);
      (this.args.success || noOp) (file, message);
    });

    this._dropzone.on ('canceled', (file) => {
      this.didCancel (file);
      (this.args.canceled || noOp) (file);
    });

    this._dropzone.on ('complete', (file) => {
      this.didComplete (file);
      (this.args.complete || noOp) (file);
    });

    this._dropzone.on ('sending', (file) => {
      this.didSending (file);
      (this.args.sending || noOp) (file);
    });

    this._dropzone.on ('processing', (file) => {
      this.didProcessing (file);
      (this.args.processing || noOp) (file);
    });

    this._dropzone.on ('uploadprogress', (file, progress, bytesSent) => {
      this.didProgress (file, progress, bytesSent);
      (this.args.progress || noOp) (file, progress, bytesSent);
    });
  }

  willDestroy () {
    super.willDestroy ();

    this._dropzone.disable ();
  }

  get options () {
    return Object.assign ({}, {
      url: this.url,
      method: this.method,
      withCredentials: this.withCredentials,
      timeout: this.timeout,
      thumbnailHeight: this.thumbnailHeight,
      thumbnailWidth: this.thumbnailWidth,
      maxFilesize: this.maxFilesize,
      headers: this.headers,
      acceptedFiles: this.acceptedFiles,
      autoProcessQueue: this.autoProcess,
      renameFile: this.renameFile,
      paramName: this.paramName
    }, { maxFiles: 1 });
  }

  get showInitialImage () {
    return isPresent (this._dropzone) && isEmpty (this._dropzone.files) && isPresent (this.args.image);
  }

  get url () {
    return this.args.url;
  }

  get method () {
    return this.args.method || 'post';
  }

  get withCredentials () {
    return getWithDefault (this.args, 'withCredentials', false);
  }

  get timeout () {
    return this.args.timeout || 30000;
  }

  get maxFilesize () {
    return this.args.maxFilesize || 256;
  }

  get headers () {
    return this.args.headers;
  }

  get acceptedFiles () {
    return this.args.acceptedFiles;
  }

  get autoProcess () {
    return getWithDefault (this.args, 'autoProcess', true);
  }

  get renameFile () {
    return getWithDefault (this.args, 'renameFile', null);
  }

  get paramName () {
    return this.args.paramName || 'file';
  }

  @action
  reset () {
    this._dropzone.removeAllFiles ();
  }

  get cssHeight () {
    return `${this.thumbnailHeight}px`;
  }

  get cssWidth () {
    return `${this.thumbnailWidth}px`;
  }

  get thumbnailHeight () {
    return this.args.thumbnailHeight || '120';
  }

  get thumbnailWidth () {
    return this.args.thumbnailWidth || '120';
  }

  didSuccess (/* file */) {

  }

  didError (/* file, message */) {

  }

  didCancel (/* file */) {

  }

  didComplete (/* file */) {

  }

  didSending (/* file */) {

  }

  didProcessing (/* file */) {

  }

  didProgress (/* file, progress, bytesSent */) {

  }

  /**
   * Callback that a file has been added
   *
   * @param file
   */
  didAddFile (/*file*/) {

  }

}
