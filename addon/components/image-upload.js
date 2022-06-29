import Component from '@glimmer/component';
import { action, getWithDefault, get } from '@ember/object';
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
    this._dropzone.on ('addedfile', this.didAddFile.bind (this));
    this._dropzone.on ('success', this.didSuccess.bind (this));
    this._dropzone.on ('error', this.didError.bind (this));
    this._dropzone.on ('canceled', this.didCancel.bind (this));
    this._dropzone.on ('complete', this.didComplete.bind (this));
    this._dropzone.on ('sending', this.didSending.bind (this));
    this._dropzone.on ('processing', this.didProcessing.bind (this));
    this._dropzone.on ('uploadprogress', this.didProgress.bind (this));
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
      clickable: this.clickable,
      timeout: this.timeout,
      thumbnailHeight: this.thumbnailHeight,
      thumbnailWidth: this.thumbnailWidth,
      maxFilesize: this.maxFilesize,
      filesizeBase: this.filesizeBase,
      headers: this.headers,
      acceptedFiles: this.acceptedFiles,
      autoProcessQueue: this.autoProcess,
      renameFile: this.renameFile,
      paramName: this.paramName,
      disablePreviews: true,
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

  get filesizeBase () {
    return this.args.filesizeBase || 1000;
  }

  get headers () {
    return this.args.headers;
  }

  get clickable () {
    return getWithDefault (this.args, 'clickable', true);
  }

  get acceptedFiles () {
    return this.args.acceptedFiles || 'image/*';
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
    return isPresent (this.thumbnailHeight) ? `${this.thumbnailHeight}px` : undefined;
  }

  get cssWidth () {
    return isPresent (this.thumbnailWidth) ? `${this.thumbnailWidth}px` : undefined;
  }

  get thumbnailHeight () {
    return this.args.thumbnailHeight;
  }

  get thumbnailWidth () {
    return this.args.thumbnailWidth;
  }

  get removeOnError () {
    return get (this.args, 'removeOnError', true);
  }

  didSuccess (file) {
    (this.args.success || noOp) (file);
  }

  didError (file, message) {
    // Remove the file that errored.
    this._dropzone.removeFile (file);
    (this.args.error || noOp) (file, message);
  }

  didCancel (file) {
    (this.args.canceled || noOp) (file);
  }

  didComplete (file) {
    (this.args.complete || noOp) (file);
  }

  didSending (file) {
    (this.args.sending || noOp) (file);
  }

  didProcessing (file) {
    (this.args.processing || noOp) (file);
  }

  didProgress (file, progress, bytesSent) {
    (this.args.progress || noOp) (file, progress, bytesSent);
  }

  /**
   * Callback that a file has been added
   *
   * @param file
   */
  didAddFile (file) {
    // We only allow one file per component.
    if (this._dropzone.files.length > 1) {
      this._dropzone.removeFile (this._dropzone.files[0]);
    }

    (this.args.change || noOp) (file);
  }
}
